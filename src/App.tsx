import Header from './components/Header';
import Hero from './components/Hero';
import BrandShowcase from './components/BrandShowcase';
import VehicleListings from './components/VehicleListings';
import Statistics from './components/Statistics';
import WhyChooseUs from './components/WhyChooseUs';
import PopularMakes from './components/PopularMakes';
import ShopByCategory from './components/ShopByCategory';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <BrandShowcase />
        <VehicleListings />
        <Statistics />
        <WhyChooseUs />
        <PopularMakes />
        <ShopByCategory />
        <Testimonials />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;