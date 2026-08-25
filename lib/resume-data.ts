export interface Experience {
  period: string
  company: string
  companySub?: string
  position: string
  location: string
  highlights?: string[]
}

export interface Education {
  period: string
  institution: string
  degree: string
  location: string
}

export interface Skill {
  name: string
  categories: string[]
  icon_name: string | null
}

export interface Language {
  name: string
  level: string
}

export const profile = {
  name: "Diar Hyseni",
  title: "Full-Stack Developer",
  email: "diarhyseni4@gmail.com",
  phone: "+38344910403",
  city: "Mitrovica, Kosovo",
  linkedIn: "https://www.linkedin.com/in/diarhyseni",
  dateOfBirth: "31/01/2000",
  portfolioUrl: "https://diarhyseni.vercel.app",
}

export const experiences: Experience[] = [
  {
    period: "Jun / 2024 – Current",
    company: "INSTABUILT L.L.C.",
    position: "Full-Stack & CRM Developer",
    location: "Prishtina (Kosovo)",
    highlights: [
      "Design and develop scalable full-stack applications and digital platforms using Next.js, React, Node.js, PHP, PostgreSQL, Supabase, MongoDB, and Prisma, owning the full development lifecycle from system design and development to deployment, debugging, performance optimization, SEO, and production maintenance across 16+ websites and platforms.",
      "Design and implement API-driven integrations and automation connecting websites, CRMs, databases, payment systems, and third-party services to streamline data synchronization, lead management, and business workflows.",
      "Integrate AI-powered solutions and intelligent automation into web applications and business processes, improving data processing, content workflows, lead management, and operational efficiency.",
      "HubSpot Administrator and Integration — configure CRM workflows, manage portals, and build API integrations between HubSpot and internal systems for lead management and marketing automation.",
    ],
  },
  {
    period: "Jan / 2023 – May / 2024",
    company: "IT VISION",
    companySub: "branch of Prishtina REA",
    position: "React Developer",
    location: "Prishtina (Kosovo)",
    highlights: [
      "Contributed to the EU4Innovation e-ID for Kosovo project, collaborating with partner companies from Spain and Italy to develop a secure digital identity solution, focusing on web infrastructure and user experience.",
      "Worked on the \"Tourism for Future\" project, building a grant application system and implementing tools for automatic evaluation and reporting.",
    ],
  },
  {
    period: "Apr 2022 / Oct 2022",
    company: "Terabit Engineering Solutions",
    position: "Software Developer",
    location: "Prishtina (Kosovo)",
  },
  {
    period: "Jan / 2022 – Apr / 2022",
    company: "Star Labs L.L.C. (Internship)",
    position: "ASP .NET Developer",
    location: "Prishtina (Kosovo)",
  },
]

export const educations: Education[] = [
  {
    period: "2018 - 2022",
    institution: "Computer Science & Engineering",
    degree: "Bachelor Degree",
    location: "Prishtina (Kosovo)",
  },
  {
    period: "Sep / 2020 – Jan / 2021",
    institution: "ICT-Kosovo - Semester I",
    degree: "Web Development Course (HTML, CSS, JavaScript)",
    location: "Mitrovica (Kosovo)",
  },
  {
    period: "Mar / 2024",
    institution: "The Ultimate React Course",
    degree: "Udemy",
    location: "Online",
  },
  {
    period: "May / 2023",
    institution: "The Complete JavaScript Course",
    degree: "Udemy",
    location: "Online",
  },
]

