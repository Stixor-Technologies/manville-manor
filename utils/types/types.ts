type Menu = {
  id: number;
  title: string;
  path: string;
};

type SocialLinks = Omit<Menu, "id"> & { iconPath: string };

export type { Menu, SocialLinks };
