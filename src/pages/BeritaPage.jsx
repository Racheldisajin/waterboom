import React, { useState, useEffect } from 'react';

export default function BeritaPage() {
    const folderPath = '/assets/drive-download-20260728T150001Z-1-001/';

    const featuredSlides = [
        {
            id: 101,
            title: 'Waterboom Cijoho Indah Buka Musim Liburan 2026!',
            category: 'INFORMASI KHUSUS',
            date: '18 Mei 2026',
            image: '/assets/1.png',
            desc: 'Nikmati berbagai wahana seru, kolam yang menyegarkan, dan fasilitas terbaik untuk liburan tak terlupakan bersama keluarga.',
            content: `Sambut musim liburan tahun 2026, Waterboom Cijoho Indah menghadirkan pengalaman rekreasi keluarga yang jauh lebih segar, nyaman, dan menyenangkan!\n\nKami telah melakukan berbagai peningkatan fasilitas mulai dari sterilisasi pengolahan air berkala, perluasan area saung gazebo bambu, hingga pemeliharaan seluruh seluncuran air demi menjamin standar keamanan tertinggi.\n\nPengunjung kini dapat menikmati berbagai wahana unggulan seperti ember tumpah raksasa, wahana bebek air, seluncuran spiral, dan kolam renang dewasa semi-olympic dengan suasana alam yang sejuk dan asri. Tiket dapat dipesan secara online langsung melalui aplikasi atau dibeli di loket pintu masuk.`
        },
        {
            id: 102,
            title: 'Keseruan Mandi Busa Setiap Akhir Pekan di Kolam Utama',
            category: 'EVENT TERBARU',
            date: '14 Mei 2026',
            image: '/assets/3.png',
            desc: 'Jangan lewatkan keseruan mandi busa melimpah bersama seluruh keluarga setiap hari Sabtu dan Minggu mulai jam 10 pagi.',
            content: `Acara Mandi Busa Spesial kini menjadi magnet utama kebahagiaan anak-anak dan keluarga di Waterboom Cijoho Indah!\n\nSetiap hari Sabtu dan Minggu jam 10:00 WIB & 14:00 WIB, area kolam utama akan dihujani busa melimpah yang aman, ramah lingkungan, dan tidak pedih di mata. Acara ini dipandu oleh musik ceria dan pengawasan ketat dari staf penyelamat profesional.\n\nBawa perlengkapan berenang terbaik Anda dan nikmati momen kegembiraan mandi busa bersama keluarga tanpa biaya tambahan!`
        },
        {
            id: 103,
            title: 'Fasilitas Gazebo Baru Lebih Teduh & Nyaman Untuk Bersantai',
            category: 'FASILITAS',
            date: '10 Mei 2026',
            image: '/assets/5.png',
            desc: 'Telah dibuka area saung dan gazebo baru dengan desain bambu modern yang siap menemani waktu istirahat Anda.',
            content: `Guna menambah kenyamanan pengunjung saat beristirahat, Waterboom Cijoho Indah menambah 10 unit Saung Gazebo baru bernuansa tropis yang sejuk.\n\nSetiap gazebo dilengkapi dengan colokan listrik, tempat duduk yang bersih, dan posisi strategis menghadap ke area kolam renang. Pengunjung dapat menyewa gazebo ini dengan tarif terjangkau sebesar Rp 20.000 per sesi atau memesannya secara online mendampingi pembelian tiket masuk.`
        },
        {
            id: 104,
            title: 'Kursus Renang Anak Bersama Instruktur Profesional Berlisensi',
            category: 'PROGRAM',
            date: '05 Mei 2026',
            image: '/assets/1.png',
            desc: 'Buka pendaftaran baru kelas berenang untuk anak-anak dengan jadwal fleksibel dan pelatih berpengalaman.',
            content: `Ingin si kecil mahir berenang dengan teknik yang benar dan aman? Waterboom Cijoho Indah kini membuka Pendaftaran Program Les Renang Anak untuk tingkat pemula hingga lanjutan.\n\nDibimbing langsung oleh instruktur renang berpengalaman dan berlisensi resmi, program ini melatih ketahanan fisik, teknik pernapasan, serta gaya berenang dasar dalam lingkungan kolam yang terkontrol dan steril. Informasi pendaftaran lengkap dapat menghubungi Admin WhatsApp resmi kami.`
        }
    ];

    const latestNews = [
        {
            id: 201,
            title: 'Promo Spesial Libur Sekolah: Tiket Hemat dan Diskon Paket Keluarga',
            category: 'PROMO',
            dateDay: '12',
            dateMonth: 'MEI',
            date: '12 Mei 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.13 (1).jpeg`,
            desc: 'Dapatkan harga spesial untuk tiket masuk dan paket keluarga selama libur sekolah!',
            theme: 'blue',
            content: `Menyambut liburan sekolah, nikmati Promo Paket Hemat Keluarga dengan diskon hingga 15% untuk pembelian grup minimal 5 tiket!\n\nPromo berlaku untuk kunjungan di hari kerja (Senin - Jumat). Manfaatkan kesempatan ini untuk berlibur hemat bersama sanak saudara, teman kelas, maupun rombongan tetangga.`
        },
        {
            id: 202,
            title: 'Wahana Baru! Seluncuran Spiral Siap Uji Adrenalin Anda',
            category: 'WAHANA',
            dateDay: '07',
            dateMonth: 'MEI',
            date: '07 Mei 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.13 (2).jpeg`,
            desc: 'Rasakan sensasi baru meluncur dari ketinggian dengan tikungan seru dan aman.',
            theme: 'green',
            content: `Wahana Seluncuran Spiral terbaru telah resmi beroperasi! Dengan ketinggian lebih dari 8 meter dan kelokan spiral yang memacu adrenalin, wahana ini menjadi favorit baru para remaja dan pengunjung dewasa.\n\nDilengkapi dengan konstruksi fiberglass tebal bersertifikat dan pendaratan kolam yang dalam, nikmati sensasi meluncur cepat yang aman!`
        },
        {
            id: 203,
            title: 'Tips Aman & Nyaman Bermain Air Bersama Keluarga',
            category: 'TIPS',
            dateDay: '05',
            dateMonth: 'JAN',
            date: '05 Januari 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.18 (1).jpeg`,
            desc: 'Simak tips keselamatan dan kenyamanan saat bermain air di waterboom.',
            theme: 'orange',
            content: `Liburan di waterboom makin berkesan jika tetap utamakan keselamatan. Berikut beberapa tips penting saat berkunjung:\n\n1. Gunakan pakaian renang yang sesuai dan tidak menyerap air terlalu berat.\n2. Lakukan pemanasan ringan sebelum menceburkan diri ke kolam renang.\n3. Selalu awasi anak-anak balita di area kolam dangkal atau kenakan ban pelampung.\n4. Jaga kebersihan lingkungan dengan membuang sampah pada tempatnya.`
        },
        {
            id: 204,
            title: 'Sewa Gazebo Lebih Nyaman untuk Acara Keluarga',
            category: 'FASILITAS',
            dateDay: '02',
            dateMonth: 'DES',
            date: '02 Desember 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.14 (2).jpeg`,
            desc: 'Nikmati waktu berkualitas dengan keluarga di gazebo yang teduh dan nyaman.',
            theme: 'purple',
            content: `Gazebo Waterboom Cijoho Indah menjadi pilihan terbaik untuk tempat berkumpul acara ulang tahun, arisan keluarga, atau reuni kawan lama.\n\nBisa menampung hingga 8-10 orang dengan leluasa, dekat dengan area kantin dan fasilitas toilet/kamar bilas yang bersih.`
        }
    ];

    const archiveNews = [
        {
            id: 301,
            title: 'Diskon Tiket Rombongan Sekolah & Komunitas 25%',
            category: 'Promo',
            date: '28 April 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.17 (1).jpeg`,
            desc: 'Sambut liburan dengan diskon khusus 25% untuk rombongan sekolah dan komunitas dengan jumlah minimal 20 orang.',
            readTime: '3 min read',
            content: `Kabar gembira bagi instansi sekolah, grup senam, maupun komunitas! Waterboom Cijoho Indah memberikan penawaran diskon rombongan sebesar 25% khusus pemesanan kolektif minimal 20 tiket.\n\nSelain potongan harga tiket masuk, rombongan juga mendapatkan fasilitas pemesanan saung gazebo gratis dan area khusus berkumpul. Hubungi Admin WhatsApp kami untuk reservasi tanggal kunjungan.`
        },
        {
            id: 302,
            title: 'Grand Launching Area Bermain Air Kids Waterplay',
            category: 'Fasilitas',
            date: '15 April 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.15 (1).jpeg`,
            desc: 'Resmi dibuka! Ember tumpah raksasa, air mancur interaktif, dan seluncuran mini ramah anak kini siap dinikmati.',
            readTime: '2 min read',
            content: `Area wahana khusus balita dan anak-anak "Kids Waterplay" telah resmi beroperasi penuh! Menghadirkan permainan air mancur warna-warni, seluncuran mini bergelombang, dan ember tumpah mini yang aman.\n\nKedalaman air dibuat sangat dangkal (30cm) dengan lantai dasar berlapis anti-slip sehingga orang tua dapat tenang mendampingi keceriaan buah hati.`
        },
        {
            id: 303,
            title: 'Kenali Manfaat Berenang Sejak Dini Untuk Anak-Anak',
            category: 'Tips & Edukasi',
            date: '02 April 2026',
            image: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.20 (3).jpeg`,
            desc: 'Berenang membantu perkembangan motorik dan fisik anak. Simak tips memulai latihan renang dengan menyenangkan.',
            readTime: '4 min read',
            content: `Berenang bukan sekadar rekreasi seru, melainkan juga aktivitas olahraga terbaik untuk tumbuh kembang anak.\n\nBeberapa manfaat berenang sejak dini:\n1. Melatih kekuatan otot, paru-paru, dan keseimbangan motorik.\n2. Meningkatkan keberanian dan rasa percaya diri anak.\n3. Memberikan relaksasi alami dan meningkatkan kualitas tidur anak.\n\nAjak buah hati Anda berlatih renang secara berkala di kolam renang Waterboom Cijoho Indah yang bersih dan asri.`
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);

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
                                    onClick={() => setSelectedArticle(slide)}
                                    style={{ backgroundImage: `url("${slide.image}")`, cursor: 'pointer' }}
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
                                            <button 
                                                onClick={() => setSelectedArticle(slide)} 
                                                className="btn btn-white btn-pill btn-arrow slide-cta"
                                                style={{ border: 'none', cursor: 'pointer' }}
                                            >
                                                Baca Selengkapnya <i className="fa-solid fa-arrow-right-long"></i>
                                            </button>
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
                                <div 
                                    key={item.id} 
                                    className="latest-news-card"
                                    onClick={() => setSelectedArticle(item)}
                                    style={{ cursor: 'pointer' }}
                                >
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
                    <div className="bottom-banner-content">
                        <i className="fa-regular fa-calendar-check bottom-banner-icon"></i>
                        <span className="bottom-banner-text">Ikuti terus update terbaru dan promo menarik hanya di Waterboom Cijoho Indah!</span>
                    </div>
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
                                onClick={() => setSelectedArticle(article)}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-soft)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #e2eaf4',
                                    transition: 'var(--transition-smooth)',
                                    cursor: 'pointer'
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedArticle(article);
                                        }}
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

            {/* POPUP MODAL ARTIKEL BERITA SELENGKAPNYA */}
            {selectedArticle && (
                <div 
                    onClick={() => setSelectedArticle(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(12, 41, 74, 0.75)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 999999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            maxWidth: '680px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {/* Modal Header Image */}
                        <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
                            <img 
                                src={selectedArticle.image} 
                                alt={selectedArticle.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to top, rgba(12, 41, 74, 0.8) 0%, rgba(12, 41, 74, 0) 60%)'
                            }}></div>

                            <button
                                onClick={() => setSelectedArticle(null)}
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    border: 'none',
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    fontSize: '1.4rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10
                                }}
                            >
                                &times;
                            </button>

                            <div style={{ position: 'absolute', bottom: '16px', left: '24px', right: '24px', color: 'white' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ backgroundColor: 'var(--color-accent, #7cc04b)', color: '#0c294a', fontWeight: 900, fontSize: '0.72rem', padding: '4px 12px', borderRadius: '50px' }}>
                                        {selectedArticle.category}
                                    </span>
                                    <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                                        <i className="fa-regular fa-calendar" style={{ marginRight: '4px' }}></i> {selectedArticle.date}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body Content */}
                        <div style={{ padding: '28px' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0c294a', lineHeight: 1.35, marginBottom: '16px' }}>
                                {selectedArticle.title}
                            </h2>

                            <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '28px' }}>
                                {selectedArticle.content || selectedArticle.desc}
                            </div>

                            {/* Modal Footer Actions */}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '50px',
                                        border: '1px solid #cbd5e1',
                                        backgroundColor: '#f8fafc',
                                        color: '#475569',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        fontSize: '0.88rem'
                                    }}
                                >
                                    Tutup
                                </button>
                                <a
                                    href={`https://wa.me/6285320132014?text=Halo%20Waterboom%20Cijoho%20Indah%2C%20saya%20ingin%20bertanya%20mengenai%20berita%3A%20${encodeURIComponent(selectedArticle.title)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '50px',
                                        backgroundColor: '#25d366',
                                        color: 'white',
                                        fontWeight: 800,
                                        textDecoration: 'none',
                                        fontSize: '0.88rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <i className="fa-brands fa-whatsapp"></i> Tanya Admin WA
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
