import React from 'react';

export default function WahanaPage() {
    const wahanas = [
        {
            id: 1,
            title: 'Water Slides',
            desc: 'Beragam seluncuran air seru dan aman untuk anak-anak maupun dewasa.',
            icon: '/assets/pool.png.png',
            bgGradient: 'linear-gradient(135deg, #052049 0%, #0d3875 100%)',
            details: [
                'Spiral Slider & Speed Slider yang menantang adrenalin.',
                'Family Racing Slider untuk meluncur bersama keluarga.',
                'Dilengkapi dengan lifeguard profesional di setiap titik seluncur.',
                'Standar keamanan internasional dengan bantalan air yang aman.'
            ],
            level: 'Tinggi s/d Sedang',
            safety: 'Tinggi minimal 110cm, gunakan pakaian renang standar.'
        },
        {
            id: 2,
            title: 'Swimming Pools',
            desc: 'Kolam renang yang bersih, segar, dan nyaman untuk seluruh keluarga.',
            icon: '/assets/kolam.png.png',
            bgGradient: 'linear-gradient(135deg, #008a90 0%, #00747a 100%)',
            details: [
                'Kolam dewasa semi-olympic dengan air jernih dan segar.',
                'Kolam arus santai (lazy river) untuk rileks menikmati suasana.',
                'Penyaringan air modern bersertifikasi menjaga higienitas.',
                'Tersedia sewa ban pelampung single & double.'
            ],
            level: 'Semua Umur',
            safety: 'Anak-anak di bawah 12 tahun wajib dalam pengawasan orang tua.'
        },
        {
            id: 3,
            title: 'Kids Waterplay',
            desc: 'Area bermain interaktif yang aman dan menyenangkan khusus untuk anak.',
            icon: '/assets/duck.png',
            bgGradient: 'linear-gradient(135deg, #92c83e 0%, #7eb32b 100%)',
            details: [
                'Ember tumpah raksasa yang selalu dinanti-nantikan anak-anak.',
                'Air mancur interaktif dan seluncuran mini yang sangat aman.',
                'Kedalaman kolam yang sangat dangkal (maksimal 40cm).',
                'Lingkungan bermain yang ramah dan penuh warna-warni ceria.'
            ],
            level: 'Anak-anak (Khusus)',
            safety: 'Pendampingan orang tua sangat disarankan.'
        },
        {
            id: 4,
            title: 'Gazebo & Rest Area',
            desc: 'Area yang nyaman untuk beristirahat sambil menikmati suasana.',
            icon: '/assets/saung.png.png',
            bgGradient: 'linear-gradient(135deg, #e8f1fc 0%, #d4e5f9 100%)',
            textColor: '#052049',
            details: [
                'Gazebo kayu bernuansa tropis yang sejuk dan rindang.',
                'Ruang istirahat bersih lengkap dengan stop kontak charger.',
                'Loker penyimpanan barang berharga yang aman.',
                'Dekat dengan area foodcourt dan fasilitas toilet utama.'
            ],
            level: 'Semua Umur',
            safety: 'Jaga kebersihan area sekitar, dilarang membuang sampah sembarangan.'
        }
    ];

    return (
        <div className="page-wrapper">
            <div className="container" style={{ padding: '20px 24px 40px 24px' }}>
                {/* Header Banner */}
                <div className="page-header-center">
                    <h5 className="section-badge-green">WAHANA & ATRAKSI</h5>
                    <h1 className="page-title">WAHANA SERU KAMI</h1>
                    <p className="page-subtitle">
                        Jelajahi berbagai pilihan permainan air seru dan area bersantai premium yang kami rancang khusus untuk kebahagiaan Anda sekeluarga.
                    </p>
                </div>

                {/* Wahana List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '40px' }}>
                    {wahanas.map((wahana) => (
                        <div 
                            key={wahana.id}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-soft)',
                                border: '1px solid var(--color-border)',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                transition: 'var(--transition-smooth)'
                            }}
                            className="card-hover"
                        >
                            {/* Card Banner Column - Centered Badge Layout */}
                            <div style={{
                                background: wahana.bgGradient,
                                color: wahana.textColor || 'white',
                                padding: '50px 30px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                {/* Circular White Badge Icon */}
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    marginBottom: '20px',
                                    padding: '14px',
                                    boxSizing: 'border-box',
                                    flexShrink: 0
                                }}>
                                    <img 
                                        src={wahana.icon} 
                                        alt={wahana.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>

                                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: wahana.textColor || 'white', marginBottom: '10px' }}>
                                    {wahana.title}
                                </h2>
                                <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5, color: wahana.textColor || 'white', maxWidth: '85%', margin: 0 }}>
                                    {wahana.desc}
                                </p>
                            </div>

                            {/* Details Column */}
                            <div style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '16px' }}>
                                        Keunggulan & Fasilitas:
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {wahana.details.map((detail, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                                                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-accent)', marginTop: '4px', flexShrink: 0 }}></i>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ 
                                    marginTop: '28px', 
                                    paddingTop: '20px', 
                                    borderTop: '1px solid var(--color-border)',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px'
                                }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            TINGKAT WAHANA
                                        </span>
                                        <p style={{ margin: '4px 0 0 0', fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                            {wahana.level}
                                        </p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            PANDUAN KEAMANAN
                                        </span>
                                        <p style={{ margin: '4px 0 0 0', fontWeight: 700, fontSize: '0.82rem', color: '#ef4444', lineHeight: 1.3 }}>
                                            {wahana.safety}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
