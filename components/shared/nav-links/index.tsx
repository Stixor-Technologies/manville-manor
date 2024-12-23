"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navBarLinks } from "@/utils/utils";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  fromFooter?: boolean;
}

const NavLinks: FC<NavLinkProps> = ({ fromFooter = false }) => {
  const path = usePathname();
  return (
    <ul
      className={cn(
        "flex justify-center gap-12",
        fromFooter
          ? "my-16 flex-wrap"
          : "hidden gap-4 text-sm sm:gap-6 md:flex md:gap-6 lg:gap-12 lg:text-base",
      )}
    >
      {navBarLinks?.map((link) => (
        <li key={link.id}>
          <Link
            href={link?.path}
            className={`${path === link?.path ? "text-white" : "text-gray"} uppercase transition-colors duration-300 hover:text-white`}
          >
            {link?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
