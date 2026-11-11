import type { Dict } from "./index";

export const en: Dict = {
  htmlLang: "en",
  company: {
    tagline: "Weddings of the world, on the Han River",
    description:
      "International marriages, global wedding trends and everything about planning your day. We help two cultures meet at Sevit Island on Seoul's Han River.",
  },
  nav: { about: "About", convention: "Convention Wedding", outdoor: "Outdoor Wedding", blog: "Blog" },
  lang: { ko: "한국어", en: "English", switchTo: "한국어" },
  hero: { scroll: "SCROLL" },
  home: {
    introTitle: "A generous time slot — three hours or more",
    introBody:
      "Most Korean wedding halls turn over a ceremony every one or two hours. Sevit Island and Marina Park give you a generous time slot, so the day runs from ceremony to after-party at the pace you set. This blog records international marriages, global wedding trends and everything about planning the day.",
    imageLabel: "Sevit Island at night",
    journal: "Journal",
    latest: "Latest articles",
    allPosts: "All articles",
    noPosts: "No articles published yet.",
  },
  about: {
    title: "About",
    historyEyebrow: "History",
    historyTitle: "The story of Sevit Island",
    history: [
      {
        year: "Han River Renaissance",
        title: "Floating islands on the river",
        body: "Three artificial islands — Gabit, Chaebit and Solbit — were built beside the Rainbow Fountain at the south end of Banpo Bridge, as part of a plan to create a cultural landmark on the Han River.",
      },
      {
        year: "2014",
        title: "Sevit Island opens",
        body: "Opened as Seoul's signature MICE unique venue. Floating Island Convention sits on Gabit Island, the first of the three.",
      },
      {
        year: "Growth",
        title: "Wedding and banquet spaces",
        body: "Convention Hall (2F), Marina Park, Anniversary Hall, Vista (3F), Rive Gauche, Villa de Noche, the 4F Garden and the 5F Rooftop — spaces of different scale and mood. Sposabella (dresses), Anniversary Flower (florals) and ArtM Studio (music) are our family brands.",
      },
      {
        year: "2026",
        title: "Floating Island Wedding",
        body: "We launched this blog on international marriages and global wedding trends — preparing weddings where two cultures meet, on the Han River.",
      },
    ],
    imageLabel: "Sevit Island at night",
    valuesEyebrow: "Values",
    valuesTitle: "What we keep",
    values: [
      { name: "Time", body: "A generous slot of three hours or more. No rush from the previous wedding, no crowding from the next." },
      { name: "Your way", body: "You set the running order, music, staging and menu. When the ceremony ends, the after-party begins in the same place." },
      { name: "Hospitality", body: "English-language coordination, halal and vegetarian menus, a shuttle from Express Bus Terminal and parking for 800+ cars for overseas guests and international couples." },
      { name: "The view", body: "The Han River and Banpo Bridge's Rainbow Fountain as your backdrop — river and sky by day, city lights by night." },
    ],
    spacesEyebrow: "Spaces",
    spacesTitle: "Seven spaces, seven moods",
    spaces: [
      { name: "Convention Hall", floor: "2F", body: "Up to 600 guests. Large LED wall and lobby for convention weddings" },
      { name: "Marina Park", floor: "Garden · Rooftop", body: "Outdoor ceremonies and after-parties against the yacht marina" },
      { name: "Anniversary Hall", floor: "Chaebit Island", body: "Up to 200 guests. Banquet hall with stage, lighting and LED" },
      { name: "Vista", floor: "3F", body: "Wedding and conference hall with river views and an outdoor terrace" },
      { name: "Rive Gauche · Villa de Noche", floor: "2–3F", body: "Private banquets and VIP receptions" },
      { name: "4F Garden", floor: "Outdoor", body: "Cocktail receptions and welcome parties" },
      { name: "5F Rooftop", floor: "Outdoor", body: "Rooftop garden weddings and parties over the night river" },
    ],
    accessEyebrow: "Getting here",
    accessTitle: "South end of Banpo Bridge, beside the Rainbow Fountain",
    address: "Some Sevit, 2085-14 Olympic-daero, Seocho-gu, Seoul, Korea",
    phone: "Tel",
    email: "Email",
    accessNote: "Shuttle from Express Bus Terminal. Parking for 800+ cars, coaches welcome.",
    partners: "Family brands",
    partnerNames: {
      floatingisland: "Floating Island",
      marinapark: "Marina Park",
      sposabella: "Sposabella",
      anniversaryflower: "Anniversary Flower",
      artmstudio: "ArtM Studio",
    } as Record<string, string>,
  },
  convention: {
    title: "Convention Wedding",
    body: "A grand wedding in the Sevit Island Convention Hall on the Han River. Host 500 or more guests in one space, with the large LED wall and lobby entirely yours for a generous time slot. A formal ceremony flows into a relaxed reception.",
  },
  outdoor: {
    title: "Outdoor Wedding",
    rooftop: {
      title: "Sevit Island 5F Rooftop Garden Wedding",
      paras: [
        "An outdoor ceremony in the 5th-floor rooftop garden, with the Han River at night as your backdrop.",
        "An exclusive slot of three hours or more lets you shape the day around your own flow rather than a fixed template.",
        "A customisable special wedding that moves naturally from the ceremony into an after-party in the same space.",
      ],
      link: "Visit the Sevit Island site",
    },
    marina: {
      title: "Marina Park Garden Wedding",
      paras: [
        "An outdoor ceremony in the Marina Park garden, with the yacht marina behind you.",
        "An unhurried pace with no crowding, so there is time for the moment and for conversation.",
        "Blend in a party wedding to match the mood and order of your ceremony — everything flows on in one space.",
      ],
      link: "Visit the Marina Park site",
    },
  },
  blog: {
    title: "Blog",
    eyebrow: "Journal",
    empty: "No articles published yet.",
    emptyEn: "English articles are on the way. Korean articles are listed below — each ends with an English summary.",
    readTranslation: "한국어 보기",
    otherLangNote: "This article is written in Korean.",
    otherLangNoteEn: "This article is written in Korean. An English summary is at the end.",
    backToList: "Back to list",
  },
  footer: { rights: "All rights reserved." },
};
