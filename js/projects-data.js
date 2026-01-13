// Sample projects data
// In a real application, this could come from a CMS, API, or database
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics. Built for scalability and performance.",
    image: "https://via.placeholder.com/400x300/0ea5e9/ffffff?text=E-Commerce+Platform",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/ecommerce-platform",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
    image: "https://via.placeholder.com/400x300/7dd3fc/ffffff?text=Task+Manager",
    tags: ["React", "TypeScript", "Firebase"],
    category: "react",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/task-manager",
    featured: true
  },
  {
    id: 3,
    title: "REST API Service",
    description: "A robust RESTful API with authentication, rate limiting, caching, and comprehensive documentation. Includes automated testing suite.",
    image: "https://via.placeholder.com/400x300/38bdf8/ffffff?text=REST+API",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "api",
    demoLink: "https://api.example.com/docs",
    githubLink: "https://github.com/yourusername/rest-api",
    featured: false
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A responsive weather application with location-based forecasts, interactive maps, and historical data visualization.",
    image: "https://via.placeholder.com/400x300/0284c7/ffffff?text=Weather+App",
    tags: ["React", "Chart.js", "Weather API"],
    category: "react",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/weather-app",
    featured: false
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media metrics with data visualization, trend analysis, and automated reporting features.",
    image: "https://via.placeholder.com/400x300/075985/ffffff?text=Analytics+Dashboard",
    tags: ["Vue.js", "Python", "D3.js", "MongoDB"],
    category: "fullstack",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/social-analytics",
    featured: true
  },
  {
    id: 6,
    title: "GraphQL API Gateway",
    description: "Modern GraphQL API gateway with microservices architecture, real-time subscriptions, and performance optimization.",
    image: "https://via.placeholder.com/400x300/0369a1/ffffff?text=GraphQL+API",
    tags: ["GraphQL", "Node.js", "Apollo", "Redis"],
    category: "api",
    demoLink: "https://api.example.com/graphql",
    githubLink: "https://github.com/yourusername/graphql-gateway",
    featured: false
  }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
