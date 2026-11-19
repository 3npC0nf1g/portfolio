/**
 * French version of the site content (shown at /fr/...).
 *
 * Same shape as content/site.ts: the `Site` type makes the build fail if a field
 * is missing here. Shared values (photos, links, email, resume, technology names)
 * are reused from the English file with `...site.x`, so you only edit them once.
 * Text marked [TODO] is left in English on purpose: it's a note for Steve.
 */
import { site, type Project, type Site } from "./site";

const projectsEn = Object.fromEntries(site.projects.items.map((p) => [p.slug, p])) as Record<string, Project>;

export const siteFr: Site = {
  ...site,
  locale: "fr_CA",

  person: {
    ...site.person,
    pronouns: "il/lui",
    role: "Ingénieur IA et logiciel",
    jobTitle: "Ingénieur IA et logiciel",
    location: "Toronto, Canada",
    education: {
      degree: "Master en intelligence artificielle et informatique",
      honours: "Avec distinction",
      school: "Université de Mons",
      schoolLocation: "Belgique",
    },
  },

  meta: {
    title: "Steve Teuma, ingénieur IA et logiciel à Toronto",
    description:
      "Steve Teuma est ingénieur IA et logiciel à Toronto. Titulaire d'un master en intelligence artificielle et informatique (avec distinction) de l'Université de Mons, il a plus de 3 ans d'expérience en génie logiciel. Il conçoit des systèmes LLM, RAG et d'agents IA, et les logiciels qui les entourent.",
  },

  nav: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  pages: {
    about: {
      title: "À propos",
      description:
        "À propos de Steve Teuma : ingénieur IA et logiciel à Toronto, master en IA et informatique avec distinction de l'Université de Mons, bilingue anglais et français.",
    },
    projects: {
      title: "Projets",
      description:
        "Projets de Steve Teuma : MBEYA, un convertisseur ASL vers anglais en temps réel, un système de jumelage de professionnels, des workflows d'agents avec MCP et un assistant vocal pour restaurants.",
    },
    contact: {
      title: "Contact",
      description: "Contactez Steve Teuma, ingénieur IA et logiciel à Toronto.",
    },
  },

  home: {
    projectsHeading: "Ce que j'ai construit",
    projectsLink: "Voir tous les projets",
    cta: {
      heading: "On construit quelque chose ensemble ?",
      body: "Je cherche un poste en ingénierie IA ou logicielle, et je suis toujours partant pour discuter.",
      contactLabel: "Me contacter",
      aboutLabel: "En savoir plus sur moi",
    },
  },

  hero: {
    ...site.hero,
    status: "En ce moment, je crée des produits IA avec GPT, Claude et Gemini",
    greeting: ["Bonjour, je suis", "Steve Teuma."],
    role: "Ingénieur IA et logiciel à Toronto",
    intro:
      "Je suis ingénieur logiciel, spécialisé en IA. Je conçois les modèles, les backends et les applications qui les entourent, pour que les fonctionnalités d'IA tiennent la route en production : LLM, RAG, agents IA et parole en temps réel. Je suis titulaire d'un master en intelligence artificielle et informatique de l'Université de Mons, en Belgique, obtenu avec distinction, et j'ai plus de trois ans d'expérience en génie logiciel.",
    short:
      "Je suis ingénieur logiciel, spécialisé en IA. Je conçois les modèles, les backends et les applications qui les entourent, pour que l'IA fonctionne vraiment dans le monde réel.",
    primaryCta: { label: "Voir mes projets", href: "/projects" },
    secondaryCta: { label: "Me contacter", href: "/contact" },
    resumeLabel: "Télécharger mon CV",
    facts: [
      { term: "Basé à", detail: "Toronto, Canada" },
      { term: "Formation", detail: "Master en IA et informatique avec distinction, Université de Mons, Belgique" },
      { term: "Expérience", detail: "Plus de 3 ans en génie logiciel" },
      { term: "Langues", detail: "Anglais et français" },
    ],
    photoAlt: "Portrait de Steve Teuma",
  },

  about: {
    heading: "À propos",
    lead: "Je suis ingénieur logiciel et ingénieur IA. J'aime le moment où une idée cesse d'être une démo et devient quelque chose sur quoi les gens comptent chaque jour.",
    paragraphs: [
      "J'ai plus de trois ans d'expérience en génie logiciel : API backend, applications web avec React et Next.js, Python et TypeScript, et déploiement infonuagique sur Azure. C'est ce qui rend le travail en IA réellement utilisable.",
      "Côté IA, je travaille en IA générative, apprentissage automatique, apprentissage profond, traitement du langage naturel et vision par ordinateur. J'y consacre surtout mon temps aux LLM, au RAG, aux agents IA, à l'ingénierie de prompts et aux systèmes d'IA en temps réel.",
      "En ce moment, je crée des produits IA avec GPT, Claude et Gemini, dont un système de jumelage de professionnels et des workflows d'agents qui utilisent des outils et MCP. Je suis aussi le fondateur de MBEYA, une application bilingue qui aide les gens à trouver leur communauté culturelle partout au Canada.",
      "J'ai obtenu mon master avec distinction. Il m'a donné une base solide en algorithmique, structures de données, apprentissage automatique et génie logiciel, sur laquelle je m'appuie quand un problème se complique. Ce sont les problèmes que je préfère.",
    ],
    educationLabel: "Formation",
  },

  projects: {
    heading: "Projets",
    intro: "Quelques projets que j'ai construits.",
    items: [
      {
        ...projectsEn["mbeya"],
        short: "Une application bilingue qui aide les gens à trouver leur communauté culturelle partout au Canada.",
        role: "Fondateur",
        summary:
          "Une application bilingue (anglais et français) qui aide les gens à trouver leur communauté culturelle partout au Canada. Elle rassemble commerces locaux, événements, logements et emplois, pour trouver facilement un restaurant de chez soi, un événement communautaire ou un commerce au service de sa communauté.",
        linkLabel: "Visiter mbeya.ca",
      },
      {
        ...projectsEn["asl-converter"],
        title: "Convertisseur ASL vers anglais en temps réel",
        short: "Transforme les lettres de la langue des signes en texte, en temps réel, sur un simple processeur d'ordinateur portable.",
        summary:
          "Transforme les lettres de la langue des signes américaine (ASL) en texte en temps réel. MediaPipe suit 21 articulations de la main, qui deviennent un vecteur de 63 valeurs pour un petit classificateur MLP. Un travail soigné sur les caractéristiques plutôt que de lourds modèles d'apprentissage profond : il tourne sur un processeur d'ordinateur portable et pourrait tourner sur des appareils embarqués. Prochaines étapes : reconnaissance de mots, prédiction de phrases avec des modèles de langage et optimisation mobile.",
        outcome: "95 % de précision en validation, moins de 50 ms par prédiction sur CPU, modèle de moins de 3 Mo.",
        tags: ["Vision par ordinateur", "MediaPipe", "MLP", "Ingénierie des caractéristiques", "IA embarquée"],
        linkLabel: "Voir la publication LinkedIn",
      },
      {
        ...projectsEn["matching-system"],
        title: "Système de jumelage de professionnels",
        short: "Un produit IA qui met en relation des professionnels, construit avec GPT, Claude et Gemini.",
        summary: "Un produit IA qui met en relation des professionnels, construit avec GPT, Claude et Gemini.",
        linkLabel: "En savoir plus",
      },
      {
        ...projectsEn["agent-workflows"],
        title: "Workflows d'agents avec outils et MCP",
        short: "Des workflows où des agents IA utilisent des outils et se connectent à des systèmes via MCP.",
        summary: "Des workflows basés sur des agents, où les modèles appellent des outils et se connectent à des systèmes via MCP.",
        tags: ["Agents IA", "MCP", "Utilisation d'outils"],
        linkLabel: "En savoir plus",
      },
      {
        ...projectsEn["voice-assistant"],
        title: "Assistant vocal pour les commandes de restaurant",
        short: "Un assistant vocal qui prend les commandes de restaurant, en production.",
        summary:
          "Un assistant vocal propulsé par GPT qui prend les commandes de restaurant, grâce aux LLM, au RAG, au traitement de la parole en temps réel et à des intégrations backend. En production.",
        outcome: "Les commandes sont passées d'environ 7 minutes à 3.",
        tags: ["GPT", "RAG", "IA vocale", "API backend"],
        linkLabel: "Lire l'étude de cas",
      },
    ],
  },

  proof: {
    caption: "Temps de traitement d'une commande de restaurant, en minutes",
    rows: [
      { label: "Avant", minutes: 7, display: "environ 7 min", highlight: false },
      { label: "Avec l'assistant vocal", minutes: 3, display: "environ 3 min", highlight: true },
      { label: "Commandes répétées ou structurées", minutes: 1, display: "environ 1 min", highlight: true },
    ],
  },

  caseStudy: {
    ...site.caseStudy,
    title: "Assistant vocal pour les commandes de restaurant",
    metaDescription:
      "Étude de cas : un assistant vocal propulsé par GPT pour les commandes de restaurant, construit avec des LLM, du RAG et de la parole en temps réel. Le temps de commande est passé d'environ 7 minutes à 3.",
    lede: "Un assistant vocal propulsé par GPT qui prend les commandes de restaurant, en production. Il a réduit le temps de commande d'environ 7 minutes à 3, et à environ 1 minute pour les commandes répétées ou structurées.",
    sections: [
      {
        heading: "Le problème",
        body: ["Traiter une seule commande de restaurant prenait environ 7 minutes.", site.caseStudy.sections[0].body[1]],
      },
      {
        heading: "L'approche",
        body: [
          "J'ai construit un assistant vocal propulsé par GPT. Le traitement de la parole en temps réel transforme ce que dit le client en texte exploitable par le modèle. Un LLM interprète la commande, et le RAG ancre ses réponses dans les données du restaurant. Des intégrations backend transmettent ensuite la commande au reste du système.",
          site.caseStudy.sections[1].body[1],
        ],
      },
      {
        heading: "Technologies",
        body: [
          "GPT (LLM), génération augmentée par récupération (RAG), traitement de la parole en temps réel, intégrations d'API backend.",
          site.caseStudy.sections[2].body[1],
        ],
      },
      {
        heading: "Résultat",
        body: [
          "L'assistant est en production. Une commande typique prend maintenant environ 3 minutes au lieu d'environ 7. Les commandes répétées ou structurées prennent environ 1 minute.",
          site.caseStudy.sections[3].body[1],
        ],
      },
      {
        heading: "Ce que je ferais ensuite",
        body: site.caseStudy.sections[4].body,
      },
    ],
  },

  skills: {
    heading: "Compétences",
    intro: "Ce avec quoi je travaille, acquis sur plus de trois ans.",
    groups: [
      {
        name: "IA",
        description: "Modèles et méthodes",
        items: [
          "LLM (GPT, Claude, Gemini)",
          "RAG",
          "Agents IA",
          "MCP",
          "Ingénierie de prompts",
          "Traitement du langage naturel",
          "Vision par ordinateur",
          "IA vocale",
          "Apprentissage automatique",
          "Apprentissage profond",
          "MediaPipe",
        ],
      },
      {
        name: "Logiciel",
        description: "Langages, frameworks et fondamentaux",
        items: [
          "Python",
          "Java",
          "Spring Boot",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "FastAPI",
          "API backend",
          "PostgreSQL",
          "Auth0",
          "Algorithmique et structures de données",
        ],
      },
      {
        name: "Mise en production",
        description: "Du code au produit",
        items: ["Azure", "Vercel", "Railway", "Déploiement infonuagique", "Systèmes d'IA en temps réel", "Systèmes en production"],
      },
    ],
  },

  more: {
    ...site.more,
    heading: "Encore plus sur moi",
    lead: "Je suis curieux. J'aime comprendre comment les choses fonctionnent, jusqu'au bout.",
    items: [
      {
        title: "Électronique",
        body: "J'aime l'électronique et démonter les choses pour voir comment le matériel fonctionne, pas seulement le logiciel par-dessus.",
      },
      {
        title: "Algorithmique",
        body: "Je résous des problèmes LeetCode de temps en temps. Ça garde mon algorithmique affûtée, et j'aime les bons casse-têtes.",
      },
      {
        title: "Enseignement",
        body: "Je donne parfois des cours particuliers. J'aime autant partager mes connaissances qu'en acquérir.",
      },
      {
        title: "Bilingue",
        body: "Je parle et travaille en anglais et en français.",
      },
    ],
    photoAlt: "Steve Teuma souriant dans une salle de classe, devant un tableau noir",
  },

  contact: {
    ...site.contact,
    heading: "Discutons",
    body: "Je cherche un poste en ingénierie IA ou logicielle. Le courriel est le moyen le plus rapide de me joindre.",
    email: {
      ...site.contact.email,
      label: "Courriel",
      buttonLabel: "M'envoyer un courriel",
      options: {
        gmail: "Écrire avec Gmail",
        outlook: "Écrire avec Outlook",
        app: "Ouvrir mon application de courriel",
        copy: "Copier l'adresse courriel",
        copied: "Adresse courriel copiée",
      },
    },
    resume: { ...site.contact.resume, label: "Télécharger le CV (PDF)" },
  },

  ui: {
    skipToContent: "Aller au contenu",
    mainNav: "Principale",
    menu: "Menu",
    close: "Fermer",
    resume: "CV",
    pdfDownload: "(téléchargement PDF)",
    pdf: "(PDF)",
    newTab: "(s'ouvre dans un nouvel onglet)",
    language: { switchTo: "EN", switchToName: "Read in English" },
    carousel: { label: "Projets", previous: "Précédent", next: "Suivant", scroll: "défilement horizontal" },
    technologies: "Technologies",
    skillsSuffix: "compétences",
    addLinkTodo: site.ui.addLinkTodo,
    about: { story: "Mon parcours", seeProjects: "Voir mes projets", getInTouch: "Me contacter" },
    contact: {
      emailBlurb: "Le moyen le plus rapide de me joindre.",
      resumeTitle: "CV",
      resumeBlurb: "Tout sur une seule page.",
      basedIn: "Basé à",
      languages: "Anglais et français",
      emailMenu: "Façons de m'écrire",
    },
    caseStudy: {
      back: "Retour aux projets",
      label: "Étude de cas",
      role: "Rôle",
      when: "Quand",
      status: "Statut",
      live: "En production",
      glance: "Le résultat en un coup d'œil",
      ctaHeading: "Envie de construire quelque chose de semblable ?",
      contact: "Me contacter",
      allProjects: "Voir tous les projets",
    },
    notFound: {
      title: "Page introuvable",
      body: "Cette page n'existe pas, ou elle a été déplacée.",
      home: "Aller à l'accueil",
    },
  },
};
