export const SITE = {
  website: "https://saeedvaziry.com/", // replace this with your deployed domain
  author: "Saeed Vaziry",
  profile: "https://saeedvaziry.com/about",
  desc: "Software engineer specializing in developer tools, from CLIs and internal platforms to AI-powered features. Writing code since 2012.",
  title: "Saeed Vaziry",
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/saeedvaziry/saeedvaziry.com/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "UTC",
} as const;
