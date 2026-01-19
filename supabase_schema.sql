-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- EXPERIENCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update updated_at automatically
CREATE TRIGGER update_experience_updated_at
  BEFORE UPDATE ON experience
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EDUCATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period TEXT NOT NULL,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger to update updated_at automatically
CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON education
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SKILLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'technologies')),
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Add trigger to update updated_at automatically
CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ADMIN TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);

-- Add trigger to update updated_at automatically
CREATE TRIGGER update_admin_updated_at
  BEFORE UPDATE ON admin
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Experience: Public read access, admin write access
CREATE POLICY "Experience is viewable by everyone"
  ON experience FOR SELECT
  USING (true);

CREATE POLICY "Experience is insertable by authenticated admins"
  ON experience FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Experience is updatable by authenticated admins"
  ON experience FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Experience is deletable by authenticated admins"
  ON experience FOR DELETE
  USING (auth.role() = 'authenticated');

-- Education: Public read access, admin write access
CREATE POLICY "Education is viewable by everyone"
  ON education FOR SELECT
  USING (true);

CREATE POLICY "Education is insertable by authenticated admins"
  ON education FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Education is updatable by authenticated admins"
  ON education FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Education is deletable by authenticated admins"
  ON education FOR DELETE
  USING (auth.role() = 'authenticated');

-- Skills: Public read access, admin write access
CREATE POLICY "Skills is viewable by everyone"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Skills is insertable by authenticated admins"
  ON skills FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Skills is updatable by authenticated admins"
  ON skills FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Skills is deletable by authenticated admins"
  ON skills FOR DELETE
  USING (auth.role() = 'authenticated');

-- Admin: Only admins can access admin table
CREATE POLICY "Admin is viewable by authenticated admins"
  ON admin FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin is insertable by authenticated admins"
  ON admin FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin is updatable by authenticated admins"
  ON admin FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin is deletable by authenticated admins"
  ON admin FOR DELETE
  USING (auth.role() = 'authenticated');

