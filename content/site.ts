/**
 * ALL site copy and links live in this file.
 * Edit text here; components only read from it.
 *
 * Anything marked [TODO] still needs real information from Steve.
 * A link set to `null` renders as a visible [TODO] placeholder on the page
 * instead of a broken link. Search this file for "TODO" to find them all.
 */

export type ContactLink = {
  label: string;
  /** Visible text, e.g. the email address or a short handle. */
  display: string;
  /** null = not filled in yet; shows a [TODO] placeholder on the page. */
  href: string | null;
};

export type Fact = { term: string; detail: string };

export type Project = {
  /** Used for /projects#slug anchors. */
  slug: string;
  title: string;
  /** One sentence for the home-page carousel. */
  short: string;
  /** Optional badge, e.g. "Founder". */
  role?: string;
  summary: string;
  /** One-line outcome, shown in bold. Leave empty if none. */
  outcome: string;
  tags: string[];
  /** Internal page or external URL. null = no write-up yet. */
  href: string | null;
  linkLabel: string;
};

export type ProofRow = {
  label: string;
  minutes: number;
  /** Text shown next to the bar, e.g. "about 7 min". */
  display: string;
  highlight: boolean;
};

export type CaseStudySection = {
  heading: string;
  /** Paragraphs. Use a string starting with "[TODO]" for missing detail. */
  body: string[];
};

