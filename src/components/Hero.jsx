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
            <div className="container hero-container">
                <div className="hero-content">
                    <h5 className="hero-badge">SELAMAT DATANG DI WATERBOOM CIJOHO</h5>
                    <h1 className="hero-title">
                        SENSASI SERU <span className="highlight-green">TANPA BATAS</span> DIMULAI DI SINI!
                    </h1>
                    <p className="hero-desc">
                        Nikmati momen liburan bersama keluarga di kolam renang yang nyaman dan menyenangkan. Wahana seru untuk semua usia, bersantai, dan berpetualang!
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-accent btn-arrow" onClick={() => onOpenBooking()}>
                            BELI TIKET <i className="fa-solid fa-circle-arrow-right"></i>
                        </button>
                        <a href="#about" onClick={handleScrollToAbout} className="btn btn-outline">TENTANG KAMI</a>
                    </div>
                </div>
                <div className="hero-media">
                    <div className="hero-img-backdrop"></div>
                    <img src="assets/hero.png" alt="Waterboom Cijoho Indah Main Attraction" className="hero-img" />
                </div>
            </div>
        </section>
    );
}
