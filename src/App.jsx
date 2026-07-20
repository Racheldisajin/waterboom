import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SuccessModal from './components/SuccessModal';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Home from './pages/Home';
import WahanaPage from './pages/WahanaPage';
import GaleriPage from './pages/GaleriPage';
import BeritaPage from './pages/BeritaPage';
import FasilitasPage from './pages/FasilitasPage';
import TentangKamiPage from './pages/TentangKamiPage';
import KontakPage from './pages/KontakPage';
import MobileAppView from './components/MobileAppView';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('reguler');
  const [bookingDetails, setBookingDetails] = useState(null);
  const location = useLocation();

  const handleOpenBooking = (ticketType = 'reguler') => {
    setSelectedTicket(ticketType);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSubmitBooking = (orderDetails) => {
    console.log('React Order Submitted:', orderDetails);
    const bookingCode = 'WCI-' + Math.floor(100000 + Math.random() * 900000);
    setBookingDetails({ ...orderDetails, bookingCode });
    setIsBookingOpen(false);
    
    // Smooth transition to success modal
    setTimeout(() => {
      setIsSuccessOpen(true);
    }, 300);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const isKasir = location.pathname === '/kasir';

  return (
    <>
      <ScrollToTop />
      {!isKasir && <Header onOpenBooking={handleOpenBooking} />}
      
      <main className={isKasir ? 'kasir-main' : ''}>
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
          <Route path="/wahana" element={<WahanaPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/fasilitas" element={<FasilitasPage />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/kasir" element={<MobileAppView isCashierMode={true} onOpenBooking={handleOpenBooking} />} />
        </Routes>
      </main>

      {!isKasir && <Footer onOpenBooking={handleOpenBooking} />}

      {/* Booking Form Overlay */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        selectedTicket={selectedTicket}
        onSubmit={handleSubmitBooking}
      />

      {/* Success Confirmation Overlay */}
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={handleCloseSuccess} 
        details={bookingDetails}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
