import React from 'react';

export default function Tickets({ onOpenBooking }) {
    return (
        <section id="tickets" className="tickets-section">
            <div className="container">
                <div className="section-header-center">
                    <h5 className="section-badge-green">PEMBELIAN ONLINE</h5>
                    <h2 className="section-title-center">DAFTAR TIKET</h2>
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
