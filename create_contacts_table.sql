-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create index on read status
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert contacts (for form submissions)
CREATE POLICY "Allow public to insert contacts" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only authenticated admins can read contacts
-- Note: You'll need to adjust this based on your authentication setup
-- For now, we'll disable RLS on this table for admin access
-- You can enable it later with proper authentication
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

