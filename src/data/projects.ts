export type ProjectGroup =
  | "active-oss"
  | "maintained"
  | "commercial"
  | "fun";

export interface Project {
  name: string;
  url: string;
  tagline: string;
  group: ProjectGroup;
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
    image: "/images/projects/vitodeploy.svg",
    featured: true,
  },
  {
    name: "Capty",
    url: "https://capty.app",
    tagline: "Professional screen capture for macOS",
    group: "active-oss",
    image: "/images/projects/capty.svg",
    featured: true,
  },
  {
    name: "TweakPHP",
    url: "https://tweakphp.com",
    tagline: "Desktop code editor for PHP",
    group: "active-oss",
    image: "/images/projects/tweakphp.svg",
    featured: true,
  },
  {
    name: "FreeIPAPI",
    url: "https://freeipapi.com",
    tagline: "Free and fast IP geolocation API",
    group: "commercial",
    image: "/images/projects/freeipapi.svg",
    featured: true,
  },
  {
    name: "Muxy",
    url: "https://github.com/muxy-app/muxy",
    tagline: "Terminal multiplexer for macOS",
    group: "active-oss",
    image: "/images/projects/muxy.svg",
  },
  {
    name: "Draftila",
    url: "https://draftila.com",
    tagline: "Visual database schema designer for Laravel",
    group: "active-oss",
    image: "/images/projects/draftila.svg",
  },
  {
    name: "FreeDraw",
    url: "https://freedraw.dev",
    tagline: "Free drawing board for the web",
    group: "active-oss",
    image: "/images/projects/freedraw.svg",
  },
  {
    name: "Xal",
    url: "https://xal.sh",
    tagline: "AI coding agent for your terminal",
    group: "active-oss",
    image: "/images/projects/xal.svg",
  },
  {
    name: "PHP-SaaS",
    url: "https://php-saas.com",
    tagline: "Laravel SaaS starter kit",
    group: "maintained",
    image: "/images/projects/php-saas.svg",
  },
  {
    name: "Laravel Monitoring",
    url: "https://github.com/saeedvaziry/laravel-monitoring",
    tagline: "Server monitoring for Laravel applications",
    group: "maintained",
    image: "/images/projects/laravel-monitoring.svg",
  },
  {
    name: "Laravel IP2Location",
    url: "https://github.com/saeedvaziry/ip2location",
    tagline: "IP to location lookup for Laravel",
    group: "maintained",
    image: "/images/projects/laravel-ip2location.svg",
  },
  {
    name: "Laravel Async",
    url: "https://github.com/saeedvaziry/laravel-async",
    tagline: "Asynchronous queues for Laravel",
    group: "maintained",
    image: "/images/projects/laravel-async.svg",
  },
  {
    name: "Waitlio",
    url: "https://waitlio.com",
    tagline: "Waitlist pages and launch emails",
    group: "commercial",
    image: "/images/projects/waitlio.svg",
  },
  {
    name: "Chilluzzle",
    url: "https://chilluzzle.com",
    tagline: "Relaxing daily puzzle game",
    group: "fun",
    image: "/images/projects/chilluzzle.svg",
  },
];
