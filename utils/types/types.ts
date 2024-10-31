import { StaticImageData } from "next/image";

type Menu = {
  id: number;
  title: string;
  path: string;
};

type SocialLinks = Omit<Menu, "id"> & { iconPath: string };

type Faq = {
  title: string;
  content: string;
};

type EventPackage = {
  weekDaysPrice: string;
  weekEndPrices: string;
  packageFeatures: string[];
};

type VenueDetail = {
  name: string;
  list: string[];
  item: string;
};

type RecentEvents = {
  name: string;
  media: StaticImageData;
  hostedBy: string;
  number: string;
};

export type { Menu, SocialLinks, Faq, EventPackage, VenueDetail, RecentEvents };