export const site = {
  // [TODO] Set NEXT_PUBLIC_SITE_URL (e.g. https://steveteuma.com) in Vercel once you have your domain.
  // Until then, Vercel's production URL is used automatically.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3100")
  ).replace(/\/$/, ""),
  locale: "en_CA",
  copyrightYear: 2026,

  person: {
    name: "Steve Teuma",
    firstName: "Steve",
    pronouns: "he/him",
    role: "AI and Software Engineer",
    jobTitle: "AI and Software Engineer",
    location: "Toronto, Canada",
    city: "Toronto",
    country: "CA",
    education: {
      degree: "Master's degree in Artificial Intelligence and Computer Science",
      honours: "With Distinction",
      school: "University of Mons",
      schoolLocation: "Belgium",
    },
  },

  meta: {
    title: "Steve Teuma, AI and Software Engineer in Toronto",
    description:
      "Steve Teuma is an AI and software engineer in Toronto with a Master's in Artificial Intelligence and Computer Science (with Distinction) from the University of Mons and 3+ years in software engineering. He builds LLM, RAG and AI agent systems and the software around them.",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  // Page titles and descriptions for search engines and link previews.
  pages: {
    about: {
      title: "About",
      description:
        "About Steve Teuma: AI and software engineer in Toronto, Master's in AI and Computer Science with Distinction from the University of Mons, bilingual English and French.",
    },
    projects: {
      title: "Projects",
      description:
        "Projects by Steve Teuma: MBEYA, a real-time ASL to English converter, a professional matching system, agent workflows with MCP, and a restaurant voice assistant.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with Steve Teuma, AI and software engineer in Toronto.",
    },
  },

  home: {
    projectsHeading: "Things I've built",
    projectsLink: "See all projects",
    cta: {
      heading: "Want to build something together?",
      body: "I'm looking for AI and software engineering roles, and I'm always happy to talk.",
      contactLabel: "Get in touch",
      aboutLabel: "More about me",
    },
  },

  hero: {
    status: "Currently building AI products with GPT, Claude and Gemini",
    greeting: ["Hi, I'm", "Steve Teuma."],
    role: "AI and Software Engineer in Toronto",
    intro:
      "I'm a software engineer who specializes in AI. I build the models, the backends and the apps around them, so AI features hold up in production: LLMs, RAG, AI agents and real-time speech. I have a Master's in Artificial Intelligence and Computer Science from the University of Mons in Belgium, with Distinction, and more than three years of software engineering experience.",
    // Shorter intro used on the home page.
    short:
      "I'm a software engineer who specializes in AI. I build the models, the backends and the apps around them, so AI features hold up in the real world.",
    primaryCta: { label: "See my projects", href: "/projects" },
    secondaryCta: { label: "Get in touch", href: "/contact" },
    resumeLabel: "Download my resume",
    facts: [
      { term: "Based in", detail: "Toronto, Canada" },
      {
        term: "Education",
        detail:
          "Master's in AI and Computer Science with Distinction, University of Mons, Belgium",
      },
      { term: "Experience", detail: "3+ years in software engineering" },
      { term: "Languages", detail: "English and French" },
    ] satisfies Fact[],
    // Photo in /public. Set to null to show the placeholder instead.
    photo: "/steve.jpg" as string | null,
    photoAlt: "Portrait of Steve Teuma",
  },

  about: {
    heading: "About me",
    lead: "I'm a software engineer and an AI engineer. I like the moment an idea stops being a demo and becomes something people rely on every day.",
    paragraphs: [
      "I've spent more than three years in software engineering: backend APIs, web apps with React and Next.js, Python and TypeScript, and cloud deployment on Azure. That's what makes the AI work usable.",
      "On the AI side I work across generative AI, machine learning, deep learning, NLP and computer vision. Most of my time goes into LLMs, RAG, AI agents, prompt engineering and real-time AI systems.",
      "Right now I build AI products on GPT, Claude and Gemini, including a system that matches professionals and agent workflows that use tools and MCP. I'm also the founder of MBEYA, a bilingual app that helps people find their cultural community across Canada.",
      "I earned my Master's with Distinction. It gave me a strong base in algorithms, data structures, machine learning and software engineering, which is what I lean on when a problem gets complicated. Those are the problems I enjoy most.",
    ],
    educationLabel: "Education",
  },

  projects: {
    heading: "Projects",
    intro: "A few things I've built.",
    items: [
      {
        slug: "mbeya",
        title: "MBEYA",
        short: "A bilingual app that helps people find their cultural community across Canada.",
        role: "Founder",
        summary:
          "A bilingual (English and French) app that helps people find their cultural community anywhere in Canada. It brings together local businesses, events, housing and jobs, so it's easy to find a restaurant from home, a community event, or a business that serves your community.",
        outcome: "",
        tags: ["Next.js", "TypeScript", "Tailwind", "FastAPI", "PostgreSQL", "Auth0", "Cloudinary", "Vercel", "Railway"],
        href: "https://mbeya.ca",
        linkLabel: "Visit mbeya.ca",
      },
      {
        slug: "asl-converter",
        title: "Real-time ASL to English converter",
        short: "Turns sign language letters into text in real time, on a regular laptop CPU.",
        summary:
          "Turns American Sign Language letters into text in real time. MediaPipe tracks 21 hand joints, which become a 63-value feature vector for a small MLP classifier. Careful feature engineering instead of heavy deep learning models, so it runs on a regular laptop CPU and could run on edge devices. Next: word-level recognition, phrase prediction with language models, and mobile optimization.",
        outcome: "95% validation accuracy, under 50 ms per prediction on CPU, model under 3 MB.",
        tags: ["Computer vision", "MediaPipe", "MLP", "Feature engineering", "Edge ML"],
        href: "https://lnkd.in/p/ggYyQ5Br",
        linkLabel: "See the LinkedIn post",
      },
      {
        slug: "matching-system",
        title: "Professional matching system",
        short: "An AI product that matches professionals, built on GPT, Claude and Gemini.",
        summary:
          "An AI product that matches professionals, built on GPT, Claude and Gemini.",
        outcome: "",
        tags: ["GPT", "Claude", "Gemini", "LLMs"],
        // [TODO] Add a link if you write this up.
        href: null,
        linkLabel: "Read more",
      },
      {
        slug: "agent-workflows",
        title: "Agent workflows with tools and MCP",
        short: "Workflows where AI agents use tools and connect to systems through MCP.",
        summary:
          "Agent-based workflows where models call tools and connect to systems through MCP.",
        outcome: "",
        tags: ["AI agents", "MCP", "Tool use"],
        // [TODO] Add a link if you write this up.
        href: null,
        linkLabel: "Read more",
      },
      {
        slug: "voice-assistant",
        title: "Voice assistant for restaurant orders",
        short: "A voice assistant that takes restaurant orders, live in production.",
        summary:
          "A GPT-powered voice assistant that takes restaurant orders, using LLMs, RAG, real-time speech processing and backend integrations. Live in production.",
        outcome: "Orders went from about 7 minutes to 3.",
        tags: ["GPT", "RAG", "Speech AI", "Backend APIs"],
        href: "/projects/voice-assistant",
        linkLabel: "Read the case study",
      },
      // [TODO] Add more projects here using the same shape.
    ] as Project[],
  },

  // Used only on the voice-assistant case study page.
  proof: {
    caption: "Time to process one restaurant order, in minutes",
    rows: [
      { label: "Before", minutes: 7, display: "about 7 min", highlight: false },
      {
        label: "With the voice assistant",
        minutes: 3,
        display: "about 3 min",
        highlight: true,
      },
      {
        label: "Repeat or structured orders",
        minutes: 1,
        display: "about 1 min",
        highlight: true,
      },
    ] satisfies ProofRow[],
  },

  caseStudy: {
    title: "Voice assistant for restaurant orders",
    metaDescription:
      "Case study: a GPT-powered voice assistant for restaurant orders, built with LLMs, RAG and real-time speech. Order time went from about 7 minutes to 3.",
    lede: "A GPT-powered voice assistant that takes restaurant orders, live in production. It cut order time from about 7 minutes to 3, and to about 1 minute for repeat or structured orders.",
    role: "[TODO] Your role, e.g. sole engineer or lead engineer, and team size",
    timeframe: "[TODO] When you built it and how long it took",
    sections: [
      {
        heading: "Problem",
        body: [
          "Processing a single restaurant order took about 7 minutes.",
          "[TODO] Who the restaurant or client was (or a general description), how orders came in before, and what made them slow.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "I built a voice assistant powered by GPT. Real-time speech processing turns what the customer says into text the model can work with. An LLM interprets the order, and RAG grounds its answers in the restaurant's own data. Backend integrations pass the finished order on to the rest of the system.",
          "[TODO] Which data RAG retrieves from (for example the menu), which backend systems you integrated with, and how you handled mistakes or unclear requests.",
        ],
      },
      {
        heading: "Stack",
        body: [
          "GPT (LLM), retrieval-augmented generation (RAG), real-time speech processing, backend API integrations.",
          "[TODO] Confirm languages, cloud and hosting (for example Python, Azure) and the speech services you used.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The assistant is live in production. A typical order now takes about 3 minutes instead of about 7. Repeat or structured orders take about 1 minute.",
          "[TODO] Any other results you can share, such as volume handled or accuracy.",
        ],
      },
      {
        heading: "What I would do next",
        body: ["[TODO] Your own next steps for the system."],
      },
    ] satisfies CaseStudySection[],
  },

  skills: {
    heading: "Skills",
    intro: "What I work with, built up over more than three years.",
    groups: [
      {
        name: "AI",
        description: "Models and methods",
        items: [
          "LLMs (GPT, Claude, Gemini)",
          "RAG",
          "AI agents",
          "MCP",
          "Prompt engineering",
          "NLP",
          "Computer vision",
          "Speech AI",
          "Machine learning",
          "Deep learning",
          "MediaPipe",
        ],
      },
      {
        name: "Software",
        description: "Languages, frameworks and fundamentals",
        items: [
          "Python",
          "Java",
          "Spring Boot",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "FastAPI",
          "Backend APIs",
          "PostgreSQL",
          "Auth0",
          "Algorithms and data structures",
        ],
      },
      {
        name: "Ship",
        description: "Getting it to production",
        items: [
          "Azure",
          "Vercel",
          "Railway",
          "Cloud deployment",
          "Real-time AI systems",
          "Production systems",
        ],
      },
    ],
  },

  more: {
    heading: "More about me",
    lead: "I'm curious. I enjoy understanding how things work, all the way down.",
    items: [
      {
        title: "Electronics",
        body: "I like electronics and taking things apart to see how the hardware works, not just the software on top.",
      },
      {
        title: "Algorithms",
        body: "I solve LeetCode problems from time to time. It keeps my algorithms sharp, and I enjoy a good puzzle.",
      },
      {
        title: "Teaching",
        body: "I sometimes give private lessons. I like sharing knowledge as much as I like learning it.",
      },
      {
        title: "Bilingual",
        body: "I speak and work in English and French.",
      },
    ],
    photo: "/steve-teuma-2.png",
    photoAlt: "Steve Teuma smiling in a classroom in front of a chalkboard",
  },

  contact: {
    heading: "Let's talk",
    body: "I'm looking for AI and software engineering roles. Email is the fastest way to reach me.",
    // Your email is never written on the page. It is sent to the browser encoded and only
    // decoded when a visitor picks an option (Gmail, Outlook, email app, or copy).
    email: {
      label: "Email",
      address: "teumayouomo113@gmail.com",
      buttonLabel: "Send me an email",
      options: {
        gmail: "Write in Gmail",
        outlook: "Write in Outlook",
        app: "Open my email app",
        copy: "Copy email address",
        copied: "Email address copied",
      },
    },
    links: [
      {
        label: "LinkedIn",
        display: "linkedin",
        href: "https://www.linkedin.com/in/steve-teuma-468026258/",
      },
      {
        label: "GitHub",
        display: "github",
        href: "https://github.com/3npC0nf1g",
      },
    ] as ContactLink[],
    // Resume PDF in /public. The download buttons (header, hero, contact) only appear if the file exists.
    resume: {
      label: "Download resume (PDF)",
      href: "/steve-teuma-resume.pdf",
      downloadName: "Steve-Teuma-Resume.pdf",
    },
  },

  // Small interface text (buttons, labels, screen-reader hints).
  ui: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    menu: "Menu",
    close: "Close",
    resume: "Resume",
    pdfDownload: "(PDF download)",
    pdf: "(PDF)",
    newTab: "(opens in a new tab)",
    language: { switchTo: "FR", switchToName: "Lire en français" },
    carousel: { label: "Projects", previous: "Previous", next: "Next", scroll: "scroll horizontally" },
    technologies: "Technologies",
    skillsSuffix: "skills",
    addLinkTodo: "[TODO] Add a link or write-up",
    about: { story: "My story", seeProjects: "See my projects", getInTouch: "Get in touch" },
    contact: {
      emailBlurb: "The fastest way to reach me.",
      resumeTitle: "Resume",
      resumeBlurb: "Everything in one page.",
      basedIn: "Based in",
      languages: "English and French",
      emailMenu: "Ways to email me",
    },
    caseStudy: {
      back: "Back to all projects",
      label: "Case study",
      role: "Role",
      when: "When",
      status: "Status",
      live: "Live in production",
      glance: "Result at a glance",
      ctaHeading: "Want to build something like this?",
      contact: "Get in touch",
      allProjects: "See all projects",
    },
    notFound: {
      title: "Page not found",
      body: "This page doesn't exist, or it moved.",
      home: "Go to the home page",
    },
  },
};

export type Site = typeof site;
