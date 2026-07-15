import React from 'react';

export default function Features() {
    return (
        <section id="features" className="floating-features-section">
            <div className="container">
                <div className="features-bar">
                    {/* Feature 1 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 100 100" width="60" height="60" style={{ display: 'block' }}>
                                {/* Waves at the bottom */}
                                <path d="M15 78 Q 32.5 73, 50 78 T 85 78" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                                <path d="M10 84 Q 30 79, 50 84 T 90 84" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
                                
                                {/* Ladder */}
                                <path d="M 28 76 V 26 C 28 16, 38 16, 38 26 V 76" fill="none" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                                <path d="M 38 76 V 32" fill="none" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                                <line x1="28" y1="40" x2="38" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                                <line x1="28" y1="52" x2="38" y2="52" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                                <line x1="28" y1="64" x2="38" y2="64" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                                
                                {/* Island and yellow tube float */}
                                <path d="M 12 78 A 12 12 0 0 1 36 78 Z" fill="#22c55e" />
                                <circle cx="24" cy="74" r="7" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
                                <circle cx="24" cy="74" r="3" fill="#ffffff" />

                                {/* Slide */}
                                <path d="M 38 26 Q 52 26, 80 58" fill="none" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
                                <path d="M 38 26 Q 52 26, 80 58" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
                                {/* Slide step lines */}
                                <line x1="47" y1="31" x2="52" y2="36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="57" y1="39" x2="62" y2="44" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="67" y1="47" x2="72" y2="52" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="feature-info">
                            <h3>
                                <svg viewBox="0 0 100 100" width="20" height="20" style={{ marginRight: '6px', verticalAlign: 'middle', transform: 'scaleX(-1)' }}>
                                    <path d="M18 80V20M10 80V40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M18 20 Q 40 20, 80 75" fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" />
                                </svg>
                                Water Slides
                            </h3>
                            <p>Exciting water slides for all ages.</p>
                        </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 100 100" width="60" height="60" style={{ display: 'block' }}>
                                {/* Platform Base */}
                                <path d="M22 72 L 78 72 L 72 82 L 28 82 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                                <rect x="26" y="70" width="48" height="3" fill="#475569" />
                                
                                {/* Bush decorations */}
                                <path d="M 12 78 C 10 72, 22 66, 26 76 Z" fill="#22c55e" />
                                <path d="M 74 76 C 78 66, 90 72, 88 78 Z" fill="#22c55e" />
                                <path d="M 16 80 C 13 77, 24 72, 28 80 Z" fill="#15803d" />
                                <path d="M 72 80 C 76 72, 87 77, 84 80 Z" fill="#15803d" />

                                {/* Pillars */}
                                <line x1="32" y1="70" x2="35" y2="40" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                                <line x1="43" y1="70" x2="44" y2="40" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                                <line x1="57" y1="70" x2="56" y2="40" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                                <line x1="68" y1="70" x2="65" y2="40" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
                                
                                {/* Table */}
                                <rect x="47" y="58" width="6" height="12" fill="#78350f" />
                                <ellipse cx="50" cy="58" rx="8" ry="2.5" fill="#d97706" />
                                
                                {/* Fence */}
                                <line x1="32" y1="62" x2="68" y2="62" stroke="#451a03" strokeWidth="2" />
                                <line x1="36" y1="62" x2="36" y2="70" stroke="#451a03" strokeWidth="1.5" />
                                <line x1="40" y1="62" x2="40" y2="70" stroke="#451a03" strokeWidth="1.5" />
                                <line x1="60" y1="62" x2="60" y2="70" stroke="#451a03" strokeWidth="1.5" />
                                <line x1="64" y1="62" x2="64" y2="70" stroke="#451a03" strokeWidth="1.5" />

                                {/* Conical Roof */}
                                <polygon points="50 15, 22 40, 78 40" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                                <polygon points="22 40, 78 40, 72 45, 28 45" fill="#d97706" />
                                <line x1="50" y1="15" x2="50" y2="40" stroke="#b45309" strokeWidth="1.5" />
                                <line x1="50" y1="15" x2="36" y2="40" stroke="#b45309" strokeWidth="1.5" />
                                <line x1="50" y1="15" x2="64" y2="40" stroke="#b45309" strokeWidth="1.5" />
                                <line x1="50" y1="15" x2="50" y2="8" stroke="#78350f" strokeWidth="2.5" />
                                <circle cx="50" cy="8" r="2.5" fill="#f59e0b" />
                            </svg>
                        </div>
                        <div className="feature-info">
                            <h3>
                                <svg viewBox="0 0 100 100" width="20" height="20" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                    <polygon points="50 15, 20 50, 80 50" fill="#ea580c" />
                                    <line x1="30" y1="50" x2="30" y2="80" stroke="#78350f" strokeWidth="8" />
                                    <line x1="70" y1="50" x2="70" y2="80" stroke="#78350f" strokeWidth="8" />
                                    <rect x="25" y="75" width="50" height="8" fill="#22c55e" />
                                </svg>
                                Gazebo & Rest Area
                            </h3>
                            <p>Relax in our comfortable gazebos while enjoying the tropical atmosphere.</p>
                        </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg viewBox="0 0 100 100" width="60" height="60" style={{ display: 'block' }}>
                                {/* Ladder */}
                                <path d="M 38 60 V 28 C 38 18, 48 18, 48 28 V 45" fill="none" stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />
                                <path d="M 58 60 V 36 C 58 26, 68 26, 68 36 V 45" fill="none" stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />
                                
                                <line x1="38" y1="36" x2="51" y2="36" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                                <line x1="38" y1="46" x2="55" y2="46" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                                <line x1="38" y1="56" x2="58" y2="56" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                                
                                {/* Waves */}
                                <path d="M15 64 Q 30 60, 45 64 T 75 64 T 90 64" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
                                <path d="M10 74 Q 28 70, 46 74 T 82 74 T 95 74" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
                                <path d="M15 84 Q 30 80, 45 84 T 75 84 T 90 84" fill="none" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="feature-info">
                            <h3>
                                <svg viewBox="0 0 100 100" width="20" height="20" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
                                    <path d="M 30 65 V 30 C 30 18, 42 18, 42 30 V 50" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M 58 65 V 38 C 58 26, 70 26, 70 38 V 50" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M 10 75 Q 30 70, 50 75 T 90 75" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
                                </svg>
                                Swimming Pools
                            </h3>
                            <p>Clean and refreshing pools designed for kids and adults.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
