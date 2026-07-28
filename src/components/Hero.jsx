import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ onOpenBooking }) {
    const handleScrollToAbout = (e) => {
        e.preventDefault();
        const target = document.getElementById('about');
        if (target) {
            const offsetPosition = target.offsetTop - 70;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="hero" className="hero-section">
            {/* Leaf Ornament */}
            <img src="assets/palm_leaf.png" alt="Daun Decor" className="palm-leaf-decor" />
            {/* Dot Matrix Decoration */}
            <div className="dot-matrix dot-matrix-left"></div>

            <div className="container hero-container">
                <div className="hero-content">
                    <h5 className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)' }}>
                        <span style={{ fontSize: '1.1rem' }}>🍃</span> SELAMAT DATANG DI
                    </h5>
                    <h4 className="hero-subheading" style={{ color: 'var(--color-primary)', fontWeight: '800', fontSize: '1.25rem', textTransform: 'uppercase', margin: '4px 0 8px 0', letterSpacing: '0.5px' }}>
                        WATERBOOM CIJOHO
                    </h4>
                    <h1 className="hero-title" style={{ marginBottom: '10px', display: 'inline-block' }}>
                        SENSASI SERU
                    </h1>
                    <h2 className="hero-title-accent text-green">DIMULAI DI SINI!</h2>
                    
                    <div className="underline-svg-container" style={{ margin: '10px 0 16px 0' }}>
                        <svg width="220" height="14" viewBox="0 0 220 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 10C50 3, 170 3, 217 10" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="hero-wave-decor" style={{ marginBottom: '16px' }}>
                        <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 7 C 8 4, 10 10, 16 7 C 22 4, 24 10, 30 7 C 36 4, 38 10, 43 7" stroke="#93c2f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        </svg>
                    </div>

                    <p className="hero-desc">
                        Nikmati momen liburan bersama keluarga di kolam renang yang nyaman dan menyenangkan. Wahana seru untuk semua usia, bersantai, dan berpetualang!
                    </p>
                    <div className="hero-cta" style={{ display: 'flex', gap: '16px' }}>
                        <Link to="/pesan-tiket" className="btn btn-accent btn-pill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-ticket"></i> BELI TIKET <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                        <a href="#about" onClick={handleScrollToAbout} className="btn btn-outline btn-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            TENTANG KAMI <i className="fa-solid fa-arrow-right-long"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-media">
                <div className="hero-img-container">
                    <img src="/assets/dash.jpeg" alt="Waterboom Cijoho Indah Main Attraction" className="hero-img" />
                </div>

                {/* Circular Double Curves Stroke overlay */}
                <svg className="hero-curves" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 37.5,0 C 7.5,20 7.5,80 14.5,100" stroke="#bde0fe" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 35.5,0 C 5.5,20 5.5,80 12.5,100" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            </div>

            {/* SVG ClipPath Definition for Circular Photo Frame */}
            <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <clipPath id="hero-clip-path" clipPathUnits="objectBoundingBox">
                        <path d="M 0.35,0 C 0.05,0.2 0.05,0.8 0.12,1 L 1,1 L 1,0 Z" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    );
}
