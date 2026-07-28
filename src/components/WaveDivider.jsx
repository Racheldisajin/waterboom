import React from 'react';

/**
 * WaveDivider Component
 * Reusable wave SVG decorations and section dividers.
 * 
 * Props:
 * - type: 'accent' | 'footer' | 'card' | 'curve' | 'splash' (default: 'accent')
 * - color: custom fill/stroke color override
 * - style: custom style object
 * - className: additional CSS class
 */
export default function WaveDivider({ type = 'accent', color, style = {}, className = '' }) {
    if (type === 'accent') {
        return (
            <div className={`wave-accent-wrapper ${className}`} style={{ display: 'inline-block', marginTop: '8px', ...style }}>
                <svg width="45" height="10" viewBox="0 0 45 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3 C 8 0, 10 6, 16 3 C 22 0, 24 6, 30 3 C 36 0, 38 6, 43 3" stroke={color || "var(--color-accent, #7cc04b)"} strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M2 7 C 8 4, 10 10, 16 7 C 22 4, 24 10, 30 7 C 36 4, 38 10, 43 7" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
            </div>
        );
    }

    if (type === 'footer') {
        return (
            <div className={`footer-top-wave-container ${className}`} style={style}>
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="footer-top-wave-svg">
                    {/* Layer 1: Translucent Blue Wave Accent */}
                    <path 
                        d="M0,0 L1440,0 L1440,55 C1300,95 1150,100 980,68 C810,36 670,88 500,72 C330,56 180,98 0,48 Z" 
                        fill="rgba(56, 189, 248, 0.45)"
                    ></path>
                    {/* Layer 2: Translucent White Wave Accent */}
                    <path 
                        d="M0,0 L1440,0 L1440,38 C1260,78 1100,85 940,48 C780,12 620,72 450,52 C280,32 140,78 0,32 Z" 
                        fill="rgba(255, 255, 255, 0.6)"
                    ></path>
                    {/* Layer 3: Solid Body Background Cutout */}
                    <path 
                        d="M0,0 L1440,0 L1440,25 C1280,65 1120,78 960,42 C800,8 640,58 480,38 C320,18 160,62 0,18 Z" 
                        fill={color || "#f6f9fc"}
                    ></path>
                </svg>
            </div>
        );
    }

    if (type === 'card') {
        return (
            <div className={`card-wave-container ${className}`} style={style}>
                <svg viewBox="0 0 120 28" preserveAspectRatio="none" className="card-wave-svg">
                    <path d="M0,15 C30,5 90,25 120,15 L120,28 L0,28 Z" fill={color || "currentColor"} />
                </svg>
            </div>
        );
    }

    if (type === 'curve') {
        return (
            <svg className={`testimonial-curve-divider ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" fill={color || "#ffffff"} xmlns="http://www.w3.org/2000/svg" style={style}>
                <path d="M 0,0 L 80,0 C 70,30 55,70 40,100 L 0,100 Z" />
            </svg>
        );
    }

    if (type === 'splash') {
        return (
            <div className={`testimonial-splash-bg ${className}`} style={style}>
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,200 Q 50,150 100,160 T 170,80 Q 185,50 200,60 L 200,200 Z" fill={color || "rgba(186, 226, 255, 0.25)"} />
                    <path d="M 30,120 C 25,100 5,90 20,80 C 35,70 45,95 40,110 Z" fill={color || "rgba(186, 226, 255, 0.2)"} />
                </svg>
            </div>
        );
    }

    return null;
}
