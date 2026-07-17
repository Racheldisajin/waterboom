import React from 'react';

export default function Tickets({ onOpenBooking }) {
    return (
        <section id="tickets" className="tickets-section">
            <div className="container">
                <div className="section-header-center">
                    <h5 className="section-badge-green">PEMBELIAN ONLINE</h5>
                    <h2 className="section-title-center" style={{ marginBottom: '4px' }}>DAFTAR TIKET</h2>
                    <svg className="curved-underline" width="220" height="12" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '4px auto 0 auto', display: 'block' }}>
                        <path d="M 4 8 C 50 14, 170 14, 216 8" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="tickets-grid">
                    {/* Ticket Card 1 */}
                    <div className="ticket-card" data-ticket="reguler">
                        <div className="ticket-icon-circle bg-navy">
                            <i className="fa-solid fa-wallet"></i>
                        </div>
                        <h3 className="ticket-name">TIKET REGULER</h3>
                        <p className="ticket-price">Rp 20.000</p>
                        <button className="btn btn-primary-dark btn-full" onClick={() => onOpenBooking('reguler')}>
                            <i className="fa-solid fa-cart-shopping"></i> BELI TIKET
                        </button>
                    </div>
                    {/* Ticket Card 2 */}
                    <div className="ticket-card" data-ticket="ban">
                        <div className="ticket-icon-circle bg-green">
                            <i className="fa-solid fa-life-ring"></i>
                        </div>
                        <h3 className="ticket-name">SEWA BAN</h3>
                        <p className="ticket-price">Rp 5.000</p>
                        <button className="btn btn-accent btn-full" onClick={() => onOpenBooking('ban')}>
                            <i className="fa-solid fa-cart-shopping"></i> BELI TIKET
                        </button>
                    </div>
                    {/* Ticket Card 3 */}
                    <div className="ticket-card" data-ticket="angsa">
                        <div className="ticket-icon-circle bg-teal">
                            <i className="fa-solid fa-dove"></i>
                        </div>
                        <h3 className="ticket-name">SEWA ANGSA</h3>
                        <p className="ticket-price">Rp 5.000</p>
                        <button className="btn btn-teal btn-full" onClick={() => onOpenBooking('angsa')}>
                            <i className="fa-solid fa-cart-shopping"></i> BELI TIKET
                        </button>
                    </div>
                    {/* Ticket Card 4 */}
                    <div className="ticket-card" data-ticket="gazebo">
                        <div className="ticket-icon-circle bg-navy">
                            <i className="fa-solid fa-store"></i>
                        </div>
                        <h3 className="ticket-name">SEWA GAZEBO</h3>
                        <p className="ticket-price">Rp 20.000</p>
                        <button className="btn btn-primary-dark btn-full" onClick={() => onOpenBooking('gazebo')}>
                            <i className="fa-solid fa-cart-shopping"></i> BELI TIKET
                        </button>
                    </div>
                    {/* Ticket Card 5 (Group) */}
                    <div className="ticket-card group-card">
                        <div className="ticket-icon-circle bg-soft-blue">
                            <i className="fa-solid fa-people-group"></i>
                        </div>
                        <h3 className="ticket-name">INGIN ROMBONGAN?</h3>
                        <p className="ticket-desc">Dapatkan harga spesial untuk grup dan paket.</p>
                        <a href="https://wa.me/628123456789?text=Halo%20Waterboom%20Cijoho%20Indah%2C%20saya%20tertarik%20dengan%20paket%20rombongan%20grup.%20Bisa%20berikan%20informasi%20lebih%20lanjut%20mengenai%20diskon%20dan%20ketentuannya%3F" target="_blank" rel="noreferrer" className="btn btn-outline btn-full">
                            HUBUNGI KAMI
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
