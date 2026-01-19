-- Remove the old category column and use only categories array
-- WARNING: This will permanently delete the category column
-- Make sure all data is migrated to categories array first!

-- Step 1: Ensure all rows have categories array populated
-- (This should already be done, but just in case)
UPDATE skills 
SET categories = ARRAY[category] 
WHERE categories IS NULL OR array_length(categories, 1) IS NULL;

-- Step 2: Drop the NOT NULL constraint on category (if it exists)
ALTER TABLE skills ALTER COLUMN category DROP NOT NULL;

-- Step 3: Drop the old category column
ALTER TABLE skills DROP COLUMN IF EXISTS category;

-- Step 4: Drop the old category index if it exists
DROP INDEX IF EXISTS idx_skills_category;

-- Step 5: Verify the column is gone
SELECT column_name, data_type, udt_name
FROM information_schema.columns 
WHERE table_name = 'skills' 
ORDER BY ordinal_position;




