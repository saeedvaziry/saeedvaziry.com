export type ProjectGroup = "active-oss" | "maintained" | "commercial" | "fun";

export interface Project {
  name: string;
  url: string;
  tagline: string;
  group: ProjectGroup;
  /** File slug in src/assets/projects (svg inline for theme awareness, raster rendered as img). */
  image: string;
  featured?: boolean;
}

export const PROJECT_GROUP_META: Record<ProjectGroup, string> = {
  "active-oss": "Actively maintained open source",
  maintained: "Maintained on demand",
  commercial: "Commercial",
  fun: "Just for fun",
};

export const PROJECTS: Project[] = [
  {
    name: "VitoDeploy",
    url: "https://vitodeploy.com",
    tagline: "Free and open-source server management and deployment",
    group: "active-oss",
    image: "vitodeploy",
    featured: true,
  },
  {
    name: "Capty",
    url: "https://capty.app",
    tagline: "Professional screen capture for macOS",
    group: "active-oss",
    image: "capty",
    featured: true,
  },
  {
    name: "Muxy",
    url: "https://github.com/muxy-app/muxy",
    tagline: "Terminal multiplexer for macOS",
    group: "active-oss",
    image: "muxy",
    featured: true,
  },
  {
    name: "FreeIPAPI",
    url: "https://freeipapi.com",
    tagline: "Free and fast IP geolocation API",
    group: "commercial",
    image: "freeipapi",
    featured: true,
  },
  {
    name: "TweakPHP",
    url: "https://tweakphp.com",
    tagline: "Desktop code editor for PHP",
    group: "active-oss",
    image: "tweakphp",
  },
  {
    name: "Draftila",
    url: "https://draftila.com",
    tagline: "Visual database schema designer for Laravel",
    group: "active-oss",
    image: "draftila",
  },
  {
    name: "FreeDraw",
    url: "https://freedraw.dev",
    tagline: "Free drawing board for the web",
    group: "active-oss",
    image: "freedraw",
  },
  {
    name: "Xal",
    url: "https://xal.sh",
    tagline: "AI coding agent for your terminal",
    group: "active-oss",
    image: "xal",
  },
  {
    name: "PHP-SaaS",
    url: "https://php-saas.com",
    tagline: "Laravel SaaS starter kit",
    group: "maintained",
    image: "php-saas",
  },
  {
    name: "Laravel Monitoring",
    url: "https://github.com/saeedvaziry/laravel-monitoring",
    tagline: "Server monitoring for Laravel applications",
    group: "maintained",
    image: "laravel-monitoring",
  },
  {
    name: "Laravel IP2Location",
    url: "https://github.com/saeedvaziry/ip2location",
    tagline: "IP to location lookup for Laravel",
    group: "maintained",
    image: "laravel-ip2location",
  },
  {
    name: "Laravel Async",
    url: "https://github.com/saeedvaziry/laravel-async",
    tagline: "Asynchronous queues for Laravel",
    group: "maintained",
    image: "laravel-async",
  },
  {
    name: "Waitlio",
    url: "https://waitlio.com",
    tagline: "Waitlist pages and launch emails",
    group: "commercial",
    image: "waitlio",
  },
  {
    name: "Chilluzzle",
    url: "https://chilluzzle.com",
    tagline: "Relaxing daily puzzle game",
    group: "fun",
    image: "chilluzzle",
  },
];
