import React from 'react';

export default function Gallery() {
    return (
        <section id="gallery" className="gallery-section">
            <div className="container">
                <div className="gallery-header">
                    <h2 className="gallery-title">MOMEN SERU DI WATERBOOM CIJOHO INDAH</h2>
                    <a href="#gallery" className="gallery-all-link">LIHAT SEMUA <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="gallery-grid">
                    <div className="gallery-item card-hover">
                        <img src="assets/gallery_1.png" alt="Serunya seluncuran air" />
                    </div>
                    <div className="gallery-item card-hover">
                        <img src="assets/gallery_2.png" alt="Gazebo rindang" />
                    </div>
                    <div className="gallery-item card-hover">
                        <img src="assets/gallery_3.png" alt="Kolam utama" />
                    </div>
                    <div className="gallery-item card-hover">
                        <img src="assets/gallery_4.png" alt="Suasana rindang" />
                    </div>
                    <div className="gallery-item card-hover">
                        <img src="assets/about.png" alt="Waterboom Cijoho" />
                    </div>
                </div>
            </div>
        </section>
    );
}
