import React, { useState, useEffect } from 'react';
import { Menu, X, User, Heart, Search, LogOut, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import axios from 'axios';
import { Contact, LoginResponse, SignupResponse, UserModel } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user' // Default role will be user
  });
  const [authError, setAuthError] = useState('');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Listings', href: '#listings' },
    { name: 'Blog', href: '#blog' },
    { name: 'Pages', href: '#pages' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];


  // Checking auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get<{ user: UserModel }>('/auth/me');
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', loginFormData);
      console.log(data.token)
      // Store token and user data
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);

      // Set axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Close login modal
      setIsLoginOpen(false);
      setLoginFormData({ email: '', password: '' });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAuthError(error.response?.data?.message || 'Login failed');
      } else {
        setAuthError('An unexpected error occurred');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const { data } = await api.post<SignupResponse>('/auth/register', signupFormData);

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setIsSignupOpen(false);
      setSignupFormData({ name: '', email: '', password: '', phone: '', role: 'user' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAuthError(error.response?.data?.message || 'Signup failed');
      } else {
        setAuthError('An unexpected error occurred');
      }
    }
  };


  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];

    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    }
  };


  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupFormData(prev => ({ ...prev, [name]: value }));
  };

  const switchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setAuthError('');
  };

  const switchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setAuthError('');
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'dealer') {
      fetchContacts();
    }
  }, [isAuthenticated, user?.role]);

  const fetchContacts = async () => {
    setContactsLoading(true);
    try {
      const response = await api.get('/contact');
      if (response.data.success) {
        setContacts(response.data.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setContactsLoading(false);
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">BOXCARS</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              {/* Add Contacts Notification Bell (only for dealers) */}
              {isAuthenticated && user?.role === 'dealer' && (
                <div className="relative">
                  <button 
                    onClick={() => setIsContactsOpen(!isContactsOpen)}
                    className="p-2 rounded-full hover:bg-gray-100 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {contacts.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {contacts.length}
                      </span>
                    )}
                  </button>

                  {/* Contacts Dropdown */}
                  {isContactsOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                      <div className="py-1">
                        {contactsLoading ? (
                          <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
                        ) : contacts.length === 0 ? (
                          <div className="px-4 py-2 text-sm text-gray-700">No contacts found</div>
                        ) : (
                          contacts.map((contact) => (
                            <button
                              key={contact._id}
                              onClick={() => handleContactClick(contact)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-gray-500 truncate">{contact.subject}</div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign in</span>
                </button>
              )}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Submit Listing
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-gray-700">
                        Hi, {user?.name || 'User'}
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Sign in</span>
                    </button>
                  )}
                  <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mt-2">
                    Submit Listing
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Sign In</h2>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleLoginInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <button type="button"
                  onClick={switchToSignup}
                  className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Signup Modal */}
      <AnimatePresence>
        {isSignupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsSignupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Create Account</h2>
                <button
                  onClick={() => setIsSignupOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {authError && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                  {authError}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleSignup}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={signupFormData.name}
                    onChange={handleSignupInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signupFormData.email}
                    onChange={handleSignupInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={signupFormData.password}
                    onChange={handleSignupInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={signupFormData.phone}
                    onChange={handleSignupInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                {/* Signup Modal - Add this inside the form, before the submit button */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={signupFormData.role === 'user'}
                        onChange={() => setSignupFormData(prev => ({ ...prev, role: 'user' }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Customer</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="dealer"
                        checked={signupFormData.role === 'dealer'}
                        onChange={() => setSignupFormData(prev => ({ ...prev, role: 'dealer' }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Dealer</span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Account
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Contact Details Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    About: {selectedContact.vehicleId.make} {selectedContact.vehicleId.model}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(selectedContact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedContact.message}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;