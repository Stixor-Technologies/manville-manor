"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { navBarLinks } from "@/utils/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import CloseIcon from "@/public/assets/icons/close-icon.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/button";
import Hamburger from "@/public/assets/icons/hamburger.svg";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/shared/social-links";

const Sidebar = () => {
  const sideBarMenu = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathUrl = usePathname();

  const { contextSafe } = useGSAP({ scope: sideBarMenu });

  const toggleMenu = contextSafe(() => {
    if (isMenuOpen) {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      setIsMenuOpen(false);
      document.body.classList.remove("!overflow-hidden");
    } else {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: -sideBarMenu?.current?.clientWidth,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      setIsMenuOpen(true);
      document.body.classList.add("!overflow-hidden");
    }
  });

  return (
    <>
      <Button
        size={"icon"}
        variant={"icon"}
        className="inline-flex md:hidden"
        onClick={toggleMenu}
      >
        <Image src={Hamburger} alt="hamburger-menu" />
      </Button>
      <div
        ref={sideBarMenu}
        className="fixed right-0 top-0 z-40 -mr-[100vw] h-screen w-screen
           bg-primary will-change-auto min-aspect:-mr-[40vw] min-aspect:w-[40vw]"
      >
        <div
          className=" mx-auto flex h-full w-full flex-col gap-[12.6vw] 
          py-12 min-aspect:mx-0 min-aspect:w-full min-aspect:justify-center min-aspect:pt-[6vw]"
        >
          <div className="flex justify-between px-5">
            <div>
              <Image src={Logo} width={150} height={46} alt="sidebar-logo" />
            </div>

            <button onClick={toggleMenu}>
              <Image src={CloseIcon} alt="close-menu" />
            </button>
          </div>

          <ul className="flex-1 space-y-[9vw] text-xl  md:text-left min-aspect:mt-[4vw] min-aspect:space-y-[1.5vw]">
            {navBarLinks?.map((item) => (
              <li key={item?.id}>
                <Link
                  onClick={toggleMenu}
                  href={item?.path}
                  className={cn(
                    "relative block rounded-md px-5 py-3.5 text-right text-[5vw] uppercase leading-[1.375rem] text-white/50 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white/50 after:content-[''] min-aspect:text-[2.5vw]",
                    item.path === pathUrl && "text-white after:bg-white",
                  )}
                >
                  {item?.title}
                </Link>
              </li>
            ))}
          </ul>

          <SocialLinks />
        </div>
      </div>

      <div
        ref={overlayRef}
        className={`${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        } fixed inset-0 top-0 z-30 bg-black opacity-0`}
      />
    </>
  );
};

export default Sidebar;
