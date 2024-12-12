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
    title: "Max guest capacity?",
    content: "Up to 81 people seated",
  },

  {
    title: "Can I bring my own Food?",
    content:
      "Yes. We do not offer food or beverages. You can bring your own home-cooked food for your event, as long as it is not for sale. Licensed and  insured caterers are also permitted to provide food, but all food must be pre-cooked, and no onsite cooking is allowed.",
  },

  {
    title: "is alcohol allowed?",
    content:
      "Beer, wine and soft drinks are allowed and cannot be resold onsite to guests. A licensed and insured bartender is required if you have to serve liquor. Venue staff will request a copy of the bartender company before liquor will be allowed on our premises. We may add security as needed, based on the event's nature and timing",
  },

  {
    title:
      "how much extra time do i get for decorating/setting up for my event?",
    content:
      "Your setup time is included into your 6.5-hour Edison time block for space usage. There is no additional setup time allocated beyond your designated block, given that we host two events daily. For any extra setup time requirements, please get in touch with us for further details.",
  },

  {
    title: "am i required to cleanup after my event?",
    content:
      "Ensure the space is returned in a clean state as it was provided, unless you select the $250 cleaning package or a package that already includes cleaning. You will receive breakdown instructions in your final event communication.",
  },

  {
    title: "what decor items are prohibited?",
    content:
      "Smoking or vaping is not allowed onsite, on the venue's grounds/patios, or in front of the building. Glitter or confetti (also in balloons) is prohibited. Use of tape on venue walls is not permitted. Real flames are only allowed for warming food and candles for the event cake. Floating candles are allowed as long as they are not exposed flames and are in a container. Helium air balloons are not permitted in our Edison/Sayreville locations due to our high ceilings, but regular balloons are allowed.",
  },

  {
    title:
      "can i select my own unique hours outside of the cool venue time blocks?",
    content:
      "We are flexible with event start times on all days except Saturdays. On Saturdays, you can select from two event time blocks. Requesting a time outside of these blocks may require a full-day buyout, as it affects the two scheduled time slots.",
  },

  {
    title: "do you provide decor? how do i book it?",
    content:
      "Yes. We do offer decor services for many of our events. We do require you to first book the venue so your date is reserved then you can email us  to contact you and discuss decor add ons.",
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

export {
  navBarLinks,
  socialLink,
  venuePackage,
  decorPackage,
  faqItems,
  venueDetails,
};
