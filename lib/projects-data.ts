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
    id: "323d48ac-bcf8-4cf2-bddf-0cb8212368b9",
    title: "VizuAI - AI-powered text to image platform",
    description:
      "VizuAi is an AI-powered platform that generates images based on text prompts. Users can purchase tokens through flexible plans and use them across the platform’s features. VizuAi also provides detailed reports for every function, ensuring full transparency and control.",
    short_description:
      "VizuAi is an AI-powered platform that generates images based on text prompts. Users can purchase tokens through flexible plans and use them across the",
    gallery: [
      "/projects/vizuai/vizuai_1.png",
      "/projects/vizuai/vizuai_2.png",
      "/projects/vizuai/vizuai_3.png",
      "/projects/vizuai/vizuai_4.png",
      "/projects/vizuai/vizuai_5.png",
      "/projects/vizuai/vizuai_6.png",
      "/projects/vizuai/vizuai_7.png",
      "/projects/vizuai/vizuai_8.png",
      "/projects/vizuai/vizuai_9.png",
      "/projects/vizuai/vizuai_10.png",
      "/projects/vizuai/vizuai_11.png",
      "/projects/vizuai/vizuai_12.png",
      "/projects/vizuai/vizuai_13.png",
    ],
    technologies: ["SiReact", "SiTailwindcss", "SiNodedotjs"],
    year: "2025",
    github_url: "https://github.com/diarhyseni",
    live_url: null,
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
    year: "2023",
    github_url: "https://github.com/diarhyseni",
    live_url: "http://www.tourismforfuture.com/",
  },
  {
    id: "567e4ed8-2734-494b-97e9-081e2bdfc56d",
    title: "Cherry Communities – Sustainable & Modern Residential Living Solutions",
    description:
      "Cherry Communities creates innovative, eco-friendly residential neighborhoods with modern infrastructure, efficient modular construction, and a focus on sustainability and community well-being across Europe and the USA.",
    short_description:
      "Cherry Communities creates innovative, eco-friendly residential neighborhoods with modern infrastructure, efficient modular construction, and a focus ",
    gallery: [
      "/projects/cherry-communities/cherry-communities_1.png",
      "/projects/cherry-communities/cherry-communities_2.png",
      "/projects/cherry-communities/cherry-communities_3.png",
      "/projects/cherry-communities/cherry-communities_4.png",
      "/projects/cherry-communities/cherry-communities_5.png",
      "/projects/cherry-communities/cherry-communities_6.png",
      "/projects/cherry-communities/cherry-communities_7.png",
      "/projects/cherry-communities/cherry-communities_8.png",
      "/projects/cherry-communities/cherry-communities_9.png",
      "/projects/cherry-communities/cherry-communities_10.png",
    ],
    technologies: ["SiWordpress", "SiJavascript", "SiPhp"],
    year: "2026",
    github_url: null,
    live_url: null,
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
    id: "e7bbcc59-0051-42f8-8a7a-4dd3c0b4e558",
    title: "Cherry of Plaza Smart Residential Reservation Platform",
    description:
      "Cherry of Plaza is a streamlined platform for reserving houses within a planned master community, allowing users to explore the masterplan, check availability, and secure homes easily through a simple and intuitive interface.",
    short_description:
      "Cherry of Plaza is a streamlined platform for reserving houses within a planned master community, allowing users to explore the masterplan, check avai",
    gallery: [
      "/projects/cherry-of-plaza/cherry-of-plaza_1.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_2.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_3.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_4.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_5.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_6.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_7.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_8.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_9.jpg",
      "/projects/cherry-of-plaza/cherry-of-plaza_10.jpg",
    ],
    technologies: ["SiNextdotjs", "SiPostgresql"],
    year: "2025",
    github_url: null,
    live_url: null,
  },
  {
    id: "33fc4119-3b5a-4392-8555-2948d97c1cd3",
    title: "Pllana Towers — Luxury Real Estate Web Experience",
    description:
      "A custom website designed and developed to present Pllana Towers as a premium real estate project, emphasizing strong visuals, smooth interactions, and clear presentation of key project information.",
    short_description:
      "A custom website designed and developed to present Pllana Towers as a premium real estate project, emphasizing strong visuals, smooth interactions, an",
    gallery: [
      "/projects/pllana-towers/pllana-towers_1.jpg",
      "/projects/pllana-towers/pllana-towers_2.jpg",
      "/projects/pllana-towers/pllana-towers_3.jpg",
      "/projects/pllana-towers/pllana-towers_4.jpg",
      "/projects/pllana-towers/pllana-towers_5.jpg",
      "/projects/pllana-towers/pllana-towers_6.jpg",
      "/projects/pllana-towers/pllana-towers_7.jpg",
      "/projects/pllana-towers/pllana-towers_8.jpg",
      "/projects/pllana-towers/pllana-towers_9.jpg",
      "/projects/pllana-towers/pllana-towers_10.jpg",
      "/projects/pllana-towers/pllana-towers_11.jpg",
      "/projects/pllana-towers/pllana-towers_12.jpg",
    ],
    technologies: ["SiWordpress", "SiJavascript", "SiPhp"],
    year: "2025",
    github_url: null,
    live_url: null,
  },
]
