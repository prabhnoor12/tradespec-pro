-- ============================================================================
-- TradeSpec Pro™ — Production Supabase Database Schema
-- Project URL: https://hrutolmtfggvzyhherkr.supabase.co
-- Direct Connection: postgresql://postgres:sekhonsaab12@db.hrutolmtfggvzyhherkr.supabase.co:5432/postgres
-- ============================================================================
-- Instructions: Run this script directly in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hrutolmtfggvzyhherkr/sql
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CONTRACTORS TABLE (Subcontractor accounts, territory & dispatch wallet)
create table if not exists public.contractors (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  contact_person text not null,
  dispatch_email text not null,
  dispatch_phone text not null,
  license_number text,
  insurance_bond text default '$2,000,000 General Liability / Bonded',
  pin text not null default '1234',
  primary_zip text not null default '77002',
  service_radius_miles integer not null default 60,
  min_job_value_usd numeric not null default 2500,
  active_trades text[] default array['charge', 'permit', 'site', 'cold', 'crane', 'well', 'racking', 'foam', 'grease'],
  wallet_balance numeric not null default 450.00,
  auto_reload boolean default true,
  webhook_url text default '',
  status text not null default 'active',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. LEADS TABLE (Engineered Sizing RFPs generated from all 9 calculator tools)
create table if not exists public.leads (
  id text primary key,
  trade text not null, -- 'charge', 'permit', 'site', 'cold', 'crane', 'well', 'racking', 'foam', 'grease'
  trade_title text not null,
  customer_name text not null,
  company text,
  phone text not null,
  email text not null,
  zip text not null,
  spec_summary text not null,
  spec_details jsonb default '{}'::jsonb,
  budget_est text not null,
  lead_cost numeric not null,
  status text not null default 'new', -- 'new', 'claimed', 'contacted', 'won', 'disputed'
  claimed_by_contractor_id uuid references public.contractors(id) on delete set null,
  claimed_at timestamptz,
  dispute_reason text,
  fast_bid_sent_at timestamptz,
  fast_bid_message text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. PARTNER APPLICATIONS (Contractor Onboarding Submissions from Landing Page)
create table if not exists public.partner_applications (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  specialty_trade text not null,
  base_zip text not null,
  service_radius integer not null default 60,
  lead_sources text[] not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  status text not null default 'pending', -- 'pending', 'approved', 'declined'
  assigned_pin text default '1234',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. WALLET TRANSACTIONS TABLE (Audit Ledger for Lead Purchases & Top-ups)
create table if not exists public.wallet_transactions (
  id uuid primary key default uuid_generate_v4(),
  contractor_id uuid references public.contractors(id) on delete cascade,
  type text not null, -- 'deposit', 'lead_purchase', 'refund', 'bonus'
  amount numeric not null,
  balance_after numeric not null,
  description text not null,
  reference_lead_id text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enables anonymous / client access using the publishable key (sb_publishable_...)
-- ============================================================================

alter table public.contractors enable row level security;
alter table public.leads enable row level security;
alter table public.partner_applications enable row level security;
alter table public.wallet_transactions enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow anon read all contractors" on public.contractors;
drop policy if exists "Allow anon update contractors" on public.contractors;
drop policy if exists "Allow anon insert contractors" on public.contractors;

drop policy if exists "Allow anon read leads" on public.leads;
drop policy if exists "Allow anon update leads" on public.leads;
drop policy if exists "Allow anon insert leads" on public.leads;

drop policy if exists "Allow anon insert partner_applications" on public.partner_applications;
drop policy if exists "Allow anon read partner_applications" on public.partner_applications;

drop policy if exists "Allow anon read wallet_transactions" on public.wallet_transactions;
drop policy if exists "Allow anon insert wallet_transactions" on public.wallet_transactions;

-- Recreate policies for full anonymous interaction
create policy "Allow anon read all contractors" on public.contractors for select using (true);
create policy "Allow anon update contractors" on public.contractors for update using (true);
create policy "Allow anon insert contractors" on public.contractors for insert with check (true);

create policy "Allow anon read leads" on public.leads for select using (true);
create policy "Allow anon update leads" on public.leads for update using (true);
create policy "Allow anon insert leads" on public.leads for insert with check (true);

create policy "Allow anon insert partner_applications" on public.partner_applications for insert with check (true);
create policy "Allow anon read partner_applications" on public.partner_applications for select using (true);

create policy "Allow anon read wallet_transactions" on public.wallet_transactions for select using (true);
create policy "Allow anon insert wallet_transactions" on public.wallet_transactions for insert with check (true);

-- Enable Realtime for Leads & Applications
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime for table public.leads, public.partner_applications;
commit;

-- ============================================================================
-- INITIAL SEED DATA
-- Pre-populates default demo contractor (PIN: 1234) and initial 9 trade leads
-- ============================================================================

-- Insert Default Demo Contractor
insert into public.contractors (
  id,
  company_name,
  contact_person,
  dispatch_email,
  dispatch_phone,
  license_number,
  insurance_bond,
  pin,
  primary_zip,
  service_radius_miles,
  min_job_value_usd,
  active_trades,
  wallet_balance
) values (
  'a0000000-0000-0000-0000-000000000001',
  'Apex Heavy Equipment & Industrial Services LLC',
  'Marcus Vance',
  'dispatch@apexindustrial.com',
  '(555) 849-2041',
  'TX-COMM-894120',
  '$2,000,000 General Liability / Bonded',
  '1234',
  '77002',
  60,
  2500,
  array['charge', 'permit', 'site', 'cold', 'crane', 'well', 'racking', 'foam', 'grease'],
  450.00
) on conflict (id) do nothing;

-- Insert Seed Transactions
insert into public.wallet_transactions (contractor_id, type, amount, balance_after, description, reference_lead_id)
values 
  ('a0000000-0000-0000-0000-000000000001', 'deposit', 500.00, 500.00, 'Initial Dispatch Credit Allocation', null),
  ('a0000000-0000-0000-0000-000000000001', 'lead_purchase', -225.00, 275.00, 'Dispatched Lead EV-2026-7812 (ChargeSpec)', 'EV-2026-7812'),
  ('a0000000-0000-0000-0000-000000000001', 'bonus', 175.00, 450.00, 'Pilot Fast-Start Bonus Credit ($175)', null)
on conflict do nothing;

-- Insert 9 Commercial Seed Leads Across All Trade Modules
insert into public.leads (
  id, trade, trade_title, customer_name, company, phone, email, zip, spec_summary, budget_est, lead_cost, status
) values
  ('EV-2026-7812', 'charge', 'Commercial EV Fleet', 'Marcus Vance', 'Apex Logistics LLC', '(713) 555-8902', 'mvance@apexlogistics.com', '77002', '12x 19.2kW Level 2 Ports, 85kWh Vans, 361A @ 480V, 225kVA Padmount, 150ft Trench', '$75,000 – $145,000', 225, 'new'),
  ('TI-2026-6190', 'permit', 'Tenant Improvement', 'Elena Rostova', 'Artisan Bakery & Cafe', '(469) 555-7391', 'elena@artisanbakery.com', '75001', '2,400 SF Restaurant, 160 Persons, 2 Remote Exits, 12ft Type I Hood (4,800 CFM), $45/SF TI Credit', '$310,000 – $480,000', 275, 'new'),
  ('SITE-2026-4431', 'site', 'Civil Earthwork', 'Derrick Cole', 'Cole Commercial Properties', '(512) 555-4321', 'dcole@coleproperties.com', '78701', '1.5 Acres, 65% Impervious, 3.23 CFS Runoff, 0.26 Ac-Ft Pond, 800 BCY Cut, 60ft x 6ft Geogrid Wall', '$66,000 – $108,000', 185, 'new'),
  ('COLD-2026-5892', 'cold', 'Commercial Refrigeration', 'Carlos Mendez', 'Lone Star Brewing Co.', '(210) 555-6789', 'carlos@lonestarbrew.com', '78205', '10x12x8.5 ft Cooler (+35°F), 11,850 BTU/hr, 1.5 HP Scroll Condenser, 4" IMP (R-29)', '$14,500 – $24,000', 95, 'new'),
  ('LIFT-2026-8491', 'crane', 'Crane & Rigging', 'Marcus Vance', 'Apex Commercial Mechanical', '(713) 555-0192', 'mvance@apexmech.com', '77002', '75-Ton Crane, 6,000 lbs RTU at 60ft setback (48ft height)', '$2,800 – $4,200', 45, 'new'),
  ('WELL-2026-3104', 'well', 'Water Well & Pump', 'David Sterling', 'Sterling Ranch & Vineyards', '(830) 555-4821', 'david@sterlingvineyards.com', '78624', '350 ft Bedrock Well, 25 GPM, 3.0 HP Submersible Pump, 119 Gal Tank', '$18,500 – $22,400', 85, 'new'),
  ('RACK-2026-9281', 'racking', 'Pallet Racking', 'Elena Rostova', 'ColdChain Logistics Hub', '(469) 555-7391', 'elena@coldchain3pl.com', '75001', '10k SF Facility, 648 Pallet Positions, Reach Truck (9.5ft aisles), 20ft Uprights', '$51,800 – $64,800', 135, 'contacted'),
  ('FOAM-2026-4412', 'foam', 'Spray Foam', 'Travis Holcomb', 'Holcomb Custom Steel Bldgs', '(512) 555-8320', 'travis@holcombmetal.com', '78701', '30''×40'' Shop, 6,440 Bd Ft (2" Closed-Cell R-13.6, Roof + Walls)', '$9,600 – $11,800', 60, 'won'),
  ('FOG-2026-1940', 'grease', 'Grease Trap & Hood', 'Chef Anthony Bell', 'Prime Cut Steakhouse', '(210) 555-9014', 'anthony@primecutbistro.com', '78205', '1,000 Gal Gravity Vault, 10ft Type I Hood (4,000 CFM), Heavy Duty Charbroiler', '$14,200 – $18,500', 75, 'new')
on conflict (id) do nothing;
