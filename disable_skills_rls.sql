-- Disable RLS on skills table to allow admin operations via API routes
-- This matches the setup for experience and education tables

ALTER TABLE skills DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'skills';




