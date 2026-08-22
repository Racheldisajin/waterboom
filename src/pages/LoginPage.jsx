import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loginRole, setLoginRole] = useState('admin'); // 'admin' | 'kasir'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                        style={{ height: '84px', width: 'auto', marginBottom: '14px', objectFit: 'contain', display: 'block', margin: '0 auto 14px auto' }} 
                    />
                    <h2 style={{ fontSize: 'clamp(1.15rem, 4.5vw, 1.45rem)', fontWeight: 900, color: '#0c294a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
                        PORTAL MASUK STAF &amp; ADMIN
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600, marginTop: '4px', marginBottom: 0, textAlign: 'center' }}>
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
                        <label htmlFor="email">Email Akses {loginRole === 'admin' ? 'Admin' : 'Kasir'}</label>
                        <div className="input-with-icon">
                            <i className="fa-regular fa-envelope"></i>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder={loginRole === 'admin' ? "admin@cijoho.com" : "kasir@cijoho.com"} 
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
                                placeholder="Masukkan password" 
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

                    <button type="submit" className="btn-login-submit" disabled={isLoading} style={{ minHeight: '48px', fontSize: '0.92rem', fontWeight: 900 }}>
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

                <div className="login-footer-links" style={{ marginTop: '20px' }}>
                    <Link to="/" className="back-to-home-link">
                        <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                    </Link>
                </div>
            </div>
        </div>
    );
}
