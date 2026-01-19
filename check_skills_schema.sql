-- Check the current schema of the skills table
-- Run this in Supabase SQL Editor to see what columns exist

SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'skills' 
ORDER BY ordinal_position;

-- Check if categories column exists and its type
SELECT 
    column_name,
    data_type,
    udt_name
FROM information_schema.columns 
WHERE table_name = 'skills' 
AND column_name IN ('category', 'categories');




