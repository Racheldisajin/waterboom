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
            <div className="login-backdrop-decor">
                <div className="decor-circle circle-1"></div>
                <div className="decor-circle circle-2"></div>
            </div>
            
            <div className="login-glass-card fade-in">
                {/* Header Brand */}
                <div className="login-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <img 
                        src="assets/logo.png" 
                        alt="Waterboom Cijoho Indah" 
                        className="login-logo-img" 
                        style={{ height: '44px', width: 'auto', marginBottom: '4px', objectFit: 'contain', display: 'block', margin: '0 auto 4px auto' }} 
                    />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1d4ed8', letterSpacing: '0.2px', display: 'block', marginBottom: '0px' }}>
                        Waterboom
                    </span>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0c294a', margin: 0, fontFamily: 'serif, "Georgia", "Playfair Display"', letterSpacing: '-0.4px', lineHeight: 1.1 }}>
                        Cijoho Indah
                    </h1>
                    {/* Water drop divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '6px', width: '100%' }}>
                        <div style={{ width: '22px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                        <i className="fa-solid fa-droplet" style={{ color: '#2563eb', fontSize: '0.7rem' }}></i>
                        <div style={{ width: '22px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                    </div>
                </div>

                {/* Role Switcher Tabs */}
                <div className="login-role-tabs" style={{ display: 'flex', gap: '4px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '3px', borderRadius: '12px', marginBottom: '14px' }}>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('admin')}
                        style={{
                            flex: 1,
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: loginRole === 'admin' ? 'none' : '1px solid #e2e8f0',
                            backgroundColor: loginRole === 'admin' ? '#0e3066' : '#ffffff',
                            color: loginRole === 'admin' ? '#ffffff' : '#0c294a',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: loginRole === 'admin' ? '0 3px 10px rgba(14, 48, 102, 0.25)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fa-solid fa-user-shield" style={{ color: loginRole === 'admin' ? '#ffffff' : '#0c294a', fontSize: '0.8rem' }}></i>
                        <span>Portal Admin</span>
                    </button>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'kasir' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('kasir')}
                        style={{
                            flex: 1,
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: loginRole === 'kasir' ? 'none' : '1px solid #e2e8f0',
                            backgroundColor: loginRole === 'kasir' ? '#0e3066' : '#ffffff',
                            color: loginRole === 'kasir' ? '#ffffff' : '#0c294a',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: loginRole === 'kasir' ? '0 3px 10px rgba(14, 48, 102, 0.25)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fa-solid fa-cash-register" style={{ color: loginRole === 'kasir' ? '#ffffff' : '#0c294a', fontSize: '0.8rem' }}></i>
                        <span>Portal Kasir</span>
                    </button>
                </div>

                {error && (
                    <div className="login-error-alert animate-bounce-subtle" style={{ padding: '6px 10px', fontSize: '0.75rem', marginBottom: '12px' }}>
                        <i className="fa-solid fa-triangle-exclamation"></i> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form" autoComplete="off">
                    {/* Username Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '10px' }}>
                        <label htmlFor="username" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Username</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '0 8px', height: '42px' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '6px', flexShrink: 0 }}>
                                <i className="fa-solid fa-user" style={{ color: '#2563eb', fontSize: '0.8rem' }}></i>
                            </div>
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Masukkan username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}
                            />
                        </div>
                    </div>

                    {/* Kata Sandi Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px' }}>
                        <label htmlFor="password" style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Kata Sandi</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '0 8px', height: '42px' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '6px', flexShrink: 0 }}>
                                <i className="fa-solid fa-lock" style={{ color: '#2563eb', fontSize: '0.8rem' }}></i>
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                placeholder="Masukkan kata sandi" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem', padding: '2px', marginLeft: '4px' }}
                            >
                                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', marginBottom: '14px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: '14px', height: '14px', accentColor: '#2563eb', cursor: 'pointer' }}
                            />
                            Ingat saya
                        </label>
                        <button
                            type="button"
                            onClick={() => alert('Silakan hubungi Administrator Utama untuk mereset kata sandi staf.')}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
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
                            backgroundColor: '#0e3066',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            height: '44px',
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 5px 16px rgba(14, 48, 102, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span className="login-spinner"></span> Memproses Masuk...
                            </>
                        ) : (
                            <>
                                MASUK <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.82rem' }}></i>
                            </>
                        )}
                    </button>
                </form>

                {/* Divider Line */}
                <div style={{ marginTop: '16px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>atau</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                    </Link>
                </div>
            </div>

            {/* Bottom Security / Trust Badge */}
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1e3a8a', fontSize: '0.75rem', fontWeight: 700, zIndex: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><i className="fa-solid fa-shield-halved" style={{ color: '#2563eb' }}></i> Aman</span>
                <span>•</span>
                <span>Cepat</span>
                <span>•</span>
                <span>Terpercaya</span>
            </div>
        </div>
    );
}
