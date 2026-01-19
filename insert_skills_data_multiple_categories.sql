-- Insert Skills Data with Multiple Categories Support
-- Note: Some skills can belong to multiple categories (e.g., TypeScript can be frontend and backend)

INSERT INTO skills (name, categories, icon_name, display_order) VALUES
-- Frontend
('HTML 5', ARRAY['frontend'], 'SiHtml5', 1),
('CSS 3', ARRAY['frontend'], 'SiCss3', 2),
('JavaScript', ARRAY['frontend'], 'SiJavascript', 3),
('TypeScript', ARRAY['frontend', 'backend'], 'SiTypescript', 4), -- Can be both frontend and backend
('React', ARRAY['frontend'], 'SiReact', 5),
('Next.js', ARRAY['frontend', 'backend'], 'SiNextdotjs', 6), -- Full-stack framework
('Vuejs', ARRAY['frontend'], 'SiVuedotjs', 7),
('Tailwind', ARRAY['frontend'], 'SiTailwindcss', 8),
-- Backend
('Node.js', ARRAY['backend'], 'SiNodedotjs', 9),
('Express', ARRAY['backend'], 'SiExpress', 10),
('Java', ARRAY['backend'], 'JavaIcon', 11),
('PHP', ARRAY['backend'], 'SiPhp', 12),
('Asp .NET Core', ARRAY['backend'], 'SiDotnet', 13),
-- Technologies
('MongoDB', ARRAY['technologies'], 'SiMongodb', 14),
('PostgreSQL', ARRAY['technologies'], 'SiPostgresql', 15),
('MySQL', ARRAY['technologies'], 'SiMysql', 16),
('Redis', ARRAY['technologies'], 'SiRedis', 17),
('WordPress', ARRAY['technologies'], 'SiWordpress', 18),
('Shopify', ARRAY['technologies'], 'SiShopify', 19),
('Supabase', ARRAY['technologies'], 'SiSupabase', 20),
('Git', ARRAY['technologies'], 'SiGit', 21),
('Docker', ARRAY['technologies'], 'SiDocker', 22),
('Figma', ARRAY['technologies'], 'SiFigma', 23),
('SEO', ARRAY['technologies'], 'SeoIcon', 24)
ON CONFLICT (name) DO UPDATE SET
  categories = EXCLUDED.categories,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

-- Verify the data was inserted
SELECT 
  category,
  COUNT(*) as count 
FROM (
  SELECT unnest(categories) as category 
  FROM skills
) sub
GROUP BY category
ORDER BY category;




