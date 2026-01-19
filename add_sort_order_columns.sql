-- Add sort_order column to experience and education tables
-- This allows manual reordering of items

-- Add sort_order to experience table
ALTER TABLE experience ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add sort_order to education table  
ALTER TABLE education ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Set initial sort_order based on created_at (newest first gets lower numbers)
-- Experience
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as rn
  FROM experience
)
UPDATE experience e
SET sort_order = numbered.rn
FROM numbered
WHERE e.id = numbered.id;

-- Education
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as rn
  FROM education
)
UPDATE education e
SET sort_order = numbered.rn
FROM numbered
WHERE e.id = numbered.id;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experience_sort_order ON experience(sort_order);
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);




