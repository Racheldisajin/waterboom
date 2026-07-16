import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Tickets from '../components/Tickets';
import Testimonial from '../components/Testimonial';
import Gallery from '../components/Gallery';
import MobileAppView from '../components/MobileAppView';

export default function Home({ onOpenBooking }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return <MobileAppView onOpenBooking={onOpenBooking} />;
    }

    return (
        <>
            <Hero onOpenBooking={onOpenBooking} />
            <Features />
            <About onOpenBooking={onOpenBooking} />
            <Tickets onOpenBooking={onOpenBooking} />
            <Testimonial />
            <Gallery />
        </>
    );
}
