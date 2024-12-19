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
  date: string;
  venue: string;
  catering: string;
  floorOption: string;
  additionalServices: number[];
  package: string;
  message: string;
  adultsCount: number | null;
  childsCount: number | null;
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
    shortDescription: string;
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

type Portfolio = {
  id: number;
  images: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
  portfolio_filter: {
    data: {
      id: number;
      attributes: {
        name: string;
      };
    };
  };
};

type Testimonial = {
  id: number;
  attributes: {
    name: string;
    designation: string;
    testimony: string;
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
  Images,
  Portfolio,
  Testimonial,
};
