import { Menu, SocialLinks } from "./types/types";
import Instagram from "@/public/assets/icons/instagram.svg";
import Facebook from "@/public/assets/icons/facebook.svg";
import Linkedin from "@/public/assets/icons/linkedin.svg";
import X from "@/public/assets/icons/x.svg";
import Youtube from "@/public/assets/icons/youtube.svg";

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
    title: "contact",
    path: "/contact",
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

export { navBarLinks, socialLink };
