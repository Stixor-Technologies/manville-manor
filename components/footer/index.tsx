import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import NavLinks from "../shared/nav-links";
import { socialLink } from "@/utils/utils";
import SocialLinks from "../shared/social-links";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray py-3">
      <div className="container">
        <div className="flex flex-col items-center py-7">
          <Image src={Logo} alt="manville-footer-logo" />

          <NavLinks fromFooter />
          <SocialLinks />
        </div>

        <div>
          <p className="leadiing-[2.0625rem] mt-9 text-center text-[1.375rem] font-medium text-white/65">
            Term & Condition - Privacy Policy &copy;{year} All rights reserved
            by <br className="hidden" />
            <span className="text-white">Manville Manor &copy; {year}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
