-- Fix RLS on admin table to allow queries
-- The admin table might have RLS blocking the lookup

-- Option 1: Disable RLS on admin table (for development)
ALTER TABLE admin DISABLE ROW LEVEL SECURITY;

-- Option 2: Or allow public SELECT on admin table (if you want to keep RLS)
-- DROP POLICY IF EXISTS "Admin is viewable by authenticated admins" ON admin;
-- CREATE POLICY "Admin is viewable for login check"
--   ON admin FOR SELECT
--   USING (true);

-- Verify admin exists
SELECT id, email, name, role, is_active, created_at 
FROM admin 
WHERE email = 'diarhyseni4@gmail.com';




