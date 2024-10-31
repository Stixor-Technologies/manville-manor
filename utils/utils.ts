import {
  EventPackage,
  Faq,
  Menu,
  RecentEvents,
  SocialLinks,
  VenueDetail,
} from "./types/types";
import Instagram from "@/public/assets/icons/instagram.svg";
import Facebook from "@/public/assets/icons/facebook.svg";
import Linkedin from "@/public/assets/icons/linkedin.svg";
import X from "@/public/assets/icons/x.svg";
import Youtube from "@/public/assets/icons/youtube.svg";
import Event1 from "@/public/assets/events/event-1.png";
import Event2 from "@/public/assets/events/event-2.png";
import Event3 from "@/public/assets/events/event-3.png";
import Event4 from "@/public/assets/events/event-4.png";
import Event5 from "@/public/assets/events/event-5.png";
import Event6 from "@/public/assets/events/event-6.png";
import Event7 from "@/public/assets/events/event-7.png";

const navBarLinks: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Gallery",
    path: "/gallery",
  },

  {
    id: 3,
    title: "Packages",
    path: "/packages",
  },

  {
    id: 4,
    title: "About Us",
    path: "/about-us",
  },

  {
    id: 5,
    title: "Contact",
    path: "/contact-us",
  },
];

const socialLink: SocialLinks[] = [
  {
    title: "instagram",
    path: "https://www.instagram.com/royalswisshousing/",
    iconPath: Instagram,
  },
  {
    title: "facebook",
    path: "https://www.facebook.com/OfficialRoyalSwissHousing",
    iconPath: Facebook,
  },

  {
    title: "linkedin",
    path: "#",
    iconPath: Linkedin,
  },

  {
    title: "twitter",
    path: "#",
    iconPath: X,
  },

  {
    title: "youtube",
    path: "#",
    iconPath: Youtube,
  },
];

const venuePackage: EventPackage = {
  weekDaysPrice: "$1000",
  weekEndPrices: "$1395",
  packageFeatures: [
    "Access to eight 10 feet rectangular tables or eight 5 foot round tables",
    "Two 4 feet tables",
    "Up to 81 chairs",
    "Venue Uplights",
    "Venue Uplights",
    "Venue Uplights",
    "Access to eight 10 feet rectangular tables or eight 5 foot round tables",
    "Two 4 feet tables",
    "Up to 81 chairs",
    "Venue Uplights",
  ],
};

const decorPackage: EventPackage = {
  weekDaysPrice: "$1500",
  weekEndPrices: "$1995",
  packageFeatures: [
    "Access to eight 10 feet rectangular tables or eight 5 foot round tables",
    "Two 4 feet tables",
    "Up to 81 chairs",
    "Venue Uplights",
    "Venue Uplights",
    "Venue Uplights",
    "Access to eight 10 feet rectangular tables or eight 5 foot round tables",
    "Two 4 feet tables",
    "Up to 81 chairs",
    "Venue Uplights",
  ],
};

const faqItems: Faq[] = [
  {
    title: "max guest capacity?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title: "can i bring my own food?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title: "is alcohol allowed",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title:
      "how much extra time do i get for decorating/setting up for my event?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title: "am i required to cleanup after my event?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title: "what decor items are prohibited?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title:
      "can i select my own unique hours outside of the cool venue time blocks?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },

  {
    title: "do you provide decor? how do i book it?",
    content:
      "Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar. Lorem ipsum dolor sit amet consectetur. Donec vitae ut scelerisque mauris mauris aenean congue facilisis pulvinar.",
  },
];

const venueDetails: VenueDetail[] = [
  {
    name: "Amenities",
    item: "Venue",
    list: [
      "Ceiling Projector with electric drop down screen",
      "Multiple 75 - 85” Smart Tvs, with Screen Mirroring",
      "LED Multicolor Reccessed Mood Lighting",
      "Smart Contract Audits",
      "Crystal Chandeliers throughout",
      "10 feet high ceilings and white space",
      "1600 sq. of event space",
      "175 sqft Full Service Kitchen for preparations",
      "Refrigerator, Ice Maker, Water Filter Dispenser, Microwave, Sinks",
      "Outdoor Paver Patio and large Grass area (Suitable for bouncy houses and otherwise)",
      "Exterior Display Board to post your event and welcome your Guests",
    ],
  },

  {
    name: "Complimentary",
    item: "Included",
    list: [
      "1600 sq. of event space",
      "175 sqft Full Service Kitchen for preparations",
      "Refrigerator, Ice Maker, Water Filter Dispenser, Microwave, Sinks",
      "Outdoor Paver Patio and large Grass area (Suitable for bouncy houses and otherwise)",
      "Exterior Display Board to post your event and welcome your Guests",
    ],
  },
];

// const recentEvents: RecentEvents[] = [
//   {
//     name: "LUMI",
//     media: Event2,
//     hostedBy: "Lumi by Roli",
//     number: "02",
//   },
//   {
//     name: "Type Balance",
//     media: Event4,
//     hostedBy: "Antian Lmeri",
//     number: "04",
//   },
//   {
//     name: "Compositions III",
//     media: Event6,
//     hostedBy: "Phillip Luck",
//     number: "06",
//   },
//   {
//     name: "Dreamy Flowers",
//     media: Event1,
//     hostedBy: "Behance: Omar Aqil",
//     number: "01",
//   },
//   {
//     name: "LUMI",
//     media: Event3,
//     hostedBy: "Lumi by Roli",
//     number: "03",
//   },

//   {
//     name: "Type 2021 Edition",
//     media: Event5,
//     hostedBy: "Get it Studio",
//     number: "05",
//   },

//   {
//     name: "Abstract Machine",
//     media: Event7,
//     hostedBy: "Juanna Mota",
//     number: "07",
//   },
// ];

const recentEvents: RecentEvents[] = [
  {
    name: "Dreamy Flowers",
    media: Event1,
    hostedBy: "Behance: Omar Aqil",
    number: "01",
  },

  {
    name: "LUMI",
    media: Event2,
    hostedBy: "Lumi by Roli",
    number: "02",
  },
  {
    name: "LUMI",
    media: Event3,
    hostedBy: "Lumi by Roli",
    number: "03",
  },

  {
    name: "Type Balance",
    media: Event4,
    hostedBy: "Antian Lmeri",
    number: "04",
  },

  {
    name: "Type 2021 Edition",
    media: Event5,
    hostedBy: "Get it Studio",
    number: "05",
  },

  {
    name: "Compositions III",
    media: Event6,
    hostedBy: "Phillip Luck",
    number: "06",
  },

  {
    name: "Abstract Machine",
    media: Event7,
    hostedBy: "Juanna Mota",
    number: "07",
  },
];

export {
  navBarLinks,
  socialLink,
  venuePackage,
  decorPackage,
  faqItems,
  venueDetails,
  recentEvents,
};
