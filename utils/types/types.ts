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

export type { Menu, SocialLinks, Faq, EventPackage, VenueDetail };
