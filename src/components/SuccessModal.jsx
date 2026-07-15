import React, { useState } from 'react';

export default function SuccessModal({ isOpen, onClose, details }) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        if (details?.bookingCode) {
            navigator.clipboard.writeText(details.bookingCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Human readable ticket type mapping
    const ticketNames = {
        reguler: 'Tiket Reguler',
        ban: 'Sewa Ban',
        angsa: 'Sewa Angsa',
        gazebo: 'Sewa Gazebo'
    };

    return (
        <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-card modal-success" style={{ maxWidth: '460px' }}>
                <div className="modal-success-icon"><i className="fa-solid fa-circle-check"></i></div>
                <h2>Pemesanan Berhasil!</h2>
                <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                    Terima kasih telah memesan. Silakan tunjukkan E-Tiket di bawah ini ke petugas loket:
                </p>

                {details && (
                    <div className="virtual-ticket" style={{
                        backgroundColor: '#f8fafc',
                        border: '1px dashed #cbd5e1',
                        borderRadius: '12px',
                        padding: '20px',
                        margin: '16px 0 24px 0',
                        textAlign: 'left',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#64748b' }}>E-TICKET</span>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        
                        <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>KODE BOOKING</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '1px' }}>
                                    {details.bookingCode}
                                </span>
                                <button 
                                    onClick={handleCopy}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: copied ? 'var(--color-accent)' : '#94a3b8',
                                        fontSize: '0.9rem',
                                        transition: 'color 0.2s'
                                    }}
                                    title="Salin Kode"
                                    type="button"
                                >
                                    <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem', marginBottom: '12px' }}>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>NAMA</span>
                                <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{details.name}</span>
                            </div>
                            <div>
                                <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.75rem' }}>EMAIL</span>
                                <span style={{ fontWeight: '600', color: 'var(--color-primary)', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap' }}>{details.email}</span>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <div>
                                <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
                                    {ticketNames[details.ticketType] || 'Tiket'}
                                </span>
                                <span style={{ color: '#64748b', marginLeft: '6px' }}>x{details.qty}</span>
                            </div>
                            <span style={{ fontWeight: '800', color: 'var(--color-primary)' }}>
                                Rp {details.totalPrice.toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                )}

                <button className="btn btn-primary-dark btn-pill close-success" onClick={onClose}>Selesai</button>
            </div>
        </div>
    );
}
