export const SITE = {
  website: "https://saeedvaziry.com/", // replace this with your deployed domain
  author: "Saeed Vaziry",
  profile: "https://saeedvaziry.com/about",
  desc: "AI consulting for companies: strategy, LLM integration, and shipping AI features that stick. Writing code since 2010.",
  title: "Saeed Vaziry",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/saeedvaziry/saeedvaziry.com/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "UTC",
} as const;
