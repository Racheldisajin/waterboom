import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BeritaPage() {
    const featuredSlides = [
        {
            id: 101,
            title: 'Waterboom Cijoho Indah Buka Musim Liburan 2026!',
            category: 'INFORMASI KHUSUS',
            date: '18 Mei 2026',
            image: 'assets/3.png?v=1.1',
            desc: 'Nikmati berbagai wahana seru, kolam yang menyegarkan, dan fasilitas terbaik untuk liburan tak terlupakan bersama keluarga.'
        },
        {
            id: 102,
            title: 'Keseruan Mandi Busa Setiap Akhir Pekan di Kolam Utama',
            category: 'EVENT TERBARU',
            date: '14 Mei 2026',
            image: 'assets/bebek.png?v=1.1',
            desc: 'Jangan lewatkan keseruan mandi busa melimpah bersama seluruh keluarga setiap hari Sabtu dan Minggu mulai jam 10 pagi.'
        },
        {
            id: 103,
            title: 'Fasilitas Gazebo Baru Lebih Teduh & Nyaman Untuk Bersantai',
            category: 'FASILITAS',
            date: '10 Mei 2026',
            image: 'assets/saung.png.png?v=1.1',
            desc: 'Telah dibuka area saung dan gazebo baru dengan desain bambu modern yang siap menemani waktu istirahat Anda.'
        },
        {
            id: 104,
            title: 'Kursus Renang Anak Bersama Instruktur Profesional Berlisensi',
            category: 'PROGRAM',
            date: '05 Mei 2026',
            image: 'assets/kids.png?v=1.1',
            desc: 'Buka pendaftaran baru kelas berenang untuk anak-anak dengan jadwal fleksibel dan pelatih berpengalaman.'
        }
    ];

    const latestNews = [
        {
            id: 201,
            title: 'Promo Spesial Libur Sekolah: Tiket Hemat dan Diskon Paket Keluarga',
            dateDay: '12',
            dateMonth: 'MEI',
            image: 'assets/1.png?v=1.1',
            desc: 'Dapatkan harga spesial untuk tiket masuk dan paket keluarga selama libur sekolah!',
            theme: 'blue'
        },
        {
            id: 202,
            title: 'Wahana Baru! Seluncuran Spiral Siap Uji Adrenalin Anda',
            dateDay: '07',
            dateMonth: 'MEI',
            image: 'assets/pool.png.png?v=1.1',
            desc: 'Rasakan sensasi baru meluncur dari ketinggian dengan tikungan seru dan aman.',
            theme: 'green'
        },
        {
            id: 203,
            title: 'Tips Aman & Nyaman Bermain Air Bersama Keluarga',
            dateDay: '05',
            dateMonth: 'JAN',
            image: 'assets/bebek.png?v=1.1',
            desc: 'Simak tips keselamatan dan kenyamanan saat bermain air di waterboom.',
            theme: 'orange'
        },
        {
            id: 204,
            title: 'Sewa Gazebo Lebih Nyaman untuk Acara Keluarga',
            dateDay: '02',
            dateMonth: 'DES',
            image: 'assets/saung.png.png?v=1.1',
            desc: 'Nikmati waktu berkualitas dengan keluarga di gazebo yang teduh dan nyaman.',
            theme: 'purple'
        }
    ];

    const archiveNews = [
        {
            id: 301,
            title: '🎉 Diskon Tiket Rombongan Sekolah & Komunitas 25%',
            category: 'Promo',
            date: '28 April 2026',
            image: 'assets/3.png?v=1.1',
            desc: 'Sambut liburan dengan diskon khusus 25% untuk rombongan sekolah dan komunitas dengan jumlah minimal 20 orang.',
            readTime: '3 min read'
        },
        {
            id: 302,
            title: '🧸 Grand Launching Area Bermain Air "Kids Waterplay"',
            category: 'Fasilitas',
            date: '15 April 2026',
            image: 'assets/kids.png?v=1.1',
            desc: 'Resmi dibuka! Ember tumpah raksasa, air mancur interaktif, dan seluncuran mini ramah anak kini siap dinikmati.',
            readTime: '2 min read'
        },
        {
            id: 303,
            title: '🏊 Kenali Manfaat Berenang Sejak Dini Untuk Anak-Anak',
            category: 'Tips & Edukasi',
            date: '02 April 2026',
            image: 'assets/bebek.png?v=1.1',
            desc: 'Berenang membantu perkembangan motorik dan fisik anak. Simak tips memulai latihan renang dengan menyenangkan.',
            readTime: '4 min read'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredSlides.length]);

    const scrollToArchive = () => {
        const element = document.getElementById('news-archive');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="news-page-wrapper">
            <div className="container" style={{ padding: '10px 24px 40px 24px' }}>
                
                {/* Header Title Area */}
                <div className="news-header-section">
                    <div className="news-header-left">
                        <div className="news-badge-capsule">
                            <span className="badge-dot"></span>
                            <span>BERITA TERKINI</span>
                        </div>
                        <h1 className="news-page-title">Berita & Informasi</h1>
                        <p className="news-page-subtitle">
                            Update terbaru seputar Waterboom Cijoho Indah untuk Anda dan keluarga.
                        </p>
                        <div className="news-header-accent-lines">
                            <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 3 C 8 0, 10 6, 16 3 C 22 0, 24 6, 30 3 C 36 0, 38 6, 43 3" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M2 7 C 8 4, 10 10, 16 7 C 22 4, 24 10, 30 7 C 36 4, 38 10, 43 7" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </div>
                    </div>
                    <button className="btn btn-outline-blue btn-pill news-header-btn" onClick={scrollToArchive}>
                        <i className="fa-regular fa-newspaper" style={{ marginRight: '8px' }}></i> Lihat Semua Berita <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: '6px' }}></i>
                    </button>
                </div>

                {/* Main 2-Column Grid */}
                <div className="news-main-grid">
                    
                    {/* Left Column: Featured News Slider */}
                    <div className="news-slider-column">
                        <div className="featured-news-slider">
                            {featuredSlides.map((slide, index) => (
                                <div 
                                    key={slide.id} 
                                    className={`slide-item ${index === currentSlide ? 'active' : ''}`}
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="slide-overlay">
                                        <div className="slide-badges">
                                            <span className="slide-badge-new">
                                                <span className="badge-dot-red"></span> BERITA TERBARU
                                            </span>
                                            <span className="slide-badge-date">
                                                <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i> {slide.date}
                                            </span>
                                        </div>
                                        <div className="slide-body">
                                            <span className="slide-category">{slide.category}</span>
                                            <h2 className="slide-title">{slide.title}</h2>
                                            <p className="slide-desc">{slide.desc}</p>
                                            <Link to={`/berita#${slide.id}`} className="btn btn-white btn-pill btn-arrow slide-cta">
                                                Baca Selengkapnya <i className="fa-solid fa-arrow-right-long"></i>
                                            </Link>
                                        </div>
                                        
                                        {/* Splash water icon overlay on bottom right */}
                                        <div className="slide-splash-overlay">
                                            <svg width="60" height="50" viewBox="0 0 60 50" fill="#ffffff" opacity="0.8" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M42 35 C42 31, 38 27, 34 27 C34 27, 32 31, 32 33 C32 35, 34 37, 36 37 C38 37, 42 35, 42 35 Z" />
                                                <path d="M50 40 C50 37, 45 32, 41 32 C41 32, 39 36, 39 38 C39 41, 41 43, 43 43 C45 43, 50 40, 50 40 Z" />
                                                <path d="M30 45 C30 41, 26 36, 22 36 C22 36, 20 40, 20 42 C20 45, 22 47, 24 47 C26 47, 30 45, 30 45 Z" />
                                                <path d="M10 47 C15 47, 35 48, 55 47" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M15 49 C20 49, 35 50, 50 49" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Slider Indicator Dots */}
                        <div className="slide-dots">
                            {featuredSlides.map((_, index) => (
                                <button 
                                    key={index} 
                                    className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Latest News List */}
                    <div className="news-list-column">
                        <div className="news-list-header">
                            <div className="news-list-title-wrap">
                                <span className="news-list-icon">
                                    <i className="fa-solid fa-bullhorn"></i>
                                </span>
                                <h3 className="news-list-title">Terbaru di Waterboom</h3>
                            </div>
                            <div className="news-list-line"></div>
                        </div>

                        <div className="latest-news-list">
                            {latestNews.map((item) => (
                                <div key={item.id} className="latest-news-card">
                                    <div className="latest-news-img-wrap">
                                        <img src={item.image} alt={item.title} className="latest-news-img" />
                                    </div>
                                    <div className={`latest-news-date-block theme-${item.theme}`}>
                                        <span className="latest-date-day">{item.dateDay}</span>
                                        <span className="latest-date-month">{item.dateMonth}</span>
                                    </div>
                                    <div className="latest-news-content">
                                        <h4 className="latest-news-title">{item.title}</h4>
                                        <p className="latest-news-desc">{item.desc}</p>
                                    </div>
                                    <div className="latest-news-arrow">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Promo Banner */}
                <div className="news-bottom-banner">
                    {/* Left water decoration */}
                    <svg width="45" height="35" viewBox="0 0 45 35" fill="#1a73e8" opacity="0.3" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-10deg)' }}>
                        <path d="M 25 15 C 20 12, 12 6, 8 2 C 12 8, 14 16, 19 18 C 21 19, 23 18, 25 15" opacity="0.8"/>
                        <path d="M 35 22 C 28 20, 16 16, 6 14 C 14 19, 20 25, 26 28 C 29 29, 32 28, 35 22" opacity="1"/>
                        <path d="M 28 32 C 24 29, 18 24, 12 20 C 16 24, 18 30, 21 32 C 23 33, 26 33, 28 32" opacity="0.6"/>
                    </svg>
                    
                    <div className="bottom-banner-content">
                        <i className="fa-regular fa-calendar-check bottom-banner-icon"></i>
                        <span className="bottom-banner-text">Ikuti terus update terbaru dan promo menarik hanya di Waterboom Cijoho Indah!</span>
                    </div>

                    {/* Right water decoration */}
                    <svg width="45" height="35" viewBox="0 0 45 35" fill="#1a73e8" opacity="0.3" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1) rotate(-10deg)' }}>
                        <path d="M 25 15 C 20 12, 12 6, 8 2 C 12 8, 14 16, 19 18 C 21 19, 23 18, 25 15" opacity="0.8"/>
                        <path d="M 35 22 C 28 20, 16 16, 6 14 C 14 19, 20 25, 26 28 C 29 29, 32 28, 35 22" opacity="1"/>
                        <path d="M 28 32 C 24 29, 18 24, 12 20 C 16 24, 18 30, 21 32 C 23 33, 26 33, 28 32" opacity="0.6"/>
                    </svg>
                </div>

                {/* Grid Berita & Promo Lainnya */}
                <div id="news-archive" className="archive-section" style={{ marginTop: '80px', borderTop: '1px solid #e2eaf4', paddingTop: '60px' }}>
                    <div className="section-header-center" style={{ marginBottom: '40px' }}>
                        <h5 className="section-badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ opacity: 0.6 }}>—— •</span> ARSIP INFORMASI <span style={{ opacity: 0.6 }}>• ——</span>
                        </h5>
                        <h2 className="section-title-center" style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-primary)' }}>
                            Berita & Promo Lainnya
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {archiveNews.map(article => (
                            <article 
                                key={article.id}
                                className="archive-card"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-soft)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #e2eaf4',
                                    transition: 'var(--transition-smooth)'
                                }}
                            >
                                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                                    <img 
                                        src={article.image} 
                                        alt={article.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        backgroundColor: article.category === 'Promo' ? '#fff0f0' : '#eaf6ea',
                                        color: article.category === 'Promo' ? '#e8711a' : 'var(--color-accent-hover)',
                                        fontWeight: 800,
                                        fontSize: '0.75rem',
                                        padding: '6px 16px',
                                        borderRadius: '50px',
                                        border: article.category === 'Promo' ? '1px solid #ffccd2' : '1px solid #cce8cc'
                                    }}>
                                        {article.category}
                                    </span>
                                </div>
                                
                                <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center', 
                                        fontSize: '0.8rem', 
                                        color: 'var(--color-text-muted)',
                                        marginBottom: '12px'
                                    }}>
                                        <span><i className="fa-regular fa-calendar-days" style={{ marginRight: '6px' }}></i>{article.date}</span>
                                        <span><i className="fa-regular fa-clock" style={{ marginRight: '6px' }}></i>{article.readTime}</span>
                                    </div>

                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '12px', color: 'var(--color-primary)' }}>
                                        {article.title}
                                    </h3>

                                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                                        {article.desc}
                                    </p>

                                    <button 
                                        style={{
                                            alignSelf: 'flex-start',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#1a73e8',
                                            fontWeight: 700,
                                            fontSize: '0.88rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                        className="btn-arrow"
                                    >
                                        Selengkapnya <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
