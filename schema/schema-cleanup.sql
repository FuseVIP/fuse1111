-- First, let's ensure we have proper foreign key constraints and indexes

-- 1. Referrals table improvements
ALTER TABLE referrals
ADD CONSTRAINT fk_referrals_primary_business
FOREIGN KEY (primary_business_id) REFERENCES businesses(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_referrals_secondary_business
FOREIGN KEY (secondary_business_id) REFERENCES businesses(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_referrals_user
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_referrals_primary_business ON referrals(primary_business_id);
CREATE INDEX IF NOT EXISTS idx_referrals_secondary_business ON referrals(secondary_business_id);
CREATE INDEX IF NOT EXISTS idx_referrals_user ON referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- 2. Purchases table improvements
ALTER TABLE purchases
ADD CONSTRAINT fk_purchases_user
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_transaction ON purchases(transaction_id);

-- 3. Business discount codes improvements
ALTER TABLE business_discount_codes
ADD CONSTRAINT fk_discount_codes_business
FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_discount_codes_business ON business_discount_codes(business_id);
CREATE INDEX IF NOT EXISTS idx_discount_codes_active ON business_discount_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON business_discount_codes(code);

-- 4. Network applications improvements
-- Ensure proper constraints for user references
ALTER TABLE network_applications
ADD CONSTRAINT fk_network_applications_user
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_network_applications_status ON network_applications(status);
CREATE INDEX IF NOT EXISTS idx_network_applications_user ON network_applications(user_id);

-- 5. VIP codes improvements
CREATE INDEX IF NOT EXISTS idx_vip_codes_active ON vip_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_vip_codes_code ON vip_codes(code);
CREATE INDEX IF NOT EXISTS idx_vip_codes_expires ON vip_codes(expires_at);

-- 6. Add missing columns if needed
-- Check if membership_end_date exists in profiles table, add if not
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'membership_end_date') THEN
        ALTER TABLE profiles ADD COLUMN membership_end_date TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Check if card_tier exists in profiles table, add if not
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'card_tier') THEN
        ALTER TABLE profiles ADD COLUMN card_tier TEXT;
    END IF;
END $$;

-- Check if is_card_holder exists in profiles table, add if not
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'is_card_holder') THEN
        ALTER TABLE profiles ADD COLUMN is_card_holder BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- 7. Create RLS policies for security
-- Example for businesses table
CREATE POLICY "Users can view all businesses" 
ON businesses FOR SELECT 
USING (true);

CREATE POLICY "Only business owners can update their businesses" 
ON businesses FOR UPDATE 
USING (auth.uid() = owner_id);

-- 8. Create or update functions for business verification
CREATE OR REPLACE FUNCTION verify_business(business_id UUID, verified BOOLEAN)
RETURNS VOID AS $$
BEGIN
  UPDATE businesses
  SET is_verified = verified,
      verified_at = CASE WHEN verified THEN NOW() ELSE NULL END
  WHERE id = business_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create function to handle referral rewards
CREATE OR REPLACE FUNCTION process_referral_reward(referral_id UUID)
RETURNS VOID AS $$
DECLARE
  ref_record RECORD;
BEGIN
  -- Get the referral record
  SELECT * INTO ref_record FROM referrals WHERE id = referral_id;
  
  -- Update referral status
  UPDATE referrals SET status = 'processed' WHERE id = referral_id;
  
  -- Here you would add logic to credit tokens or rewards
  -- This is a placeholder for your actual reward logic
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create a view for active businesses with their discount codes
CREATE OR REPLACE VIEW active_business_discounts AS
SELECT 
  b.id AS business_id,
  b.name AS business_name,
  b.category,
  b.is_verified,
  bdc.code AS discount_code,
  bdc.discount_percentage,
  bdc.description AS discount_description
FROM 
  businesses b
LEFT JOIN 
  business_discount_codes bdc ON b.id = bdc.business_id
WHERE 
  b.is_active = true 
  AND (bdc.is_active = true OR bdc.is_active IS NULL);

-- 11. Create a function to get user membership status
CREATE OR REPLACE FUNCTION get_user_membership_status(user_id UUID)
RETURNS TABLE (
  is_active BOOLEAN,
  tier TEXT,
  days_remaining INTEGER
) AS $$
DECLARE
  profile_record RECORD;
BEGIN
  -- Get user profile
  SELECT * INTO profile_record FROM profiles WHERE id = user_id;
  
  -- Calculate membership status
  is_active := profile_record.is_card_holder AND 
               (profile_record.membership_end_date IS NULL OR 
                profile_record.membership_end_date > NOW());
  
  tier := profile_record.card_tier;
  
  -- Calculate days remaining
  IF profile_record.membership_end_date IS NOT NULL AND profile_record.membership_end_date > NOW() THEN
    days_remaining := EXTRACT(DAY FROM (profile_record.membership_end_date - NOW()));
  ELSE
    days_remaining := 0;
  END IF;
  
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
