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
                <div className="login-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '26px' }}>
                    <img 
                        src="assets/logo.png" 
                        alt="Waterboom Cijoho Indah" 
                        className="login-logo-img" 
                        style={{ height: '76px', width: 'auto', marginBottom: '10px', objectFit: 'contain', display: 'block', margin: '0 auto 10px auto' }} 
                    />
                    <span style={{ fontSize: '1.15rem', fontWeight: 500, color: '#1e3a8a', letterSpacing: '0.2px', display: 'block', marginBottom: '2px' }}>
                        Waterboom
                    </span>
                    <h1 style={{ fontSize: '2.35rem', fontWeight: 800, color: '#0c294a', margin: 0, fontFamily: 'serif, "Georgia", "Playfair Display"', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                        Cijoho Indah
                    </h1>
                    {/* Water drop divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '12px', width: '100%' }}>
                        <div style={{ width: '32px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                        <i className="fa-solid fa-droplet" style={{ color: '#2563eb', fontSize: '0.85rem' }}></i>
                        <div style={{ width: '32px', height: '1.5px', backgroundColor: '#93c5fd' }}></div>
                    </div>
                </div>

                {/* Role Switcher Tabs */}
                <div className="login-role-tabs" style={{ display: 'flex', gap: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px', borderRadius: '16px', marginBottom: '24px' }}>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'admin' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('admin')}
                        style={{
                            flex: 1,
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: loginRole === 'admin' ? 'none' : '1px solid #e2e8f0',
                            backgroundColor: loginRole === 'admin' ? '#0e3066' : '#ffffff',
                            color: loginRole === 'admin' ? '#ffffff' : '#0c294a',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loginRole === 'admin' ? '0 4px 14px rgba(14, 48, 102, 0.35)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fa-solid fa-user-shield" style={{ color: loginRole === 'admin' ? '#ffffff' : '#0c294a' }}></i>
                        <span>Portal Admin</span>
                    </button>
                    <button 
                        type="button"
                        className={`role-tab-btn ${loginRole === 'kasir' ? 'active' : ''}`}
                        onClick={() => handleRoleSwitch('kasir')}
                        style={{
                            flex: 1,
                            padding: '12px 14px',
                            borderRadius: '12px',
                            border: loginRole === 'kasir' ? 'none' : '1px solid #e2e8f0',
                            backgroundColor: loginRole === 'kasir' ? '#0e3066' : '#ffffff',
                            color: loginRole === 'kasir' ? '#ffffff' : '#0c294a',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loginRole === 'kasir' ? '0 4px 14px rgba(14, 48, 102, 0.35)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fa-solid fa-cash-register" style={{ color: loginRole === 'kasir' ? '#ffffff' : '#0c294a' }}></i>
                        <span>Portal Kasir</span>
                    </button>
                </div>

                {error && (
                    <div className="login-error-alert animate-bounce-subtle">
                        <i className="fa-solid fa-triangle-exclamation"></i> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="login-form" autoComplete="off">
                    {/* Username Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                        <label htmlFor="username" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b' }}>Username</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', height: '50px' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', flexShrink: 0 }}>
                                <i className="fa-solid fa-user" style={{ color: '#2563eb', fontSize: '0.9rem' }}></i>
                            </div>
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Masukkan username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}
                            />
                        </div>
                    </div>

                    {/* Kata Sandi Input */}
                    <div className="input-group-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                        <label htmlFor="password" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1e293b' }}>Kata Sandi</label>
                        <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', height: '50px' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', flexShrink: 0 }}>
                                <i className="fa-solid fa-lock" style={{ color: '#2563eb', fontSize: '0.9rem' }}></i>
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                placeholder="Masukkan kata sandi" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                required 
                                style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.1rem', padding: '4px', marginLeft: '6px' }}
                            >
                                <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                            </button>
                        </div>
                    </div>

                    {/* Remember me & Forgot password row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
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
                            onClick={() => alert('Silakan hubungi Administrator Utama untuk mereset kata sandi staf.')}
                            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
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
                            borderRadius: '14px',
                            height: '52px',
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            letterSpacing: '0.8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            boxShadow: '0 8px 24px rgba(14, 48, 102, 0.35)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span className="login-spinner"></span> Memproses Masuk...
                            </>
                        ) : (
                            <>
                                MASUK <i className="fa-solid fa-arrow-right"></i>
                            </>
                        )}
                    </button>
                </form>

                {/* Divider Line */}
                <div style={{ marginTop: '28px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                        <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>atau</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div style={{ marginTop: '18px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: '#2563eb', fontSize: '0.9rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda Utama
                    </Link>
                </div>
            </div>

            {/* Bottom Security / Trust Badge */}
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#1e3a8a', fontSize: '0.82rem', fontWeight: 700, zIndex: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><i className="fa-solid fa-shield-halved" style={{ color: '#2563eb' }}></i> Aman</span>
                <span>•</span>
                <span>Cepat</span>
                <span>•</span>
                <span>Terpercaya</span>
            </div>
        </div>
    );
}
