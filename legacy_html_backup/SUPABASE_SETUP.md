# Supabase Integration Setup

To fully power the MyTokenCost audit lead capture form, you'll need to configure your Supabase backend. Follow the steps below:

## 1. Create the Database Table
Run the following SQL query in your Supabase project's **SQL Editor**:

```sql
CREATE TABLE public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) to restrict operations
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create a policy allowing ANYONE to insert rows (Anonymous Lead Capture)
CREATE POLICY "Allow anonymous insert" ON public.leads
    FOR INSERT
    WITH CHECK (true);

-- (Optional) Create a policy allowing authenticated users to read leads
CREATE POLICY "Allow authenticated users to read" ON public.leads
    FOR SELECT
    TO authenticated
    USING (true);
```

## 2. Obtain Your Credentials
1. Go to your Supabase Project **Settings > API**.
2. Copy the **Project URL**.
3. Copy the **anon / public** API Key.

## 3. Configure the Application
Open `public/index.html` and replace the placeholder variables inside the script block near the end of the file with your actual URL and Anon Key.

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```
