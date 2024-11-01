import React from "react";
import { socialLink } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";

const SocialLinks = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {socialLink?.map((link) => (
        <li key={link.title}>
          <Link
            href={link?.path}
            className="flex size-12 items-center justify-center rounded-sm transition-all duration-300 hover:bg-sand"
          >
            <Image src={link.iconPath} alt={link?.title} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
