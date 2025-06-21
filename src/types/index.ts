interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  dealer: Dealer;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  bodyType: 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible';
  engine: string;
  image: string;
  features: string[];
  condition: 'New' | 'Used';
  badge?: 'Great Price' | 'Low Mileage' | 'Sale';
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  vehicleId: {
    _id: string;
    make: string;
    model: string;
    year: number;
  };
  dealerId: string;
  inquiryType: string;
  status: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  vehicleCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserModel | null;
  loading: boolean;
  error: string | null;
}

export interface LoginResponse {
  
  token: string;
  user: UserModel;
}

export interface SignupResponse {
  token: string;
  user: UserModel;
}