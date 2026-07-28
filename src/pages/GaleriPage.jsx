import React, { useState } from 'react';
import WaveDivider from '../components/WaveDivider';

export default function GaleriPage() {
    const categories = ['Semua', 'Wahana & Seluncuran', 'Kolam Renang', 'Fasilitas & Gazebo', 'Suasana & Lingkungan'];
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [lightboxImage, setLightboxImage] = useState(null);

    const folderPath = '/assets/drive-download-20260728T150001Z-1-001/';

    const galleryItems = [
        { id: 1, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.12 (1).jpeg`, category: 'Wahana & Seluncuran', title: 'Wahana Utama Waterboom Cijoho' },
        { id: 2, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.13 (1).jpeg`, category: 'Kolam Renang', title: 'Kolam Renang & Area Bersantai' },
        { id: 3, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.13 (2).jpeg`, category: 'Wahana & Seluncuran', title: 'Seluncuran Spiral Waterboom' },
        { id: 4, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.14 (1).jpeg`, category: 'Fasilitas & Gazebo', title: 'Pondokan Gazebo Tropis' },
        { id: 5, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.14 (2).jpeg`, category: 'Fasilitas & Gazebo', title: 'Suasana Rindang Saung Cijoho' },
        { id: 6, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.14 (3).jpeg`, category: 'Suasana & Lingkungan', title: 'Keceriaan Pengunjung Waterboom' },
        { id: 7, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.15 (1).jpeg`, category: 'Wahana & Seluncuran', title: 'Area Bermain Air Anak-Anak' },
        { id: 8, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.15 (2).jpeg`, category: 'Wahana & Seluncuran', title: 'Pemberhentian Sluncuran Air' },
        { id: 9, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.15 (3).jpeg`, category: 'Kolam Renang', title: 'Kolam Jernih & Asri' },
        { id: 10, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.16 (1).jpeg`, category: 'Suasana & Lingkungan', title: 'Suasana Rekreasi Keluarga' },
        { id: 11, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.16 (2).jpeg`, category: 'Wahana & Seluncuran', title: 'Luncuran Lurus Kecepatan Tinggi' },
        { id: 12, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.16 (3).jpeg`, category: 'Suasana & Lingkungan', title: 'Area Parkir & Akses Masuk' },
        { id: 13, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.16 (4).jpeg`, category: 'Wahana & Seluncuran', title: 'Ember Tumpah Raksasa Cijoho' },
        { id: 14, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.17 (1).jpeg`, category: 'Suasana & Lingkungan', title: 'Grup Rombongan Liburan' },
        { id: 15, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.17 (2).jpeg`, category: 'Kolam Renang', title: 'Pemandangan Kolam Renang dari Atas' },
        { id: 16, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.17 (3).jpeg`, category: 'Fasilitas & Gazebo', title: 'Gazebo Bersantai Bersama' },
        { id: 17, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.18 (1).jpeg`, category: 'Wahana & Seluncuran', title: 'Keceriaan Anak Bermain Air' },
        { id: 18, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.18 (2).jpeg`, category: 'Suasana & Lingkungan', title: 'Spot Foto Pemandangan Waterboom' },
        { id: 19, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.18 (4).jpeg`, category: 'Kolam Renang', title: 'Kolam Renang Dewasa Semi Olympic' },
        { id: 20, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.18 (5).jpeg`, category: 'Wahana & Seluncuran', title: 'Wahana Seluncuran Warna-Warni' },
        { id: 21, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.19 (1).jpeg`, category: 'Fasilitas & Gazebo', title: 'Area Duduk & Istirahat Rindang' },
        { id: 22, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.19 (2).jpeg`, category: 'Fasilitas & Gazebo', title: 'Sewa Ban Pelampung Waterboom' },
        { id: 23, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.19.jpeg`, category: 'Kolam Renang', title: 'Pengunjung Menikmati Kesegaran Air' },
        { id: 24, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.20 (1).jpeg`, category: 'Suasana & Lingkungan', title: 'Suasana Asri Di Lingkungan Cijoho' },
        { id: 25, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.20 (2).jpeg`, category: 'Wahana & Seluncuran', title: 'Wahana Permainan Bebek Air' },
        { id: 26, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.20 (3).jpeg`, category: 'Kolam Renang', title: 'Kolam Arus Santai (Lazy River)' },
        { id: 27, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.20.jpeg`, category: 'Suasana & Lingkungan', title: 'Suasana Siang Hari Waterboom' },
        { id: 28, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.21 (1).jpeg`, category: 'Fasilitas & Gazebo', title: 'Spot Nyaman Bersantai Keluarga' },
        { id: 29, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.21 (2).jpeg`, category: 'Suasana & Lingkungan', title: 'Panorama Indah Waterboom Cijoho' },
        { id: 30, src: `${folderPath}WhatsApp Image 2026-05-26 at 11.13.21.jpeg`, category: 'Kolam Renang', title: 'Kesegaran Air Kolam Cijoho' }
    ];

    const filteredItems = selectedCategory === 'Semua' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === selectedCategory);

    return (
        <div className="page-wrapper">
            <div className="container" style={{ padding: '20px 24px 20px 24px' }}>
                {/* Title Section */}
                <div className="page-header-center">
                    <h5 className="section-badge-green">GALERI FOTO RESMI</h5>
                    <h1 className="page-title">Dokumentasi Waterboom Cijoho Indah</h1>
                    <p className="page-subtitle">
                        Koleksi foto asli suasana, wahana, kolam renang, dan keceriaan pengunjung di Waterboom Cijoho Indah.
                    </p>
                    <WaveDivider type="accent" />
                </div>

                <div style={{ padding: '20px 0 80px 0' }}>
                    {/* Filter Categories */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        flexWrap: 'wrap', 
                        gap: '10px', 
                        marginBottom: '36px',
                        width: '100%'
                    }}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '10px 22px',
                                    borderRadius: '50px',
                                    border: '2px solid',
                                    borderColor: selectedCategory === category ? 'var(--color-accent)' : 'var(--color-border)',
                                    backgroundColor: selectedCategory === category ? 'var(--color-accent)' : 'white',
                                    color: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
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
                                onClick={() => setLightboxImage(item)}
                                style={{
                                    borderRadius: '18px',
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
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease'
                                    }}
                                />
                                {/* Clean photo card with hover zoom effect */}
                                <div className="gallery-zoom-hover-overlay" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(12, 41, 74, 0.25)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '1.5rem'
                                }}>
                                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX POPUP MODAL FOR FULLSCREEN PHOTO VIEW */}
            {lightboxImage && (
                <div 
                    onClick={() => setLightboxImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(12, 41, 74, 0.92)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: 'none',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        &times;
                    </button>

                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '80vh',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            backgroundColor: '#000',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <img 
                            src={lightboxImage.src} 
                            alt={lightboxImage.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                objectFit: 'contain'
                            }}
                        />
                        <div style={{ padding: '16px 24px', backgroundColor: '#0c294a', width: '100%', textCenter: 'center', color: 'white', boxSizing: 'border-box' }}>
                            <span style={{ color: '#93c5fd', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {lightboxImage.category}
                            </span>
                            <h3 style={{ color: 'white', margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: 900 }}>
                                {lightboxImage.title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
