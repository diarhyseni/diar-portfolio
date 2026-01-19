-- Insert Skills Data
-- Icon names map to react-icons/si components or custom icons

INSERT INTO skills (name, category, icon_name, display_order) VALUES
-- Frontend
('HTML 5', 'frontend', 'SiHtml5', 1),
('CSS 3', 'frontend', 'SiCss3', 2),
('JavaScript', 'frontend', 'SiJavascript', 3),
('TypeScript', 'frontend', 'SiTypescript', 4),
('React', 'frontend', 'SiReact', 5),
('Next.js', 'frontend', 'SiNextdotjs', 6),
('Vuejs', 'frontend', 'SiVuedotjs', 7),
('Tailwind', 'frontend', 'SiTailwindcss', 8),
-- Backend
('Node.js', 'backend', 'SiNodedotjs', 9),
('Express', 'backend', 'SiExpress', 10),
('Java', 'backend', 'JavaIcon', 11),
('PHP', 'backend', 'SiPhp', 12),
('Asp .NET Core', 'backend', 'SiDotnet', 13),
-- Technologies
('MongoDB', 'technologies', 'SiMongodb', 14),
('PostgreSQL', 'technologies', 'SiPostgresql', 15),
('MySQL', 'technologies', 'SiMysql', 16),
('Redis', 'technologies', 'SiRedis', 17),
('WordPress', 'technologies', 'SiWordpress', 18),
('Shopify', 'technologies', 'SiShopify', 19),
('Supabase', 'technologies', 'SiSupabase', 20),
('Git', 'technologies', 'SiGit', 21),
('Docker', 'technologies', 'SiDocker', 22),
('Figma', 'technologies', 'SiFigma', 23),
('SEO', 'technologies', 'SeoIcon', 24)
ON CONFLICT (name) DO UPDATE SET
  category = EXCLUDED.category,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

-- Verify the data was inserted
SELECT category, COUNT(*) as count 
FROM skills 
GROUP BY category
ORDER BY category;




