import React from 'react';

export default function Features() {
    return (
        <section id="features" className="floating-features-section">
            <div className="container">
                <div className="features-bar">
                    {/* Feature 1 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <i className="fa-solid fa-water-slide"></i>
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
