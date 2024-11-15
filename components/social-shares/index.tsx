"use client";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "react-share";

import { usePathname } from "next/navigation";
import { BASE_URL } from "@/utils/contants";

const ShareButtons = () => {
  const path = usePathname();

  const url = `${BASE_URL}${path}`;

  return (
    <div className="flex items-center gap-3">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton url={url}>
        <XIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

export default ShareButtons;
