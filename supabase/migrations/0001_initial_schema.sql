-- 1. Leads Table (For Web3Forms / B2B Audit Requests)
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'audit_scheduled', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Telemetry Snapshots Table (For Phase 5 ETL Pipeline)
CREATE TABLE telemetry_snapshots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    region TEXT NOT NULL, -- e.g. 'ERCOT', 'CAISO', 'NATIONAL_AVG'
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    current_load_mw NUMERIC NOT NULL,
    capacity_mw NUMERIC NOT NULL,
    water_stress_index NUMERIC, -- Custom calculated metric
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index for fast time-series querying by region
CREATE INDEX idx_telemetry_region_time ON telemetry_snapshots(region, timestamp DESC);

-- Enable RLS (Row Level Security) on these tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry_snapshots ENABLE ROW LEVEL SECURITY;

-- Add Policies (We only want authenticated users to read leads)
-- Assuming we use Clerk, we'll map policies later. For now, public can't read leads.
-- Telemetry is safe for public reading if we allow it, but we'll fetch via server action (Service Role).
