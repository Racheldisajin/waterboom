-- Script Inisialisasi Database PostgreSQL untuk WebCijoho & PostgREST
-- Jalankan di database 'cijoho' pada PostgreSQL VPS

-- 1. Buat role web_anon (untuk publik/kasir) dan web_admin (untuk admin dashboard)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'web_anon') THEN
    CREATE ROLE web_anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'web_admin') THEN
    CREATE ROLE web_admin NOLOGIN;
  END IF;
END
$$;

-- Berikan izin ganti role (SET ROLE) ke user Postgres utama (admin_utama / admin)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin_utama') THEN
    GRANT web_anon TO admin_utama;
    GRANT web_admin TO admin_utama;
  END IF;
  IF EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
    GRANT web_anon TO admin;
    GRANT web_admin TO admin;
  END IF;
END
$$;

-- Izin akses skema public
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT USAGE ON SCHEMA public TO web_admin;

-- ============================================================================
-- 2. TABEL TRANSACTIONS (Penjualan Tiket Masuk & Sewa Layanan)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.transactions (
    id BIGSERIAL PRIMARY KEY,
    booking_code VARCHAR(100) NOT NULL,
    ticket_type VARCHAR(100),
    transaction_type VARCHAR(50) DEFAULT 'beli',
    quantity INTEGER DEFAULT 1,
    total_price NUMERIC DEFAULT 0,
    customer_name VARCHAR(255) DEFAULT 'Pengunjung',
    status VARCHAR(50) DEFAULT 'lunas',
    payment_method VARCHAR(50) DEFAULT 'tunai',
    channel VARCHAR(50) DEFAULT 'offline',
    cashier_name VARCHAR(255) DEFAULT 'Petugas Kasir',
    is_manual_recap BOOLEAN DEFAULT FALSE,
    recap_batch_id VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrasi jika kolom baru belum ada di tabel transactions
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(50) DEFAULT 'beli';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS is_manual_recap BOOLEAN DEFAULT FALSE;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS recap_batch_id VARCHAR(100);
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS notes TEXT;

-- Index performa query transactions
CREATE INDEX IF NOT EXISTS idx_transactions_booking_code ON public.transactions(booking_code);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_recap_batch_id ON public.transactions(recap_batch_id);
CREATE INDEX IF NOT EXISTS idx_transactions_is_manual_recap ON public.transactions(is_manual_recap);

-- ============================================================================
-- 3. TABEL EXPENDITURES (Biaya / Arus Kas Keluar Operasional & Rekap Manual)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.expenditures (
    id BIGSERIAL PRIMARY KEY,
    expense_code VARCHAR(100) UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    amount NUMERIC NOT NULL DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_manual_recap BOOLEAN DEFAULT FALSE,
    recap_batch_id VARCHAR(100),
    created_by VARCHAR(255) DEFAULT 'Admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index performa query expenditures
CREATE INDEX IF NOT EXISTS idx_expenditures_expense_code ON public.expenditures(expense_code);
CREATE INDEX IF NOT EXISTS idx_expenditures_date ON public.expenditures(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenditures_created_at ON public.expenditures(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_expenditures_recap_batch_id ON public.expenditures(recap_batch_id);

-- ============================================================================
-- 4. TABEL MANUAL_RECAPS (Header / Metadata Riwayat Rekapitulasi Manual Lampau)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.manual_recaps (
    id BIGSERIAL PRIMARY KEY,
    batch_id VARCHAR(100) UNIQUE NOT NULL,
    period_label VARCHAR(100) NOT NULL,
    mode VARCHAR(50) DEFAULT 'monthly',
    month VARCHAR(10),
    year VARCHAR(10),
    target_date DATE,
    notes TEXT,
    total_income NUMERIC NOT NULL DEFAULT 0,
    total_expenses NUMERIC NOT NULL DEFAULT 0,
    net_income NUMERIC NOT NULL DEFAULT 0,
    total_visitors INTEGER NOT NULL DEFAULT 0,
    tx_count INTEGER NOT NULL DEFAULT 0,
    exp_count INTEGER NOT NULL DEFAULT 0,
    created_by VARCHAR(255) DEFAULT 'Admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index performa query manual_recaps
CREATE INDEX IF NOT EXISTS idx_manual_recaps_batch_id ON public.manual_recaps(batch_id);
CREATE INDEX IF NOT EXISTS idx_manual_recaps_target_date ON public.manual_recaps(target_date DESC);
CREATE INDEX IF NOT EXISTS idx_manual_recaps_created_at ON public.manual_recaps(created_at DESC);

-- ============================================================================
-- 5. HAK AKSES ROLE (Prinsip Least Privilege)
-- ============================================================================

-- Role web_anon (Publik/Kasir):
-- Hanya boleh INSERT transaksi baru dan SELECT id (untuk keepAlive ping).
-- DILARANG SELECT * pada transaksi agar omset tidak diintip.
REVOKE ALL ON TABLE public.transactions FROM web_anon;
GRANT INSERT, SELECT (id) ON TABLE public.transactions TO web_anon;
GRANT USAGE, SELECT ON SEQUENCE public.transactions_id_seq TO web_anon;

-- Role web_admin (Admin Dashboard):
-- Akses penuh untuk manajemen transaksi, pengeluaran, dan riwayat rekap
GRANT ALL ON TABLE public.transactions TO web_admin;
GRANT ALL ON TABLE public.expenditures TO web_admin;
GRANT ALL ON TABLE public.manual_recaps TO web_admin;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO web_admin;
GRANT USAGE, SELECT ON SEQUENCE public.transactions_id_seq TO web_admin;
GRANT USAGE, SELECT ON SEQUENCE public.expenditures_id_seq TO web_admin;
GRANT USAGE, SELECT ON SEQUENCE public.manual_recaps_id_seq TO web_admin;

-- ============================================================================
-- 6. DEFAULT PRIVILEGES UNTUK MASA DEPAN
-- ============================================================================
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO web_anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO web_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO web_admin;
