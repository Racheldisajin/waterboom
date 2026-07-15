import React from 'react';

export default function Features() {
    return (
        <section id="features" className="floating-features-section">
            <div className="container">
                <div className="features-bar">
                    {/* Feature 1 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}>
                                <path d="M18 20V6M14 20V8" />
                                <path d="M14 10h4M14 14h4M14 18h4" />
                                <path d="M18 6C14 6, 12 16, 6 16C4 16, 2 20, 2 20" />
                                <path d="M1 20h6" />
                            </svg>
                        </div>
                        <div className="feature-info">
                            <h3>Water Slides</h3>
                            <p>Exciting water slides for all ages.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <i className="fa-solid fa-store"></i>
                        </div>
                        <div className="feature-info">
                            <h3>Gazebo & Rest Area</h3>
                            <p>Relax in our comfortable gazebos while enjoying the tropical atmosphere.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <i className="fa-solid fa-person-swimming"></i>
                        </div>
                        <div className="feature-info">
                            <h3>Swimming Pools</h3>
                            <p>Clean and refreshing pools designed for kids and adults.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
