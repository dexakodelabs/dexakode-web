
-- 1. Create the submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now() NOT NULL,
    first_name text NOT NULL,
    company text,
    email text NOT NULL,
    message text NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow public (anon) users to insert new submissions
-- This allows your website's contact form to send data to the DB
CREATE POLICY "Allow public to submit contact form" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- 4. (Optional) Create a policy so only you (authenticated) can view submissions
-- Replace 'authenticated' with your specific role if needed
CREATE POLICY "Allow authenticated users to view submissions" 
ON public.submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Instructions: 
-- 1. Go to your Supabase Dashboard
-- 2. Open 'SQL Editor' from the left sidebar
-- 3. Paste this code and click 'Run'
