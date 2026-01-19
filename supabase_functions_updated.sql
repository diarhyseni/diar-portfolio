-- Function to verify password using pgcrypto crypt
CREATE OR REPLACE FUNCTION verify_crypt_password(
  p_password TEXT,
  p_hash TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN crypt(p_password, p_hash) = p_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Alternative function that takes email and password directly
CREATE OR REPLACE FUNCTION verify_password_direct(
  p_email TEXT,
  p_password TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_hash TEXT;
BEGIN
  -- Get the password hash for the email
  SELECT password_hash INTO v_hash
  FROM admin
  WHERE email = p_email AND is_active = true;
  
  -- If no user found, return false
  IF v_hash IS NULL THEN
    RETURN false;
  END IF;
  
  -- Verify the password
  RETURN crypt(p_password, v_hash) = v_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




