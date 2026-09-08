-- ============================================================
-- NERVE AI — Supabase PostgreSQL Schema
-- Run this entire script in Supabase SQL Editor
-- Project: https://bwhxqugsvbymphiopqpd.supabase.co
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────
-- USERS TABLE (extends Supabase auth.users)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'fleet_operator' CHECK (role IN ('fleet_operator', 'admin')),
  fleet_name    TEXT,
  phone         TEXT,
  city          TEXT,
  gst_number    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can only see their own record (admins see all)
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'fleet_operator');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────────────────────
-- VEHICLES TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.vehicles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plate_number    TEXT NOT NULL,
  make            TEXT NOT NULL,
  model           TEXT NOT NULL,
  year            INTEGER,
  device_serial   TEXT UNIQUE,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_setup')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own vehicles"
  ON public.vehicles FOR ALL
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ──────────────────────────────────────────────────────────────
-- ORDERS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.orders (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES public.users(id),
  hardware_qty        INTEGER NOT NULL DEFAULT 1,
  hardware_amount     NUMERIC(10,2) NOT NULL,
  saas_amount         NUMERIC(10,2) NOT NULL,
  total_amount        NUMERIC(10,2) NOT NULL,
  status              TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'dispatched', 'delivered', 'cancelled')),
  shipping_address    JSONB,
  edi_850_sent_at     TIMESTAMPTZ,
  edi_855_received_at TIMESTAMPTZ,
  razorpay_order_id   TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ──────────────────────────────────────────────────────────────
-- PAYMENTS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.payments (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id              UUID NOT NULL REFERENCES public.orders(id),
  user_id               UUID NOT NULL REFERENCES public.users(id),
  razorpay_payment_id   TEXT UNIQUE,
  razorpay_order_id     TEXT,
  razorpay_signature    TEXT,
  amount                NUMERIC(10,2) NOT NULL,
  currency              TEXT DEFAULT 'INR',
  status                TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'captured', 'failed', 'refunded')),
  payment_method        TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ──────────────────────────────────────────────────────────────
-- SUBSCRIPTIONS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES public.users(id),
  order_id            UUID REFERENCES public.orders(id),
  plan                TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'business', 'enterprise')),
  vehicle_count       INTEGER NOT NULL DEFAULT 1,
  price_per_vehicle   NUMERIC(10,2) DEFAULT 200.00,
  monthly_amount      NUMERIC(10,2) GENERATED ALWAYS AS (vehicle_count * price_per_vehicle) STORED,
  status              TEXT DEFAULT 'active' CHECK (status IN ('trial', 'active', 'paused', 'cancelled')),
  trial_ends_at       TIMESTAMPTZ,
  next_billing_date   DATE,
  started_at          TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at        TIMESTAMPTZ,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ──────────────────────────────────────────────────────────────
-- ALERTS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.alerts (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id            UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  user_id               UUID NOT NULL REFERENCES public.users(id),
  alert_type            TEXT NOT NULL CHECK (alert_type IN ('failure_prediction', 'battery_low', 'engine_temp', 'fuel_pressure', 'vibration')),
  component             TEXT NOT NULL,
  severity              TEXT DEFAULT 'warning' CHECK (severity IN ('info', 'warning', 'critical')),
  predicted_failure_date DATE,
  days_to_failure       INTEGER,
  message               TEXT NOT NULL,
  acknowledged          BOOLEAN DEFAULT FALSE,
  acknowledged_at       TIMESTAMPTZ,
  sms_sent              BOOLEAN DEFAULT FALSE,
  email_sent            BOOLEAN DEFAULT FALSE,
  triggered_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
  ON public.alerts FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Users can update own alerts"
  ON public.alerts FOR UPDATE
  USING (user_id = auth.uid());

-- ──────────────────────────────────────────────────────────────
-- INSTALLATION BOOKINGS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE public.installation_slots (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES public.users(id),
  order_id        UUID REFERENCES public.orders(id),
  booked_date     DATE NOT NULL,
  booked_time     TIME NOT NULL,
  driver_name     TEXT,
  driver_phone    TEXT,
  preferred_lang  TEXT DEFAULT 'English',
  technician_id   TEXT,
  meeting_link    TEXT DEFAULT 'https://meet.google.com/nerve-install-demo',
  status          TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled', 'rescheduled')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.installation_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bookings"
  ON public.installation_slots FOR ALL
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ──────────────────────────────────────────────────────────────
-- ADMIN HELPER VIEWS
-- ──────────────────────────────────────────────────────────────

-- Revenue summary view
CREATE OR REPLACE VIEW public.revenue_summary AS
SELECT
  DATE(p.created_at) AS date,
  SUM(p.amount) AS daily_revenue,
  COUNT(p.id) AS transaction_count
FROM public.payments p
WHERE p.status = 'captured'
GROUP BY DATE(p.created_at)
ORDER BY date DESC;

-- Customer overview view
CREATE OR REPLACE VIEW public.customer_overview AS
SELECT
  u.id,
  u.email,
  u.fleet_name,
  u.city,
  u.created_at AS joined_at,
  COUNT(DISTINCT v.id) AS vehicle_count,
  s.plan,
  s.status AS subscription_status,
  s.monthly_amount,
  s.next_billing_date
FROM public.users u
LEFT JOIN public.vehicles v ON v.user_id = u.id
LEFT JOIN public.subscriptions s ON s.user_id = u.id AND s.status = 'active'
WHERE u.role = 'fleet_operator'
GROUP BY u.id, u.email, u.fleet_name, u.city, u.created_at, s.plan, s.status, s.monthly_amount, s.next_billing_date;

-- ──────────────────────────────────────────────────────────────
-- INDEXES for performance
-- ──────────────────────────────────────────────────────────────
CREATE INDEX idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_created_at ON public.payments(created_at);
CREATE INDEX idx_alerts_vehicle_id ON public.alerts(vehicle_id);
CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- ──────────────────────────────────────────────────────────────
-- SEED: Create admin user (run AFTER registering via the app)
-- Replace 'YOUR_USER_UUID' with actual UUID from auth.users
-- ──────────────────────────────────────────────────────────────
-- UPDATE public.users SET role = 'admin' WHERE email = 'your-admin@email.com';

SELECT 'Schema created successfully! Tables: users, vehicles, orders, payments, subscriptions, alerts, installation_slots' AS status;
