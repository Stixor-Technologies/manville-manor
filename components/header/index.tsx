import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import NavLinks from "../shared/nav-links";
import { Button } from "../button";
import Sidebar from "./menu/sidebar";

const Header = () => {
  // bg-[#2B2A26]
  return (
    <header className="fixed z-50 w-full">
      <div className=" bg-secondary/10 py-2.5 backdrop-blur-xl md:py-[1.1875rem]">
        <div className="container flex items-center  justify-between sm:px-[2.5625rem]">
          <Link href={"/"}>
            <Image src={Logo} width={150} height={46} alt="manville-logo" />
          </Link>

          <NavLinks />
          {/* <Button variant={"transparent"} className="hidden md:inline-flex">
            Booking
          </Button> */}

          <Link
            href={"/booking"}
            className="hidden h-10 w-[7.5rem] items-center justify-center whitespace-nowrap rounded-sm bg-white/10 text-base text-white transition-all duration-300 hover:bg-white/30 md:inline-flex"
          >
            Booking
          </Link>

          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
