export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  statusLabel: string;
  isPrivateCommercial: boolean;
  description: string;
  architectureHighlight: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string; // Add your deployed URL here once German Exam AI is live!
  caseStudy?: {
    problem: string;
    architecture: string[];
    securityAndScale: string;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "german-exam-ai",
    title: "German Exam AI Assessment Platform",
    category: "Commercial EdTech SaaS",
    progress: 70,
    statusLabel: "Commercial Build — Deploying Soon",
    isPrivateCommercial: true,
    liveUrl: "", // Paste your live URL here in a few days (e.g. "https://german-exam.vercel.app")
    description:
      "A commercial language proficiency examination platform built in Next.js featuring timed modules, AI-driven evaluation workflows, and strict exam state persistence.",
    architectureHighlight:
      "Next.js App Router frontend with modular assessment state management and protected commercial API routes.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AI Evaluation", "MongoDB"],
    caseStudy: {
      problem:
        "Language learners preparing for standardized German exams lack realistic, timed mock environments that provide instant, structured AI grading on writing and comprehension modules.",
      architecture: [
        "Next.js App Router client with isolated exam-taking state and automatic recovery on connection drop.",
        "Protected backend API routes handling prompt orchestration and rubric-based AI scoring without exposing keys or logic to the client.",
        "Server-validated timers and structured JSON response parsing for deterministic score breakdowns.",
      ],
      securityAndScale:
        "Source code is maintained in a private commercial repository to protect proprietary grading rubrics, exam datasets, and anti-cheat validation logic.",
    },
  },
  {
    id: "kara-mol",
    title: "Kara-mol — 3D AI Digital Assistant",
    category: "3D Web & AI Engineering",
    progress: 65,
    statusLabel: "Active Build (v0.7)",
    isPrivateCommercial: true,
    description:
      "An interactive 3D digital companion with decoupled frontend and backend environments, real-time facial blendshape reactions, and conversational memory.",
    architectureHighlight:
      "Decoupled React Three Fiber canvas syncing real-time AI emotional states from a Node/Express backend.",
    techStack: ["React", "Three.js", "TypeScript", "Node.js", "Express", "ARKit Blendshapes"],
    caseStudy: {
      problem:
        "Standard web chatbots feel static and lifeless. Bridging LLM responses with real-time 3D character animation in the browser requires tight state synchronization without dropping below 60 FPS.",
      architecture: [
        "Dedicated frontend repository managing the Three.js / React Three Fiber scene graph and morph target interpolation.",
        "Separate Node.js & Express backend service processing conversational context and mapping sentiment tags to 3D ARKit blendshape weights.",
        "Smooth bone and morph-target lerp loops inside useFrame to ensure zero-stutter transitions.",
      ],
      securityAndScale:
        "Maintained in a multi-branch private architecture separating 3D asset pipelines from backend API credentials.",
    },
  },
  {
    id: "shopping-cart-engine",
    title: "Full-Stack Shopping Cart & Inventory System",
    category: "E-Commerce Architecture",
    progress: 80,
    statusLabel: "Public Repo — Core Complete",
    isPrivateCommercial: false,
    description:
      "A scalable e-commerce cart and product management system demonstrating clean state synchronization, dynamic pricing calculations, and responsive checkout flows.",
    architectureHighlight:
      "Optimized cart state mutations, persistent storage syncing, and modular MERN component structure.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript"],
    githubUrl: "https://github.com/favaz-am",
  },
];