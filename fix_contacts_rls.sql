-- Fix RLS policies for contacts table
-- Since we use custom cookie-based admin authentication for admin operations,
-- and public contact form submissions need to work without authentication,
-- we need to allow public inserts (security is handled by the API route)

-- ============================================
-- CONTACTS TABLE
-- ============================================
-- Disable RLS (security is handled by API route)
-- Public can insert (contact form), admins can read/update/delete via API route checks
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Alternative: If you prefer to keep RLS enabled, use permissive policies:
-- DROP POLICY IF EXISTS "Contacts is viewable by authenticated admins" ON contacts;
-- DROP POLICY IF EXISTS "Contacts is insertable by everyone" ON contacts;
-- DROP POLICY IF EXISTS "Contacts is updatable by authenticated admins" ON contacts;
-- DROP POLICY IF EXISTS "Contacts is deletable by authenticated admins" ON contacts;
-- 
-- -- Allow public to insert (for contact form submissions)
-- CREATE POLICY "Contacts is insertable by everyone"
--   ON contacts FOR INSERT
--   WITH CHECK (true);
-- 
-- -- Allow admins to read (API route checks admin_session cookie)
-- CREATE POLICY "Contacts is viewable by everyone"
--   ON contacts FOR SELECT
--   USING (true);
-- 
-- -- Allow admins to update (API route checks admin_session cookie)
-- CREATE POLICY "Contacts is updatable by everyone"
--   ON contacts FOR UPDATE
--   USING (true);
-- 
-- -- Allow admins to delete (API route checks admin_session cookie)
-- CREATE POLICY "Contacts is deletable by everyone"
--   ON contacts FOR DELETE
--   USING (true);

-- Verify RLS is disabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'contacts'
  AND schemaname = 'public';
