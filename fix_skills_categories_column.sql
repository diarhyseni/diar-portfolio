-- Ensure the categories column exists and is properly configured
-- Run this in Supabase SQL Editor

-- Step 1: Add categories column if it doesn't exist
ALTER TABLE skills ADD COLUMN IF NOT EXISTS categories TEXT[];

-- Step 2: Migrate existing single category to array (if categories is null)
UPDATE skills 
SET categories = ARRAY[category] 
WHERE categories IS NULL OR array_length(categories, 1) IS NULL;

-- Step 3: Make categories NOT NULL with default
ALTER TABLE skills ALTER COLUMN categories SET DEFAULT ARRAY[]::TEXT[];
ALTER TABLE skills ALTER COLUMN categories SET NOT NULL;

-- Step 4: Add constraint to ensure valid category values
ALTER TABLE skills DROP CONSTRAINT IF EXISTS valid_categories;
ALTER TABLE skills ADD CONSTRAINT valid_categories 
  CHECK (
    categories <@ ARRAY['frontend', 'backend', 'technologies']::TEXT[]
  );

-- Step 5: Create index for array operations (if it doesn't exist)
CREATE INDEX IF NOT EXISTS idx_skills_categories ON skills USING GIN (categories);

-- Verify the columns
SELECT 
    column_name, 
    data_type, 
    udt_name,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'skills' 
AND column_name IN ('category', 'categories')
ORDER BY column_name;




