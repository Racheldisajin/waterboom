import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Tickets from './components/Tickets';
import Testimonial from './components/Testimonial';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SuccessModal from './components/SuccessModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('reguler');
  const [bookingDetails, setBookingDetails] = useState(null);

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

  return (
    <>
      <Header onOpenBooking={handleOpenBooking} />
      
      <main>
        <Hero onOpenBooking={handleOpenBooking} />
        <Features />
        <About onOpenBooking={handleOpenBooking} />
        <Tickets onOpenBooking={handleOpenBooking} />
        <Testimonial />
        <Gallery />
      </main>

      <Footer />

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

export default App;
