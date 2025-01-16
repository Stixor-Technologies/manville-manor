import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import NavLinks from "../shared/nav-links";
import SocialLinks from "../shared/social-links";
import Link from "next/link";

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

        {/* <div>
          <div>
            <Link href={"/term-conditions"}>Terms & Condition </Link>
            <Link href={"/term-conditions"}>Terms & Condition </Link>
          </div>
          <div className="h-[1px] w-full bg-white" />
        </div> */}

        <div>
          {/* Term & Condition - Privacy Policy */}
          <p className="leadiing-[2.0625rem] mt-4 text-center text-[1.375rem] font-medium text-white/65">
            <Link href={"/term-conditions"}> Term & Condition</Link> -{" "}
            <Link href={"/#"}>Privacy Policy</Link> &copy;
            {year} All rights reserved by <br className="hidden" />
            <span className="text-white">Manville Manor &copy; {year}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
