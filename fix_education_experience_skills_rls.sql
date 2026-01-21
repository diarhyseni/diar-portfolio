-- Fix RLS policies for experience, education, and skills tables
-- Since we use custom cookie-based admin authentication,
-- we need to allow operations with the anon key (the API route already checks admin_session cookie)

-- ============================================
-- EXPERIENCE TABLE
-- ============================================
-- Disable RLS (security is handled by API route's admin_session cookie check)
ALTER TABLE experience DISABLE ROW LEVEL SECURITY;

-- Alternative: If you prefer to keep RLS enabled, use permissive policies:
-- DROP POLICY IF EXISTS "Experience is insertable by authenticated admins" ON experience;
-- DROP POLICY IF EXISTS "Experience is updatable by authenticated admins" ON experience;
-- DROP POLICY IF EXISTS "Experience is deletable by authenticated admins" ON experience;
-- 
-- CREATE POLICY "Experience is insertable by everyone"
--   ON experience FOR INSERT
--   WITH CHECK (true);
-- 
-- CREATE POLICY "Experience is updatable by everyone"
--   ON experience FOR UPDATE
--   USING (true);
-- 
-- CREATE POLICY "Experience is deletable by everyone"
--   ON experience FOR DELETE
--   USING (true);

-- ============================================
-- EDUCATION TABLE
-- ============================================
-- Disable RLS (security is handled by API route's admin_session cookie check)
ALTER TABLE education DISABLE ROW LEVEL SECURITY;

-- Alternative: If you prefer to keep RLS enabled, use permissive policies:
-- DROP POLICY IF EXISTS "Education is insertable by authenticated admins" ON education;
-- DROP POLICY IF EXISTS "Education is updatable by authenticated admins" ON education;
-- DROP POLICY IF EXISTS "Education is deletable by authenticated admins" ON education;
-- 
-- CREATE POLICY "Education is insertable by everyone"
--   ON education FOR INSERT
--   WITH CHECK (true);
-- 
-- CREATE POLICY "Education is updatable by everyone"
--   ON education FOR UPDATE
--   USING (true);
-- 
-- CREATE POLICY "Education is deletable by everyone"
--   ON education FOR DELETE
--   USING (true);

-- ============================================
-- SKILLS TABLE
-- ============================================
-- Disable RLS (security is handled by API route's admin_session cookie check)
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;

-- Alternative: If you prefer to keep RLS enabled, use permissive policies:
-- DROP POLICY IF EXISTS "Skills is insertable by authenticated admins" ON skills;
-- DROP POLICY IF EXISTS "Skills is updatable by authenticated admins" ON skills;
-- DROP POLICY IF EXISTS "Skills is deletable by authenticated admins" ON skills;
-- 
-- CREATE POLICY "Skills is insertable by everyone"
--   ON skills FOR INSERT
--   WITH CHECK (true);
-- 
-- CREATE POLICY "Skills is updatable by everyone"
--   ON skills FOR UPDATE
--   USING (true);
-- 
-- CREATE POLICY "Skills is deletable by everyone"
--   ON skills FOR DELETE
--   USING (true);

-- Verify RLS is disabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('experience', 'education', 'skills')
  AND schemaname = 'public';
