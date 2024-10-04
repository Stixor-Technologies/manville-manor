import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Hamburger from "@/public/assets/icons/hamburger.svg";
import NavLinks from "../nav-links";
import { Button } from "../button";

const Header = () => {
  return (
    <header className="fixed w-full">
      <div className="mx-5 bg-[#2B2A26] py-[1.1875rem]">
        <div className="container flex  items-center justify-between">
          <Link href={"/"}>
            <Image src={Logo} width={150} height={46} alt="manville-logo" />
          </Link>

          <NavLinks />
          <Button className="hidden md:inline-flex">Booking</Button>

          <Button
            size={"icon"}
            variant={"icon"}
            className="inline-flex md:hidden"
          >
            <Image src={Hamburger} alt="hamburger-menu" />
          </Button>
        </div>
      </div>

      {/* <Sidebar /> */}
    </header>
  );
};

export default Header;
