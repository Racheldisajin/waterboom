import React, { useState, useEffect } from 'react';

const TICKET_PRICES = {
    reguler: 20000,
    ban: 5000,
    angsa: 5000,
    gazebo: 20000
};

export default function BookingModal({ isOpen, onClose, selectedTicket, onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ticketType, setTicketType] = useState('reguler');
    const [qty, setQty] = useState(1);

    // Sync selected ticket when opening
    useEffect(() => {
        if (selectedTicket) {
            setTicketType(selectedTicket);
        }
        // Reset when opening
        if (isOpen) {
            setQty(1);
        }
    }, [selectedTicket, isOpen]);

    if (!isOpen) return null;

    const pricePerUnit = TICKET_PRICES[ticketType] || 0;
    const total = pricePerUnit * qty;

    const handleQtyPlus = () => {
        if (qty < 100) setQty(prev => prev + 1);
    };

    const handleQtyMinus = () => {
        if (qty > 1) setQty(prev => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            email,
            ticketType,
            qty,
            totalPrice: total
        });
        
        // Reset
        setName('');
        setEmail('');
    };

    return (
        <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-card">
                <div className="modal-header">
                    <h2>Form Pemesanan Tiket</h2>
                    <button className="close-modal" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="modal-body">
                    <form id="bookingForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="visitorName">Nama Lengkap</label>
                            <input 
                                type="text" 
                                id="visitorName" 
                                required 
                                placeholder="Masukkan nama Anda" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="visitorEmail">Alamat Email</label>
                            <input 
                                type="email" 
                                id="visitorEmail" 
                                required 
                                placeholder="nama@email.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketType">Jenis Tiket/Sewa</label>
                            <select 
                                id="ticketType" 
                                required
                                value={ticketType}
                                onChange={(e) => setTicketType(e.target.value)}
                            >
                                <option value="reguler">Tiket Reguler - Rp 20.000</option>
                                <option value="ban">Sewa Ban - Rp 5.000</option>
                                <option value="angsa">Sewa Angsa - Rp 5.000</option>
                                <option value="gazebo">Sewa Gazebo - Rp 20.000</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ticketQty">Jumlah</label>
                            <div className="qty-counter">
                                <button type="button" className="qty-btn" onClick={handleQtyMinus}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input type="number" id="ticketQty" value={qty} min="1" max="100" readOnly />
                                <button type="button" className="qty-btn" onClick={handleQtyPlus}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="price-summary">
                            <span>Total Pembayaran:</span>
                            <span className="total-price">Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                        <button type="submit" className="btn btn-accent btn-full btn-submit-order">
                            KONFIRMASI PEMBELIAN <i className="fa-solid fa-check"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
