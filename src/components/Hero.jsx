import React from 'react';

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
            {/* Palm Leaf Ornament */}
            <img src="assets/palm_leaf.png?v=1.1" alt="" className="palm-leaf-decor" />
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
                    <h1 className="hero-title" style={{ marginBottom: '10px', position: 'relative', display: 'inline-block' }}>
                        SENSASI SERU
                        {/* Three-leaf splash SVG next to title */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-accent)" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-12px', right: '-32px' }}>
                            <path d="M12 2C12 2 13.5 6 15 7.5C16.5 9 20 9 20 9C20 9 16 10.5 14.5 12C13 13.5 12 17.5 12 17.5C12 17.5 11 13.5 9.5 12C8 10.5 4 9 4 9C4 9 7.5 9 9 7.5C10.5 6 12 2 12 2Z" opacity="0.9" />
                            <path d="M19 3C19 3 19.8 5 20.8 5.8C21.8 6.6 24 6.6 24 6.6C24 6.6 22 7.4 21.2 8.4C20.4 9.4 19.8 12 19.8 12C19.8 12 19.2 9.4 18.2 8.4C17.2 7.4 15 6.6 15 6.6C15 6.6 17.2 6.6 18.2 5.8C19.2 5 19 3 19 3Z" opacity="0.8" />
                            <path d="M6 5C6 5 6.8 7 7.8 7.8C8.8 8.6 11 8.6 11 8.6C11 8.6 9 9.4 8.2 10.4C7.4 11.4 6.8 14 6.8 14C6.8 14 6.2 11.4 5.2 10.4C4.2 9.4 2 8.6 2 8.6C2 8.6 4.2 8.6 5.2 7.8C6.2 7 6 5 6 5Z" opacity="0.8" transform="rotate(-30 6 5)" />
                        </svg>
                        <br />
                        <span className="highlight-green">DIMULAI DI SINI!</span>
                    </h1>
                    <svg className="curved-underline" width="320" height="12" viewBox="0 0 320 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '-2px 0 12px 0', display: 'block' }}>
                        <path d="M 4 8 C 80 14, 240 14, 315 8" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>

                    {/* Wavy lines decoration */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '12px 0 20px 0' }}>
                        <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3 C 8 0, 10 6, 16 3 C 22 0, 24 6, 30 3 C 36 0, 38 6, 43 3" stroke="#93c2f0" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M2 7 C 8 4, 10 10, 16 7 C 22 4, 24 10, 30 7 C 36 4, 38 10, 43 7" stroke="#93c2f0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        </svg>
                    </div>

                    <p className="hero-desc">
                        Nikmati momen liburan bersama keluarga di kolam renang yang nyaman dan menyenangkan. Wahana seru untuk semua usia, bersantai, dan berpetualang!
                    </p>
                    <div className="hero-cta" style={{ display: 'flex', gap: '16px' }}>
                        <button className="btn btn-accent btn-pill" onClick={() => onOpenBooking()}>
                            <i className="fa-solid fa-ticket" style={{ marginRight: '8px' }}></i> BELI TIKET <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: '6px' }}></i>
                        </button>
                        <a href="#about" onClick={handleScrollToAbout} className="btn btn-outline btn-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            TENTANG KAMI <i className="fa-solid fa-arrow-right-long"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="hero-media">
                <div className="hero-img-container">
                    <img src="assets/dash.jpeg?v=1.1" alt="Waterboom Cijoho Indah Main Attraction" className="hero-img" />
                </div>
                
                {/* Circular Double Curves Stroke overlay */}
                <svg className="hero-curves" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 37.5,0 C 7.5,20 7.5,80 14.5,100" stroke="#bde0fe" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 35.5,0 C 5.5,20 5.5,80 12.5,100" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>

                {/* Sun Flare Overlay */}
                <div className="sun-flare">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="18" fill="rgba(255, 235, 150, 0.8)" style={{ filter: 'blur(5px)' }} />
                        <circle cx="50" cy="50" r="8" fill="#ffffff" />
                        <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" stroke="rgba(255, 240, 180, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path d="M50 12 L50 88 M12 50 L88 50 M22 22 L78 78 M22 78 L78 22" stroke="rgba(255, 245, 200, 0.35)" strokeWidth="2.5" />
                    </svg>
                </div>

                {/* Water Splash Overlay */}
                <div className="water-splash-overlay">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,200 Q 50,150 100,160 T 170,80 Q 185,50 200,60 L 200,200 Z" fill="rgba(186, 226, 255, 0.45)" />
                        <path d="M 0,200 Q 40,170 80,180 T 150,110 Q 165,80 180,90 L 180,200 Z" fill="rgba(23, 143, 230, 0.15)" />
                        <path d="M 30,120 C 25,100 5,90 20,80 C 35,70 45,95 40,110 Z" fill="rgba(186, 226, 255, 0.4)" />
                        <path d="M 80,80 C 75,65 60,60 70,50 C 80,40 90,55 85,70 Z" fill="rgba(186, 226, 255, 0.3)" />
                    </svg>
                </div>

                <div className="water-drop drop-1"></div>
                <div className="water-drop drop-2"></div>
                <div className="water-drop drop-3"></div>
                <div className="water-drop drop-4"></div>
                <div className="water-drop drop-5"></div>
                <div className="water-drop drop-6"></div>
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
