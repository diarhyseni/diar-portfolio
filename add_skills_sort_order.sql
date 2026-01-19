-- Add sort_order column to skills table (or rename display_order to sort_order)
-- Option 1: Rename display_order to sort_order for consistency
ALTER TABLE skills RENAME COLUMN display_order TO sort_order;

-- Option 2: If you want to keep both, add a new sort_order column:
-- ALTER TABLE skills ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
-- UPDATE skills SET sort_order = display_order WHERE sort_order = 0;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_skills_sort_order ON skills(sort_order);




