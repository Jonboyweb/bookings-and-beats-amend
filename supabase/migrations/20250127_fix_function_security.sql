-- Fix security issue: Set search_path to empty string for update_updated_at_column function
-- This prevents potential SQL injection attacks via search_path manipulation

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE 'plpgsql' AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- The function is now secure with:
-- 1. SECURITY DEFINER ensures it runs with creator's privileges
-- 2. SET search_path = '' prevents search path manipulation attacks
-- 3. Explicit schema qualification would be added if referencing other objects