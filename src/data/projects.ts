export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link: string;
}

export const PROJECTS: Project[] = [
  {
    id: "german-exam-ai",
    num: "01",
    title: "German Exam Ai",
    category: "AI / EdTech",
    tools: "Next.js, TypeScript, Node.js, AI / LLM, Tailwind CSS",
    description:
      "AI-powered platform helping German language learners practice Reading, Writing, Speaking, and B2 exam modules.",
    image: "/images/german-exam-ai.png",
    link: "https://github.com/ferasgit/German-Exam-Ai-",
  },
  {
    id: "kara-mol",
    num: "02",
    title: "Kara Mol",
    category: "AI / 3D Desktop",
    tools: "React, Three.js, React Three Fiber, Python, Pipecat AI",
    description:
      "Cross-platform 3D interactive AI desktop companion powered by React Three Fiber and a real-time Python Pipecat backend.",
    image: "/images/kara-mol.png",
    link: "https://github.com/favaz-am/Kara-mol",
  },
  {
    id: "shopping-cart",
    num: "03",
    title: "Ecommerce Shopping Cart",
    category: "Full-Stack / E-Commerce",
    tools: "React, Node.js, Express.js, MongoDB, Tailwind CSS",
    description:
      "Full-stack online storefront featuring product browsing, dynamic cart state management, and streamlined checkout flows.",
    image: "/images/shopping-cart.png",
    link: "https://github.com/favaz-am/Shopping-Cart",
  },
  {
    id: "memory-flip-card",
    num: "04",
    title: "Memory Flip Card",
    category: "Interactive Game",
    tools: "React, JavaScript, CSS3, HTML5",
    description:
      "Interactive card-matching game with smooth 3D flip logic—match pairs to keep them open and clear the entire board.",
    image: "/images/memory-flip-card.png",
    link: "https://github.com/favaz-am/Memory-Flip-Card",
  },
  {
    id: "todo-app",
    num: "05",
    title: "Todo App",
    category: "Productivity / Web App",
    tools: "React, JavaScript, CSS3, Local Storage",
    description:
      "Clean, responsive task manager for organizing daily goals with instant creation, completion tracking, and filtering.",
    image: "/images/todo-app.png",
    link: "https://github.com/favaz-am/TodoApp",
  },
  {
    id: "flip-clock",
    num: "06",
    title: "FlipClock",
    category: "Utility / Web App",
    tools: "HTML5, CSS3, JavaScript",
    description:
      "Aesthetic live and customizable flip clock featuring 24-hour toggles, fixed-time mode, keyboard shortcuts, and fullscreen display.",
    image: "/images/flip-clock.png",
    link: "https://github.com/favaz-am/FlipClock",
  },
  {
    id: "simple-calculator",
    num: "07",
    title: "Simple Calculator",
    category: "Utility / Web App",
    tools: "HTML5, CSS3, JavaScript",
    description:
      "Lightweight, responsive web calculator built for fast, reliable everyday arithmetic with a clean button interface.",
    image: "/images/simple-calculator.png",
    link: "https://favaz-am.github.io/Simple-Calculator/",
  },
  {
    id: "java-calculator",
    num: "08",
    title: "Calculator in Java",
    category: "Core Java / Desktop",
    tools: "Java, OOP",
    description:
      "Core Java calculator application implementing structured arithmetic operations and clean object-oriented logic.",
    image: "/images/java-calculator.png",
    link: "https://github.com/favaz-am/Java-Calculator",
  },
];