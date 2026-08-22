import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loginRole, setLoginRole] = useState('staf'); // Default to staf when accessing portal
    const [showStaffOption, setShowStaffOption] = useState(true);
    const [email, setEmail] = useState('admin@cijoho.com');
    const [password, setPassword] = useState('admin123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const role = queryParams.get('role');
        if (role === 'kasir') {
            setLoginRole('staf');
            setEmail('kasir@cijoho.com');
            setPassword('kasir123');
        } else if (role === 'admin') {
            setLoginRole('staf');
            setEmail('admin@cijoho.com');
            setPassword('admin123');
        }
    }, [location.search]);

    const handleRoleSwitch = (role) => {
        setLoginRole(role);
        setError('');
        if (role === 'pengunjung') {
            setEmail('pengunjung@cijoho.com');
            setPassword('user123');
        } else if (role === 'kasir') {
            setEmail('kasir@cijoho.com');
            setPassword('kasir123');
        } else {
            setEmail('admin@cijoho.com');
            setPassword('admin123');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
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

            // 3. Visitor Login
            if (loginRole === 'pengunjung' || cleanEmail.includes('pengunjung')) {
                const visitorData = {
                    email: email,
                    role: 'visitor',
                    name: 'Budi Santoso',
                    phone: '0812-3456-7890',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('visitorSession', JSON.stringify(visitorData));
                setIsLoading(false);
                navigate('/dashboard');
                return;
            }

            // Fallback for custom staff logins
            setIsLoading(false);
            setError('Email atau password tidak dikenali. Gunakan admin@cijoho.com / admin123 atau kasir@cijoho.com / kasir123');
        }, 500);
    };

    const quickFill = (type) => {
        if (type === 'admin') {
            setLoginRole('staf');
            setEmail('admin@cijoho.com');
            setPassword('admin123');
        } else if (type === 'kasir') {
            setLoginRole('staf');
            setEmail('kasir@cijoho.com');
            setPassword('kasir123');
        } else if (type === 'pengunjung') {
            setLoginRole('pengunjung');
            setEmail('pengunjung@cijoho.com');
            setPassword('user123');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-backdrop-decor">
                <div className="decor-circle circle-1"></div>
                <div className="decor-circle circle-2"></div>
            </div>
            
            <div className="login-glass-card fade-in">
                <div className="login-header">
                    <img src="assets/logo.png" alt="Waterboom Cijoho Indah" className="login-logo-img" style={{ height: '48px', width: 'auto', marginBottom: '8px', objectFit: 'contain' }} />
                    <h2 style={{ fontSize: 'clamp(1.15rem, 4.5vw, 1.45rem)', fontWeight: 900, color: '#0c294a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        PORTAL MASUK STAF & ADMIN
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginTop: '2px', marginBottom: 0 }}>
                        Waterboom Cijoho Indah
                    </p>
                </div>

                {/* Role Switcher Tabs */}
                <div className="login-role-tabs">
                    <button 
                        type="button"
                        className={`role-tab-btn ${email.includes('admin') ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('admin')}
                    >
                        <i className="fa-solid fa-user-shield"></i>
                        <span>Portal Admin</span>
                    </button>
                    <button 
                        type="button"
                        className={`role-tab-btn ${email.includes('kasir') ? 'active' : ''}`}
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

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group-field">
                        <label htmlFor="email">Email Akses Staf / Admin</label>
                        <div className="input-with-icon">
                            <i className="fa-regular fa-envelope"></i>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="nama@cijoho.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                <div className="quick-login-divider">
                    <span>Opsi Auto-Fill Cepat (Klik &amp; Masuk)</span>
                </div>

                <div className="quick-login-buttons">
                    <button type="button" className="btn-quick-fill admin" onClick={() => quickFill('admin')}>
                        <i className="fa-solid fa-user-shield"></i>
                        <span className="btn-quick-label">Fill Admin</span>
                        <small className="btn-quick-email">(admin@cijoho.com)</small>
                    </button>
                    <button type="button" className="btn-quick-fill kasir" onClick={() => quickFill('kasir')}>
                        <i className="fa-solid fa-cash-register"></i>
                        <span className="btn-quick-label">Fill Kasir</span>
                        <small className="btn-quick-email">(kasir@cijoho.com)</small>
                    </button>
                </div>

                <div className="login-footer-links">
                    <Link to="/" className="back-to-home-link">
                        <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                    </Link>
                </div>
            </div>
        </div>
    );
}
