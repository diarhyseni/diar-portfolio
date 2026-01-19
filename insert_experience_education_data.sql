-- Insert Experience Data
INSERT INTO experience (period, company, position, location) VALUES
('Jun / 2024 – Current', 'INSTABUILT L.L.C.', 'Full-Stack & CRM Developer', 'Prishtina (Kosovo)'),
('Jan / 2023 – May / 2024', 'IT VISION', 'Front End Developer', 'Prishtina (Kosovo)'),
('Apr 2022 / Oct 2022', 'Terabit Engineering Solutions', 'Full-Stack Developer', 'Prishtina (Kosovo)'),
('Jan / 2022 – Apr / 2022', 'Star Labs L.L.C. (Internship)', 'ASP .NET Developer', 'Prishtina (Kosovo)')
ON CONFLICT DO NOTHING;

-- Insert Education Data
INSERT INTO education (period, institution, degree, location) VALUES
('2018 - 2022', 'Computer Science & Engineering', 'Bachelor Degree', 'Prishtina (Kosovo)'),
('Mar / 2024', 'The Ultimate React Course 2024', 'Udemy', 'Online'),
('May / 2023', 'The Complete JavaScript Course 2023', 'Udemy', 'Online'),
('Sep / 2020 – Jan / 2021', 'ICT-Kosovo - Semester I', 'Web Development Course (HTML, CSS, JS)', 'Mitrovica (Kosovo)')
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 'Experience' as type, COUNT(*) as count FROM experience
UNION ALL
SELECT 'Education' as type, COUNT(*) as count FROM education;




