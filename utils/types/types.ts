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

export type { Menu, SocialLinks, Faq };
