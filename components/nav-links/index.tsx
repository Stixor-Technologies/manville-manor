"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBarLinks } from "@/utils/utils";

interface NavLinkProps {
  fromFooter?: boolean;
}

const NavLinks: FC<NavLinkProps> = ({ fromFooter = false }) => {
  const path = usePathname();
  return (
    <ul className={`${fromFooter && "my-16"} flex gap-12`}>
      {navBarLinks?.map((link) => (
        <li key={link.id}>
          <Link
            href={link?.path}
            className={`${path === link?.path ? "text-white " : "text-gray"} uppercase transition-colors duration-300 hover:text-white`}
          >
            {link?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
