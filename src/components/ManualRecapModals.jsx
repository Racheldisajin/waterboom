import React, { useState, useMemo, useEffect } from 'react';

export const INDO_MONTHS = [
    { value: '01', name: 'Januari' },
    { value: '02', name: 'Februari' },
    { value: '03', name: 'Maret' },
    { value: '04', name: 'April' },
    { value: '05', name: 'Mei' },
    { value: '06', name: 'Juni' },
    { value: '07', name: 'Juli' },
    { value: '08', name: 'Agustus' },
    { value: '09', name: 'September' },
    { value: '10', name: 'Oktober' },
    { value: '11', name: 'November' },
    { value: '12', name: 'Desember' }
];

export const getPrevMonthDefaults = () => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const y = String(d.getFullYear());
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const mObj = INDO_MONTHS.find(im => im.value === m);
    const monthName = mObj ? mObj.name : m;
    return {
        month: m,
        year: y,
        specificDate: `${y}-${m}-${String(lastDay).padStart(2, '0')}`,
        notes: `Rekap Pembukuan Bulan ${monthName} ${y}`
    };
};

// =====================================================================
// 1. MODAL: INPUT MANUAL REKAP BULAN SEBELUMNYA
// =====================================================================
export function ManualRecapModal({
    isOpen,
    onClose,
    prices = { tickets: {}, rentals: {} },
    currentAccount = { name: 'Admin Utama' },
    onSaveRecap
}) {
    const [mode, setMode] = useState('monthly'); // 'monthly' | 'daily'
    const [month, setMonth] = useState('08');
    const [year, setYear] = useState('2026');
    const [specificDate, setSpecificDate] = useState('');
    const [notes, setNotes] = useState('');
    const [channel, setChannel] = useState('Offline');
    const [paymentMode, setPaymentMode] = useState('all_cash'); // 'all_cash' | 'all_qris' | 'all_transfer' | 'split_cash_qris'
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tickets State
    const [tickets, setTickets] = useState({
        reguler: { qty: '', price: 20000 },
        rombongan: { qty: '', price: 17000 },
        kursus: { qty: '', price: 15000 }
    });

    // Rentals State
    const [rentals, setRentals] = useState({
        ban: { qty: '', price: 5000 },
        gazebo: { qty: '', price: 20000 },
        sepeda: { qty: '', price: 20000 }
    });

    // Expenses State (Optional)
    const [includeExpenses, setIncludeExpenses] = useState(false);
    const [expenses, setExpenses] = useState([
        { id: 1, category: 'Operasional', desc: '', amount: '' }
    ]);

    // Reset / Initialize when modal opens
    useEffect(() => {
        if (isOpen) {
            const def = getPrevMonthDefaults();
            setMode('monthly');
            setMonth(def.month);
            setYear(def.year);
            setSpecificDate(def.specificDate);
            setNotes(def.notes);
            setChannel('Offline');
            setPaymentMode('all_cash');
            setIncludeExpenses(false);
            setTickets({
                reguler: { qty: '', price: prices.tickets?.reguler || 20000 },
                rombongan: { qty: '', price: prices.tickets?.rombongan || 17000 },
                kursus: { qty: '', price: prices.tickets?.kursus || 15000 }
            });
            setRentals({
                ban: { qty: '', price: prices.rentals?.ban || 5000 },
                gazebo: { qty: '', price: prices.rentals?.gazebo || 20000 },
                sepeda: { qty: '', price: prices.rentals?.sepeda || 20000 }
            });
            setExpenses([
                { id: Date.now(), category: 'Operasional', desc: `Biaya Operasional Bulan ${INDO_MONTHS.find(m => m.value === def.month)?.name || def.month} ${def.year}`, amount: '' }
            ]);
            setIsSubmitting(false);
        }
    }, [isOpen, prices]);

    // Update note when month/year changes in monthly mode
    const handleMonthYearChange = (newM, newY) => {
        setMonth(newM);
        setYear(newY);
        const mObj = INDO_MONTHS.find(m => m.value === newM);
        const mName = mObj ? mObj.name : newM;
        const lastDay = new Date(parseInt(newY, 10), parseInt(newM, 10), 0).getDate();
        setSpecificDate(`${newY}-${newM}-${String(lastDay).padStart(2, '0')}`);
        setNotes(`Rekap Pembukuan Bulan ${mName} ${newY}`);
    };

    // Live Calculations
    const calculations = useMemo(() => {
        const regQty = parseInt(tickets.reguler.qty, 10) || 0;
        const regPrice = parseFloat(tickets.reguler.price) || 0;
        const regTotal = regQty * regPrice;

        const rmbQty = parseInt(tickets.rombongan.qty, 10) || 0;
        const rmbPrice = parseFloat(tickets.rombongan.price) || 0;
        const rmbTotal = rmbQty * rmbPrice;

        const krsQty = parseInt(tickets.kursus.qty, 10) || 0;
        const krsPrice = parseFloat(tickets.kursus.price) || 0;
        const krsTotal = krsQty * krsPrice;

        const ticketTotalQty = regQty + rmbQty + krsQty;
        const ticketTotalRev = regTotal + rmbTotal + krsTotal;

        const banQty = parseInt(rentals.ban.qty, 10) || 0;
        const banPrice = parseFloat(rentals.ban.price) || 0;
        const banTotal = banQty * banPrice;

        const gzbQty = parseInt(rentals.gazebo.qty, 10) || 0;
        const gzbPrice = parseFloat(rentals.gazebo.price) || 0;
        const gzbTotal = gzbQty * gzbPrice;

        const spdQty = parseInt(rentals.sepeda.qty, 10) || 0;
        const spdPrice = parseFloat(rentals.sepeda.price) || 0;
        const spdTotal = spdQty * spdPrice;

        const rentalTotalQty = banQty + gzbQty + spdQty;
        const rentalTotalRev = banTotal + gzbTotal + spdTotal;

        const grandTotalIncome = ticketTotalRev + rentalTotalRev;

        let expenseTotal = 0;
        if (includeExpenses) {
            expenses.forEach(e => {
                expenseTotal += parseFloat(e.amount) || 0;
            });
        }

        const netCashFlow = grandTotalIncome - expenseTotal;

        return {
            regQty, regPrice, regTotal,
            rmbQty, rmbPrice, rmbTotal,
            krsQty, krsPrice, krsTotal,
            ticketTotalQty, ticketTotalRev,
            banQty, banPrice, banTotal,
            gzbQty, gzbPrice, gzbTotal,
            spdQty, spdPrice, spdTotal,
            rentalTotalQty, rentalTotalRev,
            grandTotalIncome,
            expenseTotal,
            netCashFlow
        };
    }, [tickets, rentals, includeExpenses, expenses]);

    // Handlers for expense rows
    const addExpenseRow = () => {
        setExpenses(prev => [
            ...prev,
            { id: Date.now(), category: 'Operasional', desc: '', amount: '' }
        ]);
    };

    const removeExpenseRow = (id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const updateExpenseRow = (id, field, val) => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            regQty, rmbQty, krsQty,
            banQty, gzbQty, spdQty,
            grandTotalIncome, expenseTotal,
            ticketTotalQty
        } = calculations;

        const activeExpenses = includeExpenses
            ? expenses.filter(exp => (parseFloat(exp.amount) || 0) > 0)
            : [];

        if (grandTotalIncome === 0 && activeExpenses.length === 0) {
            alert('Silakan masukkan minimal satu data penjualan tiket/sewa atau pengeluaran untuk disimpan ke rekap!');
            return;
        }

        setIsSubmitting(true);

        let targetDateStr = '';
        let targetDateObj;
        let periodLabel = '';

        if (mode === 'monthly') {
            const y = parseInt(year, 10);
            const m = parseInt(month, 10);
            const lastDay = new Date(y, m, 0).getDate();
            targetDateStr = `${y}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
            targetDateObj = new Date(`${targetDateStr}T17:00:00`);
            const mObj = INDO_MONTHS.find(im => im.value === String(m).padStart(2, '0'));
            periodLabel = `${mObj ? mObj.name : `Bulan ${m}`} ${y}`;
        } else {
            targetDateStr = specificDate || new Date().toISOString().split('T')[0];
            targetDateObj = new Date(`${targetDateStr}T17:00:00`);
            periodLabel = targetDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        }

        const isoDate = targetDateObj.toISOString();
        const formattedDate = targetDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        const batchCode = Math.floor(100000 + Math.random() * 900000);
        const batchId = `RKP-${targetDateStr.replace(/-/g, '')}-${batchCode}`;
        const recapNotes = notes.trim() || `Rekap Pembukuan ${periodLabel}`;

        // Payment method mapping
        let primaryMethod = 'Tunai';
        if (paymentMode === 'all_qris') primaryMethod = 'QRIS';
        else if (paymentMode === 'all_transfer') primaryMethod = 'Transfer';
        else if (paymentMode === 'split_cash_qris') primaryMethod = 'Tunai';

        const newTxRows = [];
        const supabaseRows = [];

        const addTxItem = (typeKey, category, typeLabel, prodLabel, qty, price, rentalObj = null, methodOverride = null) => {
            if (qty <= 0) return;
            const total = qty * price;
            const bookingCode = `${batchId}-${typeKey.toUpperCase()}`;
            const selectedMethod = methodOverride || primaryMethod;

            const tx = {
                code: bookingCode,
                booking_code: bookingCode,
                date: formattedDate,
                time: '17:00 WIB',
                dateTime: `${formattedDate} 17:00`,
                created_at: isoDate,
                category: category,
                type: typeLabel,
                product: prodLabel,
                ticket_type: typeKey.toLowerCase(),
                transaction_type: category.toLowerCase(),
                qty: qty,
                total: total,
                total_price: total,
                channel: channel,
                method: selectedMethod,
                payment_method: selectedMethod.toLowerCase(),
                customer: `${recapNotes} (${prodLabel})`,
                customer_name: `${recapNotes} (${prodLabel})`,
                phone: '-',
                cashier_name: currentAccount?.name || 'Admin',
                status: 'Lunas - Rekap Manual',
                is_manual_recap: true,
                recap_batch_id: batchId,
                rentals: rentalObj || { ban: 0, gazebo: 0, sepeda: 0 }
            };

            newTxRows.push(tx);

            supabaseRows.push({
                booking_code: bookingCode,
                ticket_type: typeKey.toLowerCase(),
                transaction_type: category.toLowerCase(),
                quantity: qty,
                total_price: total,
                customer_name: `${recapNotes} (${prodLabel})`,
                status: 'lunas',
                payment_method: selectedMethod.toLowerCase(),
                channel: channel.toLowerCase(),
                cashier_name: currentAccount?.name || 'Admin',
                is_manual_recap: true,
                recap_batch_id: batchId,
                notes: recapNotes,
                created_at: isoDate
            });
        };

        // If split 50/50, assign Reguler to Tunai and Rombongan/Sewa to QRIS
        const methodForRombongan = paymentMode === 'split_cash_qris' ? 'QRIS' : primaryMethod;
        const methodForRentals = paymentMode === 'split_cash_qris' ? 'QRIS' : primaryMethod;

        if (regQty > 0) addTxItem('reguler', 'Beli', 'Beli Tiket Masuk', 'Tiket Reguler', regQty, tickets.reguler.price);
        if (rmbQty > 0) addTxItem('rombongan', 'Beli', 'Beli Tiket Rombongan', 'Tiket Rombongan', rmbQty, tickets.rombongan.price, null, methodForRombongan);
        if (krsQty > 0) addTxItem('kursus', 'Beli', 'Beli Tiket Kursus Renang', 'Kursus Renang', krsQty, tickets.kursus.price);

        if (banQty > 0) addTxItem('ban', 'Sewa', 'Sewa Ban', 'Sewa Ban', banQty, rentals.ban.price, { ban: banQty, gazebo: 0, sepeda: 0 }, methodForRentals);
        if (gzbQty > 0) addTxItem('gazebo', 'Sewa', 'Sewa Gazebo', 'Sewa Gazebo', gzbQty, rentals.gazebo.price, { ban: 0, gazebo: gzbQty, sepeda: 0 }, methodForRentals);
        if (spdQty > 0) addTxItem('angsa', 'Sewa', 'Sewa Sepeda Air', 'Sewa Sepeda Air / Angsa', spdQty, rentals.sepeda.price, { ban: 0, gazebo: 0, sepeda: spdQty }, methodForRentals);

        const newExpenseRows = [];
        const supabaseExpenseRows = [];
        activeExpenses.forEach((exp, idx) => {
            const expId = `EXP-${batchId}-${idx + 1}`;
            newExpenseRows.push({
                id: expId,
                expense_code: expId,
                date: targetDateStr,
                created_at: isoDate,
                category: exp.category || 'Operasional',
                desc: `${exp.desc || 'Biaya Operasional'} (Rekap ${periodLabel})`,
                description: `${exp.desc || 'Biaya Operasional'} (Rekap ${periodLabel})`,
                amount: parseFloat(exp.amount) || 0,
                is_manual_recap: true,
                recap_batch_id: batchId
            });

            supabaseExpenseRows.push({
                expense_code: expId,
                category: exp.category || 'Operasional',
                description: `${exp.desc || 'Biaya Operasional'} (Rekap ${periodLabel})`,
                amount: parseFloat(exp.amount) || 0,
                date: targetDateStr,
                is_manual_recap: true,
                recap_batch_id: batchId,
                created_by: currentAccount?.name || 'Admin',
                created_at: isoDate
            });
        });

        const supabaseRecapRow = {
            batch_id: batchId,
            period_label: periodLabel,
            mode: mode,
            month: month,
            year: year,
            target_date: targetDateStr,
            notes: recapNotes,
            total_income: grandTotalIncome,
            total_expenses: expenseTotal,
            net_income: grandTotalIncome - expenseTotal,
            total_visitors: ticketTotalQty,
            tx_count: newTxRows.length,
            exp_count: newExpenseRows.length,
            created_by: currentAccount?.name || 'Admin',
            created_at: new Date().toISOString()
        };

        try {
            await onSaveRecap({
                batchId,
                periodLabel,
                mode,
                month,
                year,
                targetDateStr,
                formattedDate,
                isoDate,
                recapNotes,
                newTxRows,
                supabaseRows,
                newExpenseRows,
                supabaseExpenseRows,
                supabaseRecapRow,
                grandTotalIncome,
                expenseTotal,
                totalVisitors: ticketTotalQty
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="v-modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
            <div
                className="v-modal-card fade-in"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '820px',
                    width: '95%',
                    maxHeight: '92vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
                    border: '1px solid #e2e8f0'
                }}
            >
                {/* Header Modal */}
                <div
                    style={{
                        backgroundColor: '#0c294a',
                        color: 'white',
                        padding: '18px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                backgroundColor: 'rgba(37, 99, 235, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(96, 165, 250, 0.3)'
                            }}
                        >
                            <i className="fa-solid fa-file-circle-plus" style={{ color: '#60a5fa', fontSize: '1.25rem' }}></i>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: 'white' }}>
                                    Input Rekap Manual Bulan Sebelumnya
                                </h3>
                                <span style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                                    Pembukuan Masa Lalu
                                </span>
                            </div>
                            <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                                Masukkan rangkuman data penjualan tiket, sewa wahana, dan biaya operasional untuk periode lampau.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            fontSize: '1.6rem',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            lineHeight: 1
                        }}
                        title="Tutup Modal"
                    >
                        &times;
                    </button>
                </div>

                {/* Form Body (Scrollable) */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        padding: '20px 24px',
                        overflowY: 'auto',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: '#f8fafc'
                    }}
                >
                    {/* 1. PERIODE & PENGATURAN WAKTU */}
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                            <strong style={{ fontSize: '0.88rem', color: '#0c294a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <i className="fa-regular fa-calendar-check" style={{ color: '#2563eb' }}></i>
                                Periode & Jadwal Rekap:
                            </strong>
                            {/* Toggle Mode */}
                            <div style={{ display: 'inline-flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setMode('monthly')}
                                    style={{
                                        border: 'none',
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.78rem',
                                        fontWeight: mode === 'monthly' ? 900 : 700,
                                        backgroundColor: mode === 'monthly' ? '#2563eb' : 'transparent',
                                        color: mode === 'monthly' ? 'white' : '#64748b',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    📅 Rekap 1 Bulan Penuh
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('daily')}
                                    style={{
                                        border: 'none',
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.78rem',
                                        fontWeight: mode === 'daily' ? 900 : 700,
                                        backgroundColor: mode === 'daily' ? '#2563eb' : 'transparent',
                                        color: mode === 'daily' ? 'white' : '#64748b',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    📆 Rekap Tanggal Spesifik
                                </button>
                            </div>
                        </div>

                        {mode === 'monthly' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.8fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                        Pilih Bulan
                                    </label>
                                    <select
                                        value={month}
                                        onChange={(e) => handleMonthYearChange(e.target.value, year)}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#ffffff', outline: 'none' }}
                                    >
                                        {INDO_MONTHS.map(m => (
                                            <option key={m.value} value={m.value}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                        Pilih Tahun
                                    </label>
                                    <select
                                        value={year}
                                        onChange={(e) => handleMonthYearChange(month, e.target.value)}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#ffffff', outline: 'none' }}
                                    >
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                        Channel Penjualan
                                    </label>
                                    <select
                                        value={channel}
                                        onChange={(e) => setChannel(e.target.value)}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#ffffff', outline: 'none' }}
                                    >
                                        <option value="Offline">Offline (Loket Kasir Fisik)</option>
                                        <option value="Online">Online (Aplikasi WA/Web)</option>
                                        <option value="Campuran">Campuran (Offline & Online)</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr', gap: '12px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                        Tanggal Kunjungan / Transaksi di Bulan Lalu
                                    </label>
                                    <input
                                        type="date"
                                        value={specificDate}
                                        onChange={(e) => {
                                            setSpecificDate(e.target.value);
                                            const d = new Date(e.target.value);
                                            if (!isNaN(d.getTime())) {
                                                const formatted = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                                                setNotes(`Rekap Pembukuan Tanggal ${formatted}`);
                                            }
                                        }}
                                        required
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                        Channel Penjualan
                                    </label>
                                    <select
                                        value={channel}
                                        onChange={(e) => setChannel(e.target.value)}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#ffffff', outline: 'none' }}
                                    >
                                        <option value="Offline">Offline (Loket Kasir Fisik)</option>
                                        <option value="Online">Online (Aplikasi WA/Web)</option>
                                        <option value="Campuran">Campuran (Offline & Online)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '12px' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '4px' }}>
                                Judul / Catatan Rekapitulasi
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Rekap Pembukuan Kasir Bulan Agustus 2026"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }}
                            />
                        </div>
                    </div>

                    {/* 2. DUA KOLOM: TIKET MASUK VS SEWA WAHANA */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
                        {/* KOLOM 1: TIKET MASUK (BELI) */}
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '18px', border: '1.5px solid #bfdbfe', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #eff6ff', paddingBottom: '10px', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                                        🛒 BELI
                                    </span>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#1e40af' }}>
                                        Pemasukan Tiket Masuk
                                    </h4>
                                </div>
                                <span style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 800 }}>
                                    {calculations.ticketTotalQty} Tiket Terjual
                                </span>
                            </div>

                            {/* Tiket Reguler */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🎟️ Tiket Reguler</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#2563eb' }}>
                                        Rp {calculations.regTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Qty):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={tickets.reguler.qty}
                                            onChange={(e) => setTickets({ ...tickets, reguler: { ...tickets.reguler, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Satuan (Rp):</span>
                                        <input
                                            type="number"
                                            value={tickets.reguler.price}
                                            onChange={(e) => setTickets({ ...tickets, reguler: { ...tickets.reguler, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tiket Rombongan */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🚌 Tiket Rombongan (Grup)</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#2563eb' }}>
                                        Rp {calculations.rmbTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Qty):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={tickets.rombongan.qty}
                                            onChange={(e) => setTickets({ ...tickets, rombongan: { ...tickets.rombongan, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Satuan (Rp):</span>
                                        <input
                                            type="number"
                                            value={tickets.rombongan.price}
                                            onChange={(e) => setTickets({ ...tickets, rombongan: { ...tickets.rombongan, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Kursus Renang */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🏊‍♂️ Kursus Renang</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#2563eb' }}>
                                        Rp {calculations.krsTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Qty):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={tickets.kursus.qty}
                                            onChange={(e) => setTickets({ ...tickets, kursus: { ...tickets.kursus, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Satuan (Rp):</span>
                                        <input
                                            type="number"
                                            value={tickets.kursus.price}
                                            onChange={(e) => setTickets({ ...tickets, kursus: { ...tickets.kursus, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b' }}>Subtotal Tiket:</span>
                                <strong style={{ fontSize: '0.95rem', color: '#1e40af' }}>
                                    Rp {calculations.ticketTotalRev.toLocaleString('id-ID')}
                                </strong>
                            </div>
                        </div>

                        {/* KOLOM 2: LAYANAN SEWA (SEWA) */}
                        <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '18px', border: '1.5px solid #bbf7d0', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #f0fdf4', paddingBottom: '10px', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900 }}>
                                        🔑 SEWA
                                    </span>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#166534' }}>
                                        Pemasukan Layanan Sewa
                                    </h4>
                                </div>
                                <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 800 }}>
                                    {calculations.rentalTotalQty} Unit Tersewa
                                </span>
                            </div>

                            {/* Sewa Ban */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🛞 Sewa Ban Pelampung</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#16a34a' }}>
                                        Rp {calculations.banTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Unit):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={rentals.ban.qty}
                                            onChange={(e) => setRentals({ ...rentals, ban: { ...rentals.ban, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Sewa (Rp):</span>
                                        <input
                                            type="number"
                                            value={rentals.ban.price}
                                            onChange={(e) => setRentals({ ...rentals, ban: { ...rentals.ban, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sewa Gazebo */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🛖 Sewa Gazebo Saung</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#16a34a' }}>
                                        Rp {calculations.gzbTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Unit):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={rentals.gazebo.qty}
                                            onChange={(e) => setRentals({ ...rentals, gazebo: { ...rentals.gazebo, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Sewa (Rp):</span>
                                        <input
                                            type="number"
                                            value={rentals.gazebo.price}
                                            onChange={(e) => setRentals({ ...rentals, gazebo: { ...rentals.gazebo, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sewa Sepeda Air / Angsa */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>🚴‍♂️ Sewa Sepeda Air (Angsa)</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#16a34a' }}>
                                        Rp {calculations.spdTotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Jumlah (Unit):</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={rentals.sepeda.qty}
                                            onChange={(e) => setRentals({ ...rentals, sepeda: { ...rentals.sepeda, qty: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Tarif Sewa (Rp):</span>
                                        <input
                                            type="number"
                                            value={rentals.sepeda.price}
                                            onChange={(e) => setRentals({ ...rentals, sepeda: { ...rentals.sepeda, price: e.target.value } })}
                                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b' }}>Subtotal Layanan:</span>
                                <strong style={{ fontSize: '0.95rem', color: '#166534' }}>
                                    Rp {calculations.rentalTotalRev.toLocaleString('id-ID')}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* 3. METODE PEMBAYARAN */}
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '18px', border: '1px solid #e2e8f0' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0c294a', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <i className="fa-solid fa-wallet" style={{ color: '#2563eb' }}></i> Metode Pembayaran Dominan:
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                            {[
                                { key: 'all_cash', label: '100% Tunai (Cash)', icon: 'fa-money-bill-1-wave' },
                                { key: 'all_qris', label: '100% QRIS', icon: 'fa-qrcode' },
                                { key: 'all_transfer', label: '100% Transfer Bank', icon: 'fa-building-columns' },
                                { key: 'split_cash_qris', label: 'Campuran (Tunai + QRIS)', icon: 'fa-arrows-split-up-and-left' }
                            ].map(m => (
                                <button
                                    key={m.key}
                                    type="button"
                                    onClick={() => setPaymentMode(m.key)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '10px 8px',
                                        borderRadius: '10px',
                                        border: paymentMode === m.key ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                        backgroundColor: paymentMode === m.key ? '#eff6ff' : '#f8fafc',
                                        color: paymentMode === m.key ? '#1d4ed8' : '#475569',
                                        fontSize: '0.78rem',
                                        fontWeight: paymentMode === m.key ? 900 : 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <i className={`fa-solid ${m.icon}`}></i> {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. PENGELUARAN OPERASIONAL (OPSIONAL) */}
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '18px', border: includeExpenses ? '1.5px solid #fed7aa' : '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', margin: 0 }}>
                                <input
                                    type="checkbox"
                                    checked={includeExpenses}
                                    onChange={(e) => setIncludeExpenses(e.target.checked)}
                                    style={{ width: '18px', height: '18px', accentColor: '#ea580c', cursor: 'pointer' }}
                                />
                                <div>
                                    <strong style={{ fontSize: '0.88rem', color: '#0c294a' }}>
                                        Sertakan Catatan Pengeluaran Operasional di Bulan Tersebut
                                    </strong>
                                    <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b' }}>
                                        Aktifkan bila Anda ingin mencatat biaya listrik, air, perawatan, atau gaji untuk periode ini.
                                    </p>
                                </div>
                            </label>
                            {includeExpenses && (
                                <button
                                    type="button"
                                    onClick={addExpenseRow}
                                    style={{
                                        backgroundColor: '#fff7ed',
                                        color: '#c2410c',
                                        border: '1px solid #fed7aa',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '0.74rem',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <i className="fa-solid fa-plus"></i> Tambah Baris
                                </button>
                            )}
                        </div>

                        {includeExpenses && (
                            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {expenses.map((exp, idx) => (
                                    <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.5fr auto', gap: '8px', alignItems: 'center', backgroundColor: '#fff7ed', padding: '8px 10px', borderRadius: '10px' }}>
                                        <select
                                            value={exp.category}
                                            onChange={(e) => updateExpenseRow(exp.id, 'category', e.target.value)}
                                            style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #fdba74', fontSize: '0.78rem', fontWeight: 700 }}
                                        >
                                            <option value="Operasional">Operasional</option>
                                            <option value="Listrik & Air">Listrik & Air</option>
                                            <option value="Perawatan">Perawatan</option>
                                            <option value="Gaji Karyawan">Gaji Karyawan</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Deskripsi pengeluaran..."
                                            value={exp.desc}
                                            onChange={(e) => updateExpenseRow(exp.id, 'desc', e.target.value)}
                                            style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #fdba74', fontSize: '0.78rem' }}
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Nominal (Rp)"
                                            value={exp.amount}
                                            onChange={(e) => updateExpenseRow(exp.id, 'amount', e.target.value)}
                                            style={{ padding: '6px 8px', borderRadius: '8px', border: '1px solid #fdba74', fontSize: '0.78rem', fontWeight: 800 }}
                                        />
                                        {expenses.length > 1 ? (
                                            <button
                                                type="button"
                                                onClick={() => removeExpenseRow(exp.id)}
                                                style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                                title="Hapus baris ini"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        ) : <div style={{ width: '16px' }}></div>}
                                    </div>
                                ))}
                                <div style={{ textAlign: 'right', fontSize: '0.82rem', fontWeight: 800, color: '#c2410c', marginTop: '4px' }}>
                                    Total Pengeluaran: Rp {calculations.expenseTotal.toLocaleString('id-ID')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 5. LIVE SUMMARY BOX */}
                    <div
                        style={{
                            backgroundColor: '#0c294a',
                            borderRadius: '18px',
                            padding: '16px 20px',
                            color: 'white',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '12px',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>TOTAL PENGUNJUNG</span>
                            <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                                {calculations.ticketTotalQty.toLocaleString('id-ID')} <small style={{ fontSize: '0.72rem' }}>Orang</small>
                            </strong>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>TOTAL PEMASUKAN</span>
                            <strong style={{ fontSize: '1.1rem', color: '#4ade80' }}>
                                Rp {calculations.grandTotalIncome.toLocaleString('id-ID')}
                            </strong>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>TOTAL PENGELUARAN</span>
                            <strong style={{ fontSize: '1.1rem', color: '#f87171' }}>
                                Rp {calculations.expenseTotal.toLocaleString('id-ID')}
                            </strong>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, display: 'block' }}>SALDO BERSIH (NET)</span>
                            <strong style={{ fontSize: '1.1rem', color: calculations.netCashFlow >= 0 ? '#60a5fa' : '#f87171' }}>
                                Rp {calculations.netCashFlow.toLocaleString('id-ID')}
                            </strong>
                        </div>
                    </div>

                    {/* 6. MODAL ACTIONS */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                color: '#475569',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                            }}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || (calculations.grandTotalIncome === 0 && calculations.expenseTotal === 0)}
                            style={{
                                backgroundColor: calculations.grandTotalIncome > 0 || calculations.expenseTotal > 0 ? '#2563eb' : '#94a3b8',
                                border: 'none',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                fontWeight: 900,
                                fontSize: '0.88rem',
                                cursor: calculations.grandTotalIncome > 0 || calculations.expenseTotal > 0 ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: calculations.grandTotalIncome > 0 ? '0 4px 14px rgba(37, 99, 235, 0.3)' : 'none'
                            }}
                        >
                            <i className="fa-solid fa-circle-check"></i>
                            {isSubmitting ? 'Menyimpan Rekap...' : 'Simpan Rekap ke Sistem'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// =====================================================================
// 2. MODAL: RIWAYAT INPUT REKAP MANUAL
// =====================================================================
export function RecapHistoryModal({
    isOpen,
    onClose,
    manualRecaps = [],
    onApplyRecapFilter,
    onDeleteRecap,
    onOpenManualRecap
}) {
    if (!isOpen) return null;

    return (
        <div className="v-modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
            <div
                className="v-modal-card fade-in"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '860px',
                    width: '95%',
                    maxHeight: '88vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
                    border: '1px solid #e2e8f0'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: '#0c294a',
                        color: 'white',
                        padding: '18px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(96, 165, 250, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="fa-solid fa-clock-rotate-left" style={{ color: '#60a5fa', fontSize: '1.15rem' }}></i>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: 'white' }}>
                                Riwayat Input Rekap Manual
                            </h3>
                            <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#94a3b8' }}>
                                Daftar seluruh batch rekapitulasi data masa lalu yang pernah dimasukkan ke dalam sistem.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700 }}>
                            Total Ada <strong>{manualRecaps.length}</strong> Batch Rekap Manual
                        </span>
                        <button
                            type="button"
                            onClick={() => { onClose(); onOpenManualRecap(); }}
                            style={{
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <i className="fa-solid fa-plus"></i> + Input Rekap Baru
                        </button>
                    </div>

                    {manualRecaps.length === 0 ? (
                        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.5rem' }}>
                                <i className="fa-regular fa-folder-open"></i>
                            </div>
                            <h4 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>Belum Ada Data Rekap Manual</h4>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
                                Gunakan tombol "+ Input Rekap Baru" di atas untuk memasukkan rangkuman tiket dan sewa dari bulan sebelumnya.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {manualRecaps.map((item) => (
                                <div
                                    key={item.batchId}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        border: '1.5px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '14px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <div style={{ flex: '1 1 280px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900 }}>
                                                {item.periodLabel}
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                                                ID: {item.batchId}
                                            </span>
                                        </div>
                                        <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 800, color: '#0c294a' }}>
                                            {item.notes}
                                        </h4>
                                        <div style={{ fontSize: '0.74rem', color: '#64748b', display: 'flex', gap: '12px' }}>
                                            <span><i className="fa-regular fa-calendar"></i> Tanggal: {item.formattedDate}</span>
                                            <span><i className="fa-solid fa-user-check"></i> Oleh: {item.createdBy || 'Admin'}</span>
                                        </div>
                                    </div>

                                    {/* Metrics pill */}
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div style={{ backgroundColor: '#f0fdf4', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                                            <span style={{ fontSize: '0.65rem', color: '#166534', fontWeight: 700, display: 'block' }}>PEMASUKAN</span>
                                            <strong style={{ fontSize: '0.88rem', color: '#16a34a' }}>Rp {(item.totalIncome || 0).toLocaleString('id-ID')}</strong>
                                        </div>
                                        {item.totalExpenses > 0 && (
                                            <div style={{ backgroundColor: '#fff1f2', padding: '8px 12px', borderRadius: '10px', border: '1px solid #fecdd3' }}>
                                                <span style={{ fontSize: '0.65rem', color: '#9f1239', fontWeight: 700, display: 'block' }}>PENGELUARAN</span>
                                                <strong style={{ fontSize: '0.88rem', color: '#e11d48' }}>Rp {(item.totalExpenses || 0).toLocaleString('id-ID')}</strong>
                                            </div>
                                        )}
                                        <div style={{ backgroundColor: '#eff6ff', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                                            <span style={{ fontSize: '0.65rem', color: '#1e40af', fontWeight: 700, display: 'block' }}>PENGUNJUNG</span>
                                            <strong style={{ fontSize: '0.88rem', color: '#2563eb' }}>{(item.totalVisitors || 0).toLocaleString('id-ID')} Orang</strong>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button
                                                type="button"
                                                onClick={() => { onClose(); onApplyRecapFilter(item); }}
                                                style={{
                                                    backgroundColor: '#0c294a',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 800,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}
                                                title="Lihat data rekap ini di Laporan Keuangan"
                                            >
                                                <i className="fa-solid fa-chart-pie"></i> Lihat Laporan
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDeleteRecap(item.batchId, item.periodLabel)}
                                                style={{
                                                    backgroundColor: '#fee2e2',
                                                    color: '#b91c1c',
                                                    border: '1px solid #fca5a5',
                                                    padding: '8px 10px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 800,
                                                    cursor: 'pointer'
                                                }}
                                                title="Hapus batch rekap ini beserta transaksinya"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

