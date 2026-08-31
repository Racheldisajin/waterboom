import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loginRole, setLoginRole] = useState('admin'); // 'admin' | 'kasir'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const role = queryParams.get('role');
        if (role === 'kasir') {
            setLoginRole('kasir');
        } else if (role === 'admin') {
            setLoginRole('admin');
        }
    }, [location.search]);

    const handleRoleSwitch = (role) => {
        setLoginRole(role);
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password) {
            setError('Username dan kata sandi wajib diisi.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const cleanUser = username.toLowerCase().trim();
            
            // Determine target role from typed username or active tab role
            let targetRole = loginRole; // 'admin' | 'kasir'
            if (cleanUser.includes('kasir')) {
                targetRole = 'kasir';
            } else if (cleanUser.includes('admin')) {
                targetRole = 'admin';
            }

            if (targetRole === 'kasir') {
                const sessionData = {
                    email: cleanUser.includes('@') ? cleanUser : 'kasir@cijoho.com',
                    role: 'kasir',
                    name: 'Petugas Kasir 1',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('staffSession', JSON.stringify(sessionData));
                setIsLoading(false);
                navigate('/kasir');
            } else {
                const sessionData = {
                    email: cleanUser.includes('@') ? cleanUser : 'admin@cijoho.com',
                    role: 'admin',
                    name: 'Admin Utama',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('staffSession', JSON.stringify(sessionData));
                setIsLoading(false);
                navigate('/admin');
            }
        }, 300);
    };

    return (
        <div className="login-page-container">
            {/* Background SVG Water Waves, Concentric Ripples & Floating Bubbles (EXACT MATCH SAMPLE IMAGE) */}
            <div className="login-backdrop-decor" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
                {/* Top Left Concentric Ripple Arcs */}
                <svg style={{ position: 'absolute', top: '-40px', left: '-40px', width: '280px', height: '280px', opacity: 0.4 }} viewBox="0 0 280 280" fill="none">
                    <circle cx="40" cy="40" r="70" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 3" />
                    <circle cx="40" cy="40" r="120" stroke="#60a5fa" strokeWidth="1.2" />
                    <circle cx="40" cy="40" r="170" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="40" cy="40" r="220" stroke="#bfdbfe" strokeWidth="1" />
                </svg>

                {/* Bottom Liquid Water Wave Curves (Fluid Organic Wave Gradient) */}
                <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '280px', pointerEvents: 'none' }} viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none">
                    <path fill="url(#wave-grad-1)" fillOpacity="0.3" d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,160C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    <path fill="url(#wave-grad-2)" fillOpacity="0.45" d="M0,224L48,229.3C96,235,192,245,288,234.7C384,224,480,192,576,192C672,192,768,224,864,229.3C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <defs>
                        <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Floating Atmospheric Water Bubbles */}
                <div style={{ position: 'absolute', bottom: '90px', left: '5%', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.35)', border: '1.5px solid rgba(255,255,255,0.85)', boxShadow: '0 4px 10px rgba(56, 189, 248, 0.2)' }}></div>
                <div style={{ position: 'absolute', bottom: '160px', left: '11%', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(96, 165, 250, 0.4)', border: '1px solid rgba(255,255,255,0.8)' }}></div>
                <div style={{ position: 'absolute', bottom: '110px', right: '6%', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.3)', border: '1.5px solid rgba(255,255,255,0.85)', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.25)' }}></div>
                <div style={{ position: 'absolute', bottom: '210px', right: '14%', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(147, 197, 253, 0.45)' }}></div>
            </div>
            
            <div className="login-glass-card fade-in">
                {/* Header Brand */}
                <div className="login-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <img 
                        src="assets/logo.png" 
                        alt="Waterboom Cijoho Indah" 
                        className="login-logo-img" 
                        style={{ height: '72px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto 6px auto' }} 
                    />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e3a8a', letterSpacing: '0.2px', display: 'block', marginBottom: '1px', lineHeight: 1 }}>
                        Waterboom
                    </span>
                    <h1 style={{ fontSize: '1.95rem', fontWeight: 800, color: '#0f2b5c', margin: '0', fontFamily: 'serif, "Georgia", "Playfair Display"', letterSpacing: '-0.4px', lineHeight: 1.05 }}>
                        Cijoho Indah
                    </h1>
                    {/* Water drop divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', width: '100%' }}>
                        <div style={{ width: '32px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                        <i className="fa-solid fa-droplet" style={{ color: '#2563eb', fontSize: '0.75rem' }}></i>
                        <div style={{ width: '32px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                    </div>
                </div>

                {/* Role Switcher Tabs */}
                <div className="login-role-tabs" style={{ display: 'flex', gap: '6px', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', padding: '5px', borderRadius: '16px', marginBottom: '20px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('admin')}
                        style={{
                            flex: 1,
                            padding: '11px 12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: loginRole === 'admin' ? 'linear-gradient(135deg, #0e3066 0%, #1e3a8a 100%)' : 'transparent',
                            color: loginRole === 'admin' ? '#ffffff' : '#0c294a',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loginRole === 'admin' ? '0 4px 14px rgba(14, 48, 102, 0.3)' : 'none',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <i className="fa-solid fa-user-shield" style={{ color: loginRole === 'admin' ? '#ffffff' : '#0c294a', fontSize: '0.9rem' }}></i>
                        <span>Portal Admin</span>
                    </button>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'kasir' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('kasir')}
                        style={{
                            flex: 1,
                            padding: '11px 12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: loginRole === 'kasir' ? 'linear-gradient(135deg, #0e3066 0%, #1e3a8a 100%)' : 'transparent',
                            color: loginRole === 'kasir' ? '#ffffff' : '#0c294a',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loginRole === 'kasir' ? '0 4px 14px rgba(14, 48, 102, 0.3)' : 'none',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <i className="fa-solid fa-cash-register" style={{ color: loginRole === 'kasir' ? '#ffffff' : '#0c294a', fontSize: '0.9rem' }}></i>
                        <span>Portal Kasir</span>
                    </button>
                </div>

                {error && (
                    <div className="login-error-alert animate-bounce-subtle" style={{ padding: '8px 12px', fontSize: '0.78rem', marginBottom: '14px', borderRadius: '10px' }}>
                        <i className="fa-solid fa-triangle-exclamation"></i> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form" autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                    {/* Username Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
                        <label htmlFor="username" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Username</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '0 10px', height: '48px', transition: 'border-color 0.2s ease' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', flexShrink: 0 }}>
                                <i className="fa-solid fa-user" style={{ color: '#2563eb', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, margin: 0 }}></i>
                            </div>
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Masukkan username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}
                            />
                        </div>
                    </div>

                    {/* Kata Sandi Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
                        <label htmlFor="password" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>Kata Sandi</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '0 10px', height: '48px', transition: 'border-color 0.2s ease' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', flexShrink: 0 }}>
                                <i className="fa-solid fa-lock" style={{ color: '#2563eb', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, margin: 0 }}></i>
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                placeholder="Masukkan kata sandi" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                                style={{ background: 'none', border: 'none', color: '#1e3a8a', cursor: 'pointer', fontSize: '1rem', padding: '4px', marginLeft: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}></i>
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px', marginBottom: '18px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: '16px', height: '16px', accentColor: '#1e3a8a', cursor: 'pointer' }}
                            />
                            Ingat saya
                        </label>
                        <button
                            type="button"
                            onClick={() => alert('Silakan hubungi Administrator Utama untuk mereset kata sandi staf.')}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                        >
                            Lupa kata sandi?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="btn-login-submit" 
                        disabled={isLoading} 
                        style={{ 
                            width: '100%',
                            background: 'linear-gradient(135deg, #0b2545 0%, #133c55 50%, #1e3a8a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            height: '50px',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 6px 20px rgba(14, 48, 102, 0.35)',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span className="login-spinner"></span> Memproses Masuk...
                            </>
                        ) : (
                            <>
                                MASUK <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.88rem' }}></i>
                            </>
                        )}
                    </button>
                </form>

                {/* Quick Helper Credentials */}
                <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={() => { setLoginRole('admin'); setUsername('admin'); setPassword('admin123'); }}
                        style={{ flex: 1, padding: '8px 10px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.78rem', fontWeight: 700, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s ease' }}
                    >
                        <i className="fa-solid fa-user-shield" style={{ color: '#2563eb' }}></i> Quick Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => { setLoginRole('kasir'); setUsername('kasir'); setPassword('kasir123'); }}
                        style={{ flex: 1, padding: '8px 10px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.78rem', fontWeight: 700, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s ease' }}
                    >
                        <i className="fa-solid fa-cash-register" style={{ color: '#059669' }}></i> Quick Kasir
                    </button>
                </div>

                {/* Back to Home Link */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                    </Link>
                </div>
            </div>

            {/* Bottom Security / Trust Badge */}
            <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#1e3a8a', fontSize: '0.78rem', fontWeight: 700, zIndex: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fa-solid fa-shield-halved" style={{ color: '#2563eb' }}></i> Aman</span>
                <span>•</span>
                <span>Cepat</span>
                <span>•</span>
                <span>Terpercaya</span>
            </div>
        </div>
    );
}
