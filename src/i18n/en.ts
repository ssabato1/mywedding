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
      { name: "Convention Hall", floor: "2F", body: "13 m ceiling, 500 seated for one wedding. Large LED wall and lobby" },
      { name: "Marina Park", floor: "Garden · Rooftop", body: "Outdoor ceremonies and after-parties against the yacht marina" },
      { name: "Anniversary Hall", floor: "Chaebit Island", body: "Up to 200 guests. Banquet hall with stage, lighting and LED" },
      { name: "Vista", floor: "3F", body: "Wedding and conference hall with river views and an outdoor terrace" },
      { name: "Rive Gauche · Villa de Noche", floor: "2–3F", body: "Private banquets and VIP receptions" },
      { name: "4F Garden", floor: "Outdoor", body: "Cocktail receptions and welcome parties" },
      { name: "5F Rooftop", floor: "Outdoor", body: "Rooftop garden weddings and parties over the night river" },
    ],
    accessEyebrow: "Getting here",
    accessTitle: "South end of Banpo Bridge, beside the Rainbow Fountain",
    address: "Some Sevit, 650 Banpo-dong, Seocho-gu, Seoul, Korea",
    phone: "Tel",
    email: "Email",
    accessNote: "Shuttle from Express Bus Terminal. Parking for 800+ cars, coaches welcome.",
    accessIntro: "Sevit Island sits inside Banpo Hangang Park at the south end of Banpo Bridge. Whether you come by subway, shuttle, bus or car, Express Bus Terminal is the landmark.",
    accessWays: [
      {
        title: "Subway + walk",
        lines: [
          "Take Line 3, 7 or 9 to Express Bus Terminal Station",
          "Follow the underground passage toward Exit 5 and come out at the Banpo Hangang Park exit",
          "Walk straight toward the river, pass under Jamsu Bridge and continue to Sevit Island — about 10–15 minutes",
        ],
      },
      {
        title: "Shuttle bus",
        lines: [
          "Departs in front of Exit 5, Express Bus Terminal Station",
          "Runs every 10–15 minutes from 90 minutes before the ceremony",
          "About 5 minutes to the Sevit Island entrance. Return shuttles leave from the same spot after the event",
        ],
      },
      {
        title: "By car · parking",
        lines: [
          "Navigation: search “Banpo Hangang Park Parking Lot 2” or “Some Sevit”",
          "Olympic-daero → Banpo Hangang Park entrance → Jamsu Bridge roundabout → past the toll booth, keep right",
          "Banpo Hangang Park Lots 2 & 3 and Seorae Naru lot (800+ spaces). Guests park free for 3 hours, the couple's parents for 6",
          "Coaches for group guests are welcome — confirm the drop-off point with your coordinator in advance",
        ],
      },
      {
        title: "From Incheon Airport",
        lines: [
          "By taxi about 60 minutes — show the driver “세빛섬, 서초구 반포동 650번지”",
        ],
      },
    ],
    mapLinks: { google: "Open in Google Maps", naver: "Open in Naver Map", pdf: "Anniversary Hall arrival guide (PDF)" },
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
    body: "A grand wedding in the Floating Island Convention Hall on Sevit Island. Under a 13-metre ceiling, 500 guests are seated together for one ceremony, with the large LED wall and lobby entirely yours for a generous time slot. A formal ceremony flows into a relaxed reception.",
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
