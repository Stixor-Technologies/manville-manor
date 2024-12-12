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

type ListItemOption = {
  value: number | string;
  label: string;
};

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  routine: string;
  date: string;
  venue: string;
  peopleCount: string;
  catering: string;
  floorOption: string;
  additionalServices: number[];
  backDrop: string;
  package: string;
  message: string;
};

type Images = {
  data: {
    attributes: {
      url: string;
    };
  };
};

type Blogs = {
  attributes: {
    authorName: string;
    date: string;
    tag: string;
    title: string;
    media: Images;
    auhtorImage: Images;
    description: any;
  };
};

type Backdrops = {
  id: number;
  attributes: {
    name: string;
    price: number;
    tag: string;
    backDropMedia: Images;
    social?: {
      facebook: "/";
      instagram: "/";
    };
  };
};

type EventPackagesType = {
  id: number;
  attributes: {
    name: string;
    price: number;
    weekendPrice: number;
    features: {
      id: number;
      feature: string;
    }[];
  };
};

type RecentEvent = {
  id: number;
  attributes: {
    name: string;
    tag: string;
    image: Images;
  };
};

export type {
  Menu,
  SocialLinks,
  Faq,
  EventPackage,
  VenueDetail,
  RecentEvents,
  ListItemOption,
  FormValues,
  Blogs,
  Backdrops,
  EventPackagesType,
  RecentEvent,
};
