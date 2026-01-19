-- Temporarily disable RLS or allow public inserts for development
-- WARNING: Only use this for development! Re-enable proper RLS before production.

-- Option 1: Temporarily disable RLS (easiest for testing)
ALTER TABLE experience DISABLE ROW LEVEL SECURITY;
ALTER TABLE education DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;

-- Option 2: Allow public inserts (if you want to keep RLS enabled)
-- Uncomment these if you prefer to keep RLS enabled but allow inserts:

-- DROP POLICY IF EXISTS "Experience is insertable by authenticated admins" ON experience;
-- CREATE POLICY "Experience is insertable by everyone (DEV ONLY)"
--   ON experience FOR INSERT
--   WITH CHECK (true);

-- DROP POLICY IF EXISTS "Experience is updatable by authenticated admins" ON experience;
-- CREATE POLICY "Experience is updatable by everyone (DEV ONLY)"
--   ON experience FOR UPDATE
--   USING (true);

-- DROP POLICY IF EXISTS "Experience is deletable by authenticated admins" ON experience;
-- CREATE POLICY "Experience is deletable by everyone (DEV ONLY)"
--   ON experience FOR DELETE
--   USING (true);

-- DROP POLICY IF EXISTS "Education is insertable by authenticated admins" ON education;
-- CREATE POLICY "Education is insertable by everyone (DEV ONLY)"
--   ON education FOR INSERT
--   WITH CHECK (true);

-- DROP POLICY IF EXISTS "Education is updatable by authenticated admins" ON education;
-- CREATE POLICY "Education is updatable by everyone (DEV ONLY)"
--   ON education FOR UPDATE
--   USING (true);

-- DROP POLICY IF EXISTS "Education is deletable by authenticated admins" ON education;
-- CREATE POLICY "Education is deletable by everyone (DEV ONLY)"
--   ON education FOR DELETE
--   USING (true);

-- DROP POLICY IF EXISTS "Skills is insertable by authenticated admins" ON skills;
-- CREATE POLICY "Skills is insertable by everyone (DEV ONLY)"
--   ON skills FOR INSERT
--   WITH CHECK (true);

-- DROP POLICY IF EXISTS "Skills is updatable by authenticated admins" ON skills;
-- CREATE POLICY "Skills is updatable by everyone (DEV ONLY)"
--   ON skills FOR UPDATE
--   USING (true);

-- DROP POLICY IF EXISTS "Skills is deletable by authenticated admins" ON skills;
-- CREATE POLICY "Skills is deletable by everyone (DEV ONLY)"
--   ON skills FOR DELETE
--   USING (true);




