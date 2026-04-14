export const profile = {
  name: "Tam Phan Minh",
  title: "Full-Stack Developer",
  email: "tamphan01001@gmail.com",
  phone: "0981692504",
  location: "Thang Binh, Quang Nam",
  summary:
    "Full-Stack Developer with 5+ years building production-grade web, mobile, and desktop applications. Experienced in leading teams, architecting scalable systems, and leveraging modern AI tooling to ship faster.",
};

export const skills = {
  Frontend: ["TypeScript", "JavaScript", "ReactJs", "NextJs", "VueJs", "Tailwind CSS"],
  Backend: ["NestJs", "NodeJs", "GraphQL", "PostgreSQL", "REST API"],
  Mobile: ["React Native", "Flutter"],
  DevOps: ["Docker", "AWS", "Cloudflare Workers", "Gitlab CI/CD", "Vercel", "Nginx"],
  "AI Tools": ["Agentic AI", "Claude Code", "Cursor", "Prompt Engineering"],
};

export const experiences = [
  {
    company: "SARTORO",
    location: "Remote",
    role: "Full-Stack Developer",
    period: "2024 - Present",
    current: true,
    highlights: [
      "Building Shopify apps (OMA, Factory App) for e-commerce merchants.",
      "Full-stack development with NextJs, NestJs, and Shopify APIs.",
      "Integrating Cloudflare Workers for edge-side logic and performance.",
      "Designing scalable backend systems with PostgreSQL and GraphQL.",
    ],
    tech: ["NextJs", "NestJs", "TypeScript", "Shopify", "Cloudflare Workers", "PostgreSQL"],
  },
  {
    company: "MK LIGNARIUS",
    location: "Jakarta",
    role: "Full-Stack Developer",
    period: "02/2023 – 2024",
    current: false,
    highlights: [
      "Built warehouse management system for bird's nest factory solo.",
      "Desktop app (Flutter), admin web (ReactJs), REST + GraphQL API (NestJs).",
      "Deployed to AWS Elastic Beanstalk with Docker + Gitlab CI/CD.",
      "Built e-commerce site with NextJs + Vercel.",
    ],
    tech: ["Flutter", "ReactJs", "NestJs", "GraphQL", "PostgreSQL", "AWS", "Docker"],
  },
  {
    company: "NOVA GROUP",
    location: "HCM",
    role: "Front-End Developer / Sub-Leader",
    period: "03/2021 – 12/2022",
    current: false,
    highlights: [
      "Sub-leader for 30-40 member team on NovaID super app (React Native).",
      "Built Aquacity real-estate app (Flutter + ReactJs).",
      "Code review, task assignment, and mentoring junior devs.",
    ],
    tech: ["ReactJs", "React Native", "Flutter"],
  },
  {
    company: "POLINASOFT",
    location: "HCM",
    role: "Website Developer / Leader",
    period: "10/2020 – 02/2021",
    current: false,
    highlights: [
      "Led 7-member team building government travel website.",
      "Full-stack with ReactJs + Laravel, managed CentOS server.",
    ],
    tech: ["ReactJs", "Laravel", "Bootstrap", "CentOS"],
  },
  {
    company: "FPT SOFTWARE",
    location: "HCM",
    role: "Fresher Front-End",
    period: "03/2020 – 07/2020",
    current: false,
    highlights: ["Trained in ReactJs and Angular."],
    tech: ["ReactJs", "Angular"],
  },
];

