-- Enable pgcrypto extension for password hashing (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert admin user with hashed password
-- Password: "Mitrovica1."
INSERT INTO admin (email, password_hash, name, role, is_active)
VALUES (
  'diarhyseni4@gmail.com',
  crypt('Mitrovica1.', gen_salt('bf', 10)), -- bcrypt hash with 10 rounds
  'Diar Hyseni',
  'admin',
  true
);

-- Verify the admin was created
SELECT id, email, name, role, is_active, created_at FROM admin WHERE email = 'diarhyseni4@gmail.com';




