-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  gallery TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  technologies TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  year TEXT NOT NULL,
  github_url TEXT,
  live_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Create index on sort_order for ordering
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- Create index on year for filtering
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read projects
CREATE POLICY "Allow public to read projects" ON projects
  FOR SELECT
  TO public
  USING (true);

-- Policy: Only authenticated admins can modify projects
-- Note: We'll disable RLS for admin access for now
-- You can enable it later with proper authentication
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_projects_updated_at();

