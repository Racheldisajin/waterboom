import React from 'react';

export default function Testimonial() {
    return (
        <section id="testimonial" className="testimonial-section">
            <div className="container">
                <div className="testimonial-card">
                    {/* Decorative splash overlay */}
                    <div className="testimonial-splash-bg">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0,200 Q 50,150 100,160 T 170,80 Q 185,50 200,60 L 200,200 Z" fill="rgba(186, 226, 255, 0.25)" />
                            <path d="M 30,120 C 25,100 5,90 20,80 C 35,70 45,95 40,110 Z" fill="rgba(186, 226, 255, 0.2)" />
                        </svg>
                    </div>

                    <div className="testimonial-content">
                        {/* Quote Mark Icon "66" */}
                        <div className="testimonial-quote-icon">
                            <svg width="45" height="32" viewBox="0 0 36 26" fill="var(--color-accent)" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.91C0 6.27 5.41 0 13.23 0V5.15C9.72 5.15 7.65 8.03 7.65 11.23C7.65 12.05 7.97 12.57 8.78 12.57C9.81 12.57 11.83 12.05 13.54 13.7C15.34 15.45 15.65 18.33 14.53 20.81C13.27 23.59 10.12 25.13 6.97 25.13C2.88 25.13 0 21.63 0 13.91ZM19.8 13.91C19.8 6.27 25.21 0 33.03 0V5.15C29.52 5.15 27.45 8.03 27.45 11.23C27.45 12.05 27.77 12.57 28.58 12.57C29.61 12.57 31.63 12.05 33.34 13.7C35.14 15.45 35.45 18.33 34.33 20.81C33.07 23.59 29.92 25.13 26.77 25.13C22.68 25.13 19.8 21.63 19.8 13.91Z" />
                            </svg>
                        </div>

                        <blockquote className="testimonial-quote-text">
                            Tempatnya bersih, wahananya seru, karyawan ramah, suasana tropis, dan momen tak terlupakan.
                        </blockquote>

                        <div className="testimonial-line"></div>

                        <cite className="testimonial-quote-author">
                            - Pengunjung Waterboom Cijoho Indah
                        </cite>

                        {/* Pagination dots */}
                        <div className="testimonial-pagination">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>

                    {/* Smooth curve overlay divider */}
                    <svg className="testimonial-curve-divider" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,0 L 80,0 C 70,30 55,70 40,100 L 0,100 Z" />
                    </svg>

                    <div className="testimonial-image-area">
                        <div className="testimonial-image" style={{ backgroundImage: "url('assets/1.png?v=1.1')" }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
