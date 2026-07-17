import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
    const galleryItems = [
        {
            id: 1,
            image: 'assets/gallery_3.png?v=1.1',
            icon: 'fa-solid fa-person-swimming',
            title: 'KOLAM RENANG YANG MENYEGARKAN',
            desc: 'Nikmati kesegaran air yang jernih dan bersih untuk seluruh keluarga.'
        },
        {
            id: 2,
            image: 'assets/bebek.png?v=1.1',
            icon: 'fa-solid fa-ship',
            title: 'WAHANA AIR YANG MENYENANGKAN',
            desc: 'Berbagai wahana air seru yang siap memacu adrenalin Anda.'
        },
        {
            id: 3,
            image: 'assets/gallery_1.png?v=1.1',
            icon: 'fa-solid fa-water',
            title: 'SELUNCURAN MENANTANG',
            desc: 'Rasakan keseruan meluncur dari ketinggian di seluncuran favorit.'
        },
        {
            id: 4,
            image: 'assets/about.png?v=1.1',
            icon: 'fa-solid fa-ticket-simple',
            title: 'TIKET MASUK MUDAH & PRAKTIS',
            desc: 'Dapatkan tiket masuk dengan mudah dan cepat di loket kami.'
        },
        {
            id: 5,
            image: 'assets/saung.png.png?v=1.1',
            icon: 'fa-solid fa-store',
            title: 'GAZEBO & AREA ISTIRAHAT',
            desc: 'Bersantai bersama keluarga di gazebo yang nyaman dan teduh.'
        }
    ];

    return (
        <section id="gallery" className="gallery-section">
            <div className="container">
                
                {/* Header Layout */}
                <div className="gallery-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="gallery-header-icon-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '14px', border: '2px solid var(--color-accent)', color: 'var(--color-accent)', fontSize: '1.4rem' }}>
                            <i className="fa-regular fa-image"></i>
                        </div>
                        <div className="gallery-header-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '1px' }}>GALERI KEBAHAGIAAN</span>
                            <h2 className="gallery-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.5px' }}>MOMEN SERU DI WATERBOOM CIJOHO INDAH</h2>
                        </div>
                    </div>
                    <Link to="/galeri" className="gallery-all-link" style={{ color: 'var(--color-accent)', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', transition: 'var(--transition-smooth)' }}>
                        LIHAT SEMUA <i className="fa-solid fa-arrow-right-long"></i>
                    </Link>
                </div>

                {/* 5-Card Grid */}
                <div className="gallery-grid">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-card">
                            {/* Image with zoom glass */}
                            <div className="gallery-img-wrapper">
                                <img src={item.image} alt={item.title} className="gallery-img" />
                                <div className="gallery-zoom-badge">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            
                            {/* Card Body content */}
                            <div className="gallery-card-body">
                                <div className="gallery-card-icon">
                                    <i className={item.icon}></i>
                                </div>
                                <h3 className="gallery-card-title">{item.title}</h3>
                                <div className="gallery-card-line"></div>
                                <p className="gallery-card-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Water Splash Divider */}
                <div className="gallery-divider-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '60px' }}>
                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ height: '1.5px', backgroundColor: '#1a73e8', flexGrow: 1, opacity: 0.3 }}></div>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1a73e8', opacity: 0.6 }}></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1rem', lineHeight: 1, color: 'var(--color-accent)', fontWeight: 'bold' }}>••</span>
                        {/* Water splash SVG */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1a73e8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C12 3 13 7 14.5 8.5C16 10 19 10 19 10C19 10 16 11 15 12.5C14 14 13 17 13 17C13 17 12 14 11 12.5C10 11 7 10 7 10C7 10 10 10 11.5 8.5C13 7 12 3 12 3Z" />
                            <path d="M18 10 C18 8.5, 17 6, 17 6 C17 6, 15.5 8, 15.5 9 C15.5 10, 16.5 10.5, 17 10.5 C17.5 10.5, 18 10, 18 10 Z" opacity="0.8" />
                            <path d="M6 10 C6 8.5, 7 6, 7 6 C7 6, 8.5 8, 8.5 9 C8.5 10, 7.5 10.5, 7 10.5 C6.5 10.5, 6 10, 6 10 Z" opacity="0.8" transform="scale(-1, 1) translate(-14, 0)" />
                        </svg>
                        <span style={{ fontSize: '1rem', lineHeight: 1, color: 'var(--color-accent)', fontWeight: 'bold' }}>••</span>
                    </div>
                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1a73e8', opacity: 0.6 }}></div>
                        <div style={{ height: '1.5px', backgroundColor: '#1a73e8', flexGrow: 1, opacity: 0.3 }}></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
