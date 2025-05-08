-- Add xummJWT field to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS xumm_jwt TEXT,
ADD COLUMN IF NOT EXISTS xumm_jwt_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS xrp_wallet_address TEXT;

-- Create index for faster lookups by wallet address
CREATE INDEX IF NOT EXISTS idx_profiles_xrp_wallet_address ON profiles(xrp_wallet_address);

-- Add comment to explain the purpose of these fields
COMMENT ON COLUMN profiles.xumm_jwt IS 'JWT token from Xaman wallet for persistent connection';
COMMENT ON COLUMN profiles.xumm_jwt_expires_at IS 'Expiration timestamp for the Xaman JWT token';
COMMENT ON COLUMN profiles.xrp_wallet_address IS 'XRP Ledger wallet address connected via Xaman';
