export interface Project {
  id: string
  title: string
  description: string
  short_description?: string
  gallery: string[]
  technologies: string[]
  year: string
  github_url?: string | null
  live_url?: string | null
}

export const projects: Project[] = [
  {
    id: "a1b2c3d4-e5f6-4789-a012-3456789abc03",
    title: "World Link Towers — Premium Office Destination in Prishtina",
    description:
      "A landmark commercial real estate website for World Link Towers, presenting Alpha and Omega towers, interiors, location advantages, and lead-generation flows for office ownership and investment interest.",
    short_description:
      "Landmark commercial website for World Link Towers featuring Alpha & Omega towers, interiors, and investment/office inquiry flows.",
    gallery: [
      "/projects/world-link-towers/wlt_1.png",
      "/projects/world-link-towers/wlt_2.png",
      "/projects/world-link-towers/wlt_3.png",
      "/projects/world-link-towers/wlt_4.png",
      "/projects/world-link-towers/wlt_5.png",
      "/projects/world-link-towers/wlt_6.png",
      "/projects/world-link-towers/wlt_7.png",
    ],
    technologies: ["SiNextdotjs", "SiTailwindcss"],
    year: "2026",
    github_url: null,
    live_url: "https://www.worldlinktowers.com/",
  },
  {
    id: "a1b2c3d4-e5f6-4789-a012-3456789abc01",
    title: "InstaBuilt — Modular & Offsite Construction Platform",
    description:
      "A modern marketing and product website for InstaBuilt, presenting POP UP modular homes, multistory housing solutions, and offsite construction systems across the EU and U.S., with clear CTAs for reservations and custom projects.",
    short_description:
      "Modern website for InstaBuilt showcasing POP UP modular homes, multistory solutions, and offsite construction systems across the EU and U.S.",
    gallery: [
      "/projects/instabuilt/Instabuilt_1.png",
      "/projects/instabuilt/Instabuilt_2.png",
      "/projects/instabuilt/Instabuilt_3.png",
      "/projects/instabuilt/Instabuilt_4.png",
      "/projects/instabuilt/Instabuilt_5.png",
      "/projects/instabuilt/Instabuilt_6.png",
    ],
    technologies: ["SiNextdotjs", "SiTailwindcss"],
    year: "2026",
    github_url: null,
    live_url: "https://instabuilt.com/",
  },
  {
    id: "a1b2c3d4-e5f6-4789-a012-3456789abc02",
    title: "Insta Business Park — Industrial & Office Campus Website",
    description:
      "A premium website for Insta Business Park highlighting production facilities, the Innovation Center, Demo Park modular units, and partnership opportunities for industrial and office tenants.",
    short_description:
      "Premium website for Insta Business Park covering production space, Innovation Center, Demo Park, and partnership opportunities.",
    gallery: [
      "/projects/insta-business-park/ibp_1.png",
      "/projects/insta-business-park/ibp_2.png",
      "/projects/insta-business-park/ibp_3.png",
      "/projects/insta-business-park/ibp_4.png",
      "/projects/insta-business-park/ibp_5.png",
      "/projects/insta-business-park/ibp_6.png",
      "/projects/insta-business-park/ibp_7.png",
    ],
    technologies: ["SiNextdotjs", "SiTailwindcss"],
    year: "2026",
    github_url: null,
    live_url: "https://www.instabusinesspark.com/",
  },
  {
    id: "e411f4a8-9903-4166-ada5-1826c37e8265",
    title: "Terminiyt.com - Self-Service Booking & Nearby Providers",
    description:
      "Terminiyt.com is an online platform for booking appointments in Kosovo. It offers businesses a self-managed panel to organize their services, while users can easily find and book providers nearby using an interactive map categorized by service and location.",
    short_description:
      "Terminiyt.com makes scheduling simple—find and book local services in Kosovo, manage your business online, and explore providers nearby with an interactive, location-based map.",
    gallery: [
      "/projects/terminiyt/terminiyt_1.jpg",
      "/projects/terminiyt/terminiyt_2.jpg",
      "/projects/terminiyt/terminiyt_3.jpg",
      "/projects/terminiyt/terminiyt_4.jpg",
      "/projects/terminiyt/terminiyt_5.jpg",
      "/projects/terminiyt/terminiyt_6.jpg",
      "/projects/terminiyt/terminiyt_7.jpg",
      "/projects/terminiyt/terminiyt_8.jpg",
    ],
    technologies: ["SiNextdotjs", "SiTailwindcss", "SiSupabase"],
    year: "2026",
    github_url: null,
    live_url: "https://terminiyt.com/",
  },
  {
    id: "6b7ce765-92a3-4e24-9977-5f90db168e64",
    title: "Real Estate Platform – Property Listings for Sale & Rent",
    description:
      "Explore residential and commercial properties for sale or rent through a modern real estate platform designed to help you find the right property quickly and easily.",
    short_description:
      "Explore residential and commercial properties for sale or rent through a modern real estate platform designed to help you find the right property quic",
    gallery: [
      "/projects/real-estate-platform/real-estate-platform_1.png",
      "/projects/real-estate-platform/real-estate-platform_2.png",
      "/projects/real-estate-platform/real-estate-platform_3.png",
      "/projects/real-estate-platform/real-estate-platform_4.png",
      "/projects/real-estate-platform/real-estate-platform_5.png",
      "/projects/real-estate-platform/real-estate-platform_6.png",
      "/projects/real-estate-platform/real-estate-platform_7.png",
      "/projects/real-estate-platform/real-estate-platform_8.png",
      "/projects/real-estate-platform/real-estate-platform_9.png",
      "/projects/real-estate-platform/real-estate-platform_10.png",
      "/projects/real-estate-platform/real-estate-platform_11.png",
    ],
    technologies: ["SiNextdotjs", "SiTailwindcss", "SiSupabase"],
    year: "2026",
    github_url: null,
    live_url: null,
  },
  {
    id: "a1b2c3d4-e5f6-4789-a012-3456789abc05",
    title: "Cherry Plaza — Smart Residential Community Platform",
    description:
      "A bilingual residential platform for Cherry Plaza featuring multiple house types, community storytelling, and contact forms so prospective residents can explore layouts and request more information.",
    short_description:
      "Bilingual Cherry Plaza platform showcasing house types, community living, and inquiry forms for prospective residents.",
    gallery: [
      "/projects/cherry-plaza/plaza_1.png",
      "/projects/cherry-plaza/plaza_2.png",
      "/projects/cherry-plaza/plaza_3.png",
      "/projects/cherry-plaza/plaza_4.png",
      "/projects/cherry-plaza/plaza_6.png",
    ],
    technologies: ["SiReact", "SiTailwindcss"],
    year: "2025",
    github_url: null,
    live_url: "https://cherryofplaza.com/",
  },
  {
    id: "a1b2c3d4-e5f6-4789-a012-3456789abc04",
    title: "Cherry Village — Residential Community Website",
    description:
      "A bilingual residential community website for Cherry Village, showcasing house types, community lifestyle, and contact flows to help visitors explore and inquire about modern sustainable living in Prishtina.",
    short_description:
      "Bilingual Cherry Village website presenting house types, community living, and inquiry flows for modern residential homes.",
    gallery: [
      "/projects/cherry-village/village_1.png",
      "/projects/cherry-village/village_2.png",
      "/projects/cherry-village/village_3.png",
      "/projects/cherry-village/village_4.png",
      "/projects/cherry-village/village_5.png",
    ],
    technologies: ["SiReact", "SiTailwindcss"],
    year: "2025",
    github_url: null,
    live_url: "https://qershiavillage.com/",
  },
  {
    id: "546c4119-c7d3-4390-9d94-110a30bdc96c",
    title: "Grant Management and Review Platform",
    description:
      "Grant Management and Automatic Review Platform is a centralized digital solution designed to streamline the entire grant lifecycle, from application submission to final decision. It automates eligibility checks, scoring, and document reviews, reducing manual effort while ensuring consistency, transparency, and compliance.",
    short_description:
      "A smart digital platform that simplifies grant management by automating application reviews, eligibility checks, and scoring for faster, transparent, and data-driven funding decisions.",
    gallery: [
      "/projects/grant-management/grant-management_1.png",
      "/projects/grant-management/grant-management_2.png",
      "/projects/grant-management/grant-management_3.png",
      "/projects/grant-management/grant-management_4.png",
      "/projects/grant-management/grant-management_5.png",
      "/projects/grant-management/grant-management_6.png",
      "/projects/grant-management/grant-management_7.png",
      "/projects/grant-management/grant-management_8.png",
      "/projects/grant-management/grant-management_9.png",
      "/projects/grant-management/grant-management_10.png",
      "/projects/grant-management/grant-management_11.png",
      "/projects/grant-management/grant-management_12.png",
      "/projects/grant-management/grant-management_13.png",
      "/projects/grant-management/grant-management_14.png",
      "/projects/grant-management/grant-management_15.png",
    ],
    technologies: ["SiPhp", "SiReact", "SiTailwindcss"],
    year: "2025",
    github_url: "https://github.com/diarhyseni",
    live_url: "http://www.tourismforfuture.com/",
  },
  {
    id: "19721e01-c6dc-43e1-a855-e8d1a402733f",
    title: "Identity Card Management System",
    description:
      "A secure eID platform that enables the Registration Authority in Kosovo to register, verify, and manage electronic identities, supporting trusted digital services and secure online transactions.",
    short_description:
      "A secure eID platform that enables the Registration Authority in Kosovo to register, verify, and manage electronic identities, supporting trusted digital services and secure online transactions.",
    gallery: [
      "/projects/identity-card-management/identity-card-management_1.jpg",
      "/projects/identity-card-management/identity-card-management_2.png",
      "/projects/identity-card-management/identity-card-management_3.png",
      "/projects/identity-card-management/identity-card-management_4.png",
      "/projects/identity-card-management/identity-card-management_5.png",
      "/projects/identity-card-management/identity-card-management_6.png",
      "/projects/identity-card-management/identity-card-management_7.png",
      "/projects/identity-card-management/identity-card-management_8.png",
      "/projects/identity-card-management/identity-card-management_9.png",
      "/projects/identity-card-management/identity-card-management_10.png",
      "/projects/identity-card-management/identity-card-management_11.png",
      "/projects/identity-card-management/identity-card-management_12.png",
      "/projects/identity-card-management/identity-card-management_13.png",
    ],
    technologies: ["SiNodedotjs", "SiTailwindcss", "SiReact", "SiPhp"],
    year: "2024",
    github_url: null,
    live_url: null,
  },
  {
    id: "7939aa3f-f5b0-42d0-98b1-9ab6e91aba6b",
    title: "Electronic Identity Management Portal",
    description:
      "The eID Self-Service Portal gives users full control over their digital identity—allowing them to manage personal details, verify information, and access eID services anytime, securely and conveniently.",
    short_description:
      "The eID Self-Service Portal gives users full control over their digital identity—allowing them to manage personal details, verify information, and acc",
    gallery: [
      "/projects/electronic-identity-portal/electronic-identity-portal_1.jpg",
      "/projects/electronic-identity-portal/electronic-identity-portal_2.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_3.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_4.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_5.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_6.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_7.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_8.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_9.png",
      "/projects/electronic-identity-portal/electronic-identity-portal_10.png",
    ],
    technologies: ["SiNodedotjs", "SiPhp", "SiReact", "SiTailwindcss"],
    year: "2024",
    github_url: null,
    live_url: null,
  },
]
