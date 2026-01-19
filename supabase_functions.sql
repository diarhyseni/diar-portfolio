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