export const projects: {
  title: string;
  shortTitle: string;
  description: string;
  descriptionHtml?: string;
  highlights: string[];
  tech: string[];
  demo?: string;
  github?: string;
  appStore?: string;
  company: string;
  role: string;
  size?: string;
  aiCoded?: boolean;
  images: string[]; // placeholder paths — replace with real screenshots
}[] = [
  {
    title: "MK Lignarius – Warehouse System",
    shortTitle: "Warehouse",
    description:
      "Full warehouse management for bird's nest processing factory. Handles import/export, cost calculation, employee timekeeping and payroll.",
    highlights: [
      "Built desktop app using Flutter for factory floor usage.",
      "Admin web with ReactJs for management dashboard.",
      "REST + GraphQL API with NestJs and PostgreSQL.",
      "Deployed to AWS Elastic Beanstalk with Docker + Gitlab CI/CD.",
    ],
    tech: ["Flutter", "ReactJs", "NestJs", "GraphQL", "AWS", "Docker"],
    company: "MK Lignarius",
    role: "Solo Developer",
    size: "Solo",
    aiCoded: false,
    images: [],
  },
  {
    title: "GoSporta – Sports Court Booking Platform",
    shortTitle: "GoSporta",
    description:
      "Full-stack sports court booking platform with real-time availability, split payments, and WebSocket chat. Monorepo: NestJS + Rust backends, React admin, Next.js customer app — connected via gRPC.",
    highlights: [
      "NestJS (Fastify + GraphQL) + Rust (Axum) dual backend with gRPC.",
      "Next.js customer app with Mapbox, OAuth, Web Push, offline cache.",
      "React admin (30+ pages), Redis distributed locking, BullMQ jobs.",
    ],
    tech: ["NestJs", "Rust", "NextJs", "ReactJs", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "gRPC", "Docker"],
    demo: "/projects/gosporta-graph.html",
    company: "Personal",
    role: "Full-Stack Developer",
    size: "Solo",
    images: ["/projects/gosporta-graph.png"],
  },
  {
    title: "NovaID – Super App",
    shortTitle: "NovaID",
    description:
      "Super app for shopping (clothes, shoes), gym booking, restaurant reservation. Served thousands of users across Nova ecosystem.",
    highlights: [
      "Sub-led 30-40 member frontend team.",
      "Built core features in React Native mobile app.",
      "Developed web admin for data management.",
      "Code review, task assignment, and mentoring juniors.",
    ],
    tech: ["React Native", "ReactJs"],
    demo: "https://www.novajourney.com.vn/",
    appStore: "https://apps.apple.com/vn/app/nova-membership/id6740019783",
    company: "Nova Group",
    role: "Sub-Leader (FE)",
    size: "30-40 members",
    aiCoded: false,
    images: [],
  },
  {
    title: "AffLink.vn – Affiliate Link Tracker",
    shortTitle: "AffLink",
    description:
      "Centralized affiliate link management and analytics platform for Vietnamese e-commerce sellers (Shopee, TikTok Shop, Lazada).",
    descriptionHtml: `<p>Create short branded affiliate links, track clicks in real-time with sub-millisecond redirects, and analyze traffic sources, devices, and geographic data.</p>
<p>Features dynamic URL swapping, daily Telegram reports, Google Safe Browsing checks, and a tiered pricing model (Free / Pro / Business).</p>`,
    highlights: [
      "Next.js dashboard + Rust (Axum) backend for high-performance API.",
      "Cloudflare Workers edge redirects with KV cache for sub-1ms response.",
      "Real-time analytics: GeoIP, device detection, traffic source tracking.",
      "Daily automated Telegram reports and admin notifications.",
      "Blog CMS with Tiptap editor, MongoDB backing.",
    ],
    tech: ["NextJs", "Rust", "Cloudflare Workers", "PostgreSQL", "Redis", "MongoDB"],
    company: "Personal",
    role: "Full-Stack Developer",
    size: "Solo",
    images: [],
  },
  {
    title: "Golf Discovery – Golf Tourism Platform",
    shortTitle: "Golf Discovery",
    description:
      "Premium golf tourism platform for Vietnam. Users can discover courses, browse curated packages, and book golf vacations.",
    descriptionHtml: `<p>Full-stack golf tourism platform — public booking site + admin CMS for managing courses, packages, blog, gallery, testimonials, and FAQs.</p>
<p>Features luxury editorial design, advanced SEO (Open Graph, sitemaps, RSS), rich-text blog editing with Tiptap, and Cloudinary image optimization.</p>`,
    highlights: [
      "Built full Next.js 14 app with App Router and TypeScript.",
      "Admin CMS with Tiptap rich-text editor for blog content.",
      "Supabase for database + auth, Cloudinary for image optimization.",
      "SEO-optimized: metadata, sitemaps, RSS feed, Google Analytics.",
      "Deployed to Vercel with responsive luxury editorial design.",
    ],
    tech: ["NextJs", "TypeScript", "Supabase", "Tailwind CSS", "Tiptap", "Vercel"],
    demo: "https://www.golfdiscovery.vn/",
    company: "Freelance",
    role: "Full-Stack Developer",
    size: "Solo",
    images: [],
  },
  {
    title: "Sartoro Agent – AI Production Assistant",
    shortTitle: "Sartoro Agent",
    description:
      "Agentic AI assistant for Sartoro (bespoke suit manufacturer). Natural language chat interface for querying orders, tracking production, and analyzing measurements.",
    highlights: [
      "LLM intent classifier routing to specialized skills (OMA, Tasks, Browser).",
      "Vanna AI text-to-SQL for natural language database queries.",
      "pgvector RAG for domain-specific tailoring knowledge.",
      "Streaming SSE chat UI with charts, tables, and execution progress.",
    ],
    tech: ["Python", "FastAPI", "NextJs", "Vanna AI", "PostgreSQL", "pgvector", "OpenAI"],
    demo: "/projects/sagent-graph.html",
    company: "Sartoro",
    role: "AI Developer",
    size: "Solo",
    images: ["/projects/sagent-graph.png"],
  },
];

export const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];