export const portfolioSkills: Skill[] = [
  { name: "HTML 5", icon_name: "SiHtml5", categories: ["frontend"] },
  { name: "CSS 3", icon_name: "SiCss3", categories: ["frontend"] },
  { name: "JavaScript", icon_name: "SiJavascript", categories: ["frontend"] },
  { name: "TypeScript", icon_name: "SiTypescript", categories: ["frontend"] },
  { name: "React", icon_name: "SiReact", categories: ["frontend"] },
  { name: "Next.js", icon_name: "SiNextdotjs", categories: ["frontend"] },
  { name: "Vuejs", icon_name: "SiVuedotjs", categories: ["frontend"] },
  { name: "Tailwind", icon_name: "SiTailwindcss", categories: ["frontend"] },
  { name: "Node.js", icon_name: "SiNodedotjs", categories: ["backend"] },
  { name: "Express", icon_name: "SiExpress", categories: ["backend"] },
  { name: "Java", icon_name: "JavaIcon", categories: ["backend"] },
  { name: "PHP", icon_name: "SiPhp", categories: ["backend"] },
  { name: "Asp .NET", icon_name: "SiDotnet", categories: ["backend"] },
  { name: "MongoDB", icon_name: "SiMongodb", categories: ["technologies"] },
  { name: "PostgreSQL", icon_name: "SiPostgresql", categories: ["technologies"] },
  { name: "MySQL", icon_name: "SiMysql", categories: ["technologies"] },
  { name: "Redis", icon_name: "SiRedis", categories: ["technologies"] },
  { name: "WordPress", icon_name: "SiWordpress", categories: ["technologies"] },
  { name: "Shopify", icon_name: "SiShopify", categories: ["technologies"] },
  { name: "Supabase", icon_name: "SiSupabase", categories: ["technologies"] },
  { name: "Git", icon_name: "SiGit", categories: ["technologies"] },
  { name: "Docker", icon_name: "SiDocker", categories: ["technologies"] },
  { name: "Figma", icon_name: "SiFigma", categories: ["technologies"] },
  { name: "SEO", icon_name: "SeoIcon", categories: ["technologies"] },
]

export const skills: Skill[] = [
  { name: "Next.js", icon_name: "SiNextdotjs", categories: ["frontend"] },
  { name: "React", icon_name: "SiReact", categories: ["frontend"] },
  { name: "TypeScript", icon_name: "SiTypescript", categories: ["frontend"] },
  { name: "Vuejs", icon_name: "SiVuedotjs", categories: ["frontend"] },
  { name: "Tailwind", icon_name: "SiTailwindcss", categories: ["frontend"] },
  { name: "HTML 5", icon_name: "SiHtml5", categories: ["frontend"] },
  { name: "CSS 3", icon_name: "SiCss3", categories: ["frontend"] },
  { name: "JavaScript", icon_name: "SiJavascript", categories: ["frontend"] },
  { name: "Node.js", icon_name: "SiNodedotjs", categories: ["backend"] },
  { name: "Express", icon_name: "SiExpress", categories: ["backend"] },
  { name: "Java", icon_name: "JavaIcon", categories: ["backend"] },
  { name: "PHP", icon_name: "SiPhp", categories: ["backend"] },
  { name: "Asp .NET", icon_name: "SiDotnet", categories: ["backend"] },
  { name: "PostgreSQL", icon_name: "SiPostgresql", categories: ["technologies"] },
  { name: "MongoDB", icon_name: "SiMongodb", categories: ["technologies"] },
  { name: "MySQL", icon_name: "SiMysql", categories: ["technologies"] },
  { name: "Redis", icon_name: "SiRedis", categories: ["technologies"] },
  { name: "WordPress", icon_name: "SiWordpress", categories: ["technologies"] },
  { name: "Shopify", icon_name: "SiShopify", categories: ["technologies"] },
  { name: "HubSpot", icon_name: "SiHubspot", categories: ["technologies"] },
  { name: "Supabase", icon_name: "SiSupabase", categories: ["technologies"] },
  { name: "Git", icon_name: "SiGit", categories: ["technologies"] },
  { name: "Docker", icon_name: "SiDocker", categories: ["technologies"] },
  { name: "Hosting", icon_name: "HostingIcon", categories: ["technologies"] },
  { name: "Figma", icon_name: "SiFigma", categories: ["technologies"] },
  { name: "SEO", icon_name: "SeoIcon", categories: ["technologies"] },
  { name: "Vapi", icon_name: "VapiIcon", categories: ["technologies"] },
  { name: "n8n", icon_name: "SiN8N", categories: ["technologies"] },
  { name: "OpenClaw", icon_name: "OpenClawIcon", categories: ["technologies"] },
]

export const languages: Language[] = [
  { name: "Albanian", level: "Native" },
  { name: "English", level: "Proficient" },
  { name: "Turkish", level: "Intermediate" },
]

export const skillCategoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  technologies: "Technologies",
} as const

export function getSkillsByCategory(category: keyof typeof skillCategoryLabels) {
  return skills.filter((skill) => skill.categories.includes(category))
}
