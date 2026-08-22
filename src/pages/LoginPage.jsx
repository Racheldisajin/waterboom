import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loginRole, setLoginRole] = useState('admin'); // 'admin' | 'kasir'
    const [email, setEmail] = useState('');
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

        if (!email.trim() || !password) {
            setError('Email dan password wajib diisi.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const cleanEmail = email.toLowerCase().trim();
            
            // 1. Admin Login Detection
            if (cleanEmail === 'admin@cijoho.com' || cleanEmail.includes('admin') || password === 'admin123') {
                const sessionData = {
                    email: 'admin@cijoho.com',
                    role: 'admin',
                    name: 'Admin Utama',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('staffSession', JSON.stringify(sessionData));
                setIsLoading(false);
                navigate('/admin');
                return;
            }
            
            // 2. Kasir Login Detection
            if (cleanEmail === 'kasir@cijoho.com' || cleanEmail.includes('kasir') || password === 'kasir123') {
                const sessionData = {
                    email: 'kasir@cijoho.com',
                    role: 'kasir',
                    name: 'Petugas Kasir 1',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('staffSession', JSON.stringify(sessionData));
                setIsLoading(false);
                navigate('/kasir');
                return;
            }

            // Fallback for custom staff logins
            setIsLoading(false);
            setError('Email atau password tidak dikenali. Silakan masukkan kredensial yang valid.');
        }, 500);
    };

    return (
        <div className="login-page-container">
            <div className="login-backdrop-decor">
                <div className="decor-circle circle-1"></div>
                <div className="decor-circle circle-2"></div>
            </div>
            
            <div className="login-glass-card fade-in">
                <div className="login-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <img 
                        src="assets/logo.png" 
                        alt="Waterboom Cijoho Indah" 
                        className="login-logo-img" 
                        style={{ height: '76px', width: 'auto', marginBottom: '16px', objectFit: 'contain', display: 'block', margin: '0 auto 16px auto' }} 
                    />
                    <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px', textAlign: 'center', lineHeight: 1.25 }}>
                        PORTAL MASUK<br />
                        <span style={{ color: '#2563eb' }}>STAF &amp; ADMIN</span>
                    </h2>
                    <p style={{ fontSize: '0.92rem', color: '#64748b', fontWeight: 600, marginTop: '6px', marginBottom: 0, textAlign: 'center' }}>
                        Waterboom Cijoho Indah
                    </p>
                </div>

                {/* Role Switcher Tabs */}
                <div className="login-role-tabs">
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('admin')}
                    >
                        <i className="fa-solid fa-user-shield"></i>
                        <span>Portal Admin</span>
                    </button>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'kasir' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('kasir')}
                    >
                        <i className="fa-solid fa-cash-register"></i>
                        <span>Portal Kasir</span>
                    </button>
                </div>

                {error && (
                    <div className="login-error-alert animate-bounce-subtle">
                        <i className="fa-solid fa-triangle-exclamation"></i> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form" autoComplete="off">
                    <div className="input-group-field">
                        <label htmlFor="email">Email Akses Staf / Admin</label>
                        <div className="input-with-icon">
                            <i className="fa-regular fa-envelope"></i>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="admin@cijoho.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                                required 
                            />
                        </div>
                    </div>

                    <div className="input-group-field">
                        <label htmlFor="password">Kata Sandi</label>
                        <div className="input-with-icon">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                required 
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', marginBottom: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 700, color: '#334155' }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }}
                            />
                            Ingat saya
                        </label>
                        <button
                            type="button"
                            onClick={() => alert('Silakan hubungi Administrator Utama untuk reset kata sandi staf.')}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                        >
                            Lupa kata sandi?
                        </button>
                    </div>

                    <button type="submit" className="btn-login-submit" disabled={isLoading} style={{ minHeight: '52px', fontSize: '1rem', fontWeight: 900 }}>
                        {isLoading ? (
                            <>
                                <span className="login-spinner"></span> Memproses Masuk...
                            </>
                        ) : (
                            <>
                                MASUK SEKARANG <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '28px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                        <Link to="/" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                        </Link>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
