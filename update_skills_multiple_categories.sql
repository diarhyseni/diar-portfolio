-- Update skills table to support multiple categories
-- Change category from TEXT to TEXT[] (array)

-- Step 1: Add a new column for array categories
ALTER TABLE skills ADD COLUMN IF NOT EXISTS categories TEXT[];

-- Step 2: Migrate existing single category to array
UPDATE skills SET categories = ARRAY[category] WHERE categories IS NULL;

-- Step 3: Make categories NOT NULL with default
ALTER TABLE skills ALTER COLUMN categories SET DEFAULT ARRAY[]::TEXT[];
ALTER TABLE skills ALTER COLUMN categories SET NOT NULL;

-- Step 4: Add constraint to ensure valid category values
ALTER TABLE skills ADD CONSTRAINT valid_categories 
  CHECK (
    categories <@ ARRAY['frontend', 'backend', 'technologies']::TEXT[]
  );

-- Step 5: Create index for array operations
CREATE INDEX IF NOT EXISTS idx_skills_categories ON skills USING GIN (categories);

-- Step 6: (Optional) Keep old category column for backward compatibility or drop it
-- To drop the old column after migration, uncomment:
-- ALTER TABLE skills DROP COLUMN category;

-- Example queries for multiple categories:
-- Insert skill with multiple categories:
-- INSERT INTO skills (name, categories, icon_name, display_order) 
-- VALUES ('TypeScript', ARRAY['frontend', 'backend'], 'SiTypescript', 4);

-- Find skills in a specific category:
-- SELECT * FROM skills WHERE 'frontend' = ANY(categories);

-- Find skills in multiple categories:
-- SELECT * FROM skills WHERE categories && ARRAY['frontend', 'backend'];




