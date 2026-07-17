import React, { useState } from 'react';

export default function GaleriPage() {
    const categories = ['Semua', 'Seluncuran', 'Kolam', 'Fasilitas & Gazebo'];
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const galleryItems = [
        { id: 1, src: 'assets/1.png?v=1.1', category: 'Seluncuran', title: 'Sensasi Meluncur Cepat' },
        { id: 2, src: 'assets/2.png?v=1.1', category: 'Fasilitas & Gazebo', title: 'Gazebo Teduh Rileks' },
        { id: 3, src: 'assets/3.png?v=1.1', category: 'Kolam', title: 'Kolam Air Arus Seru' },
        { id: 4, src: 'assets/4.png?v=1.1', category: 'Seluncuran', title: 'Seluncuran Air Spiral' },
        { id: 5, src: 'assets/5.png?v=1.1', category: 'Fasilitas & Gazebo', title: 'Pondokan Suasana Tropis' },
        { id: 6, src: 'assets/bebek.png?v=1.1', category: 'Kolam', title: 'Kolam Bebek Raksasa' },
        { id: 7, src: 'assets/dash.jpeg?v=1.1', category: 'Kolam', title: 'Wahana Utama Air Cijoho' },
        { id: 8, src: 'assets/gallery_1.png?v=1.1', category: 'Seluncuran', title: 'Meluncur Bersama Teman' },
        { id: 9, src: 'assets/gallery_2.png?v=1.1', category: 'Fasilitas & Gazebo', title: 'Gazebo Pinggir Kolam' },
        { id: 10, src: 'assets/gallery_3.png?v=1.1', category: 'Kolam', title: 'Area Kolam Rombongan' },
        { id: 11, src: 'assets/gallery_4.png?v=1.1', category: 'Fasilitas & Gazebo', title: 'Rest Area Sejuk' }
    ];

    const filteredItems = selectedCategory === 'Semua' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="page-wrapper">
            <div className="container" style={{ padding: '20px 24px 20px 24px' }}>
                {/* Title Section */}
                <div className="page-header-center">
                    <h5 className="section-badge-green">GALERI FOTO</h5>
                    <h1 className="page-title">Galeri Momen Seru</h1>
                    <p className="page-subtitle">
                        Abadikan momen-momen seru, tawa ceria keluarga, dan suasana menyegarkan di destinasi wisata air terbaik Tasikmalaya.
                    </p>
                    <div style={{ marginTop: '12px' }}>
                        <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3 C 8 0, 10 6, 16 3 C 22 0, 24 6, 30 3 C 36 0, 38 6, 43 3" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M2 7 C 8 4, 10 10, 16 7 C 22 4, 24 10, 30 7 C 36 4, 38 10, 43 7" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                        </svg>
                    </div>
                </div>

                <div style={{ padding: '20px 0 80px 0' }}>
                {/* Filter Categories */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexWrap: 'wrap', 
                    gap: '12px', 
                    marginBottom: '40px' 
                }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '50px',
                                border: '2px solid',
                                borderColor: selectedCategory === category ? 'var(--color-accent)' : 'var(--color-border)',
                                backgroundColor: selectedCategory === category ? 'var(--color-accent)' : 'white',
                                color: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: selectedCategory === category ? '0 4px 15px rgba(146, 200, 62, 0.3)' : 'none',
                                outline: 'none'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredItems.map(item => (
                        <div 
                            key={item.id}
                            style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-soft)',
                                backgroundColor: 'white',
                                position: 'relative',
                                aspectRatio: '4/3',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '1px solid var(--color-border)'
                            }}
                            className="card-hover"
                        >
                            <img 
                                src={item.src} 
                                alt={item.title} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease'
                                }}
                            />
                            
                            {/* Overlay on Hover */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                background: 'linear-gradient(to top, rgba(5, 32, 73, 0.95) 0%, rgba(5, 32, 73, 0) 100%)',
                                padding: '24px 20px 20px 20px',
                                color: 'white',
                                opacity: 1,
                                transition: 'opacity 0.3s ease'
                            }}>
                                <span style={{ 
                                    fontSize: '0.75rem', 
                                    fontWeight: 700, 
                                    color: 'var(--color-accent)', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '1px' 
                                }}>
                                    {item.category}
                                </span>
                                <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, marginTop: '4px' }}>
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
