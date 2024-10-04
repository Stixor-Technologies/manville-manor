import React, { FC } from "react";

interface SectionHeaderProps {
  header: string;
  description: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ header, description }) => {
  return (
    <>
      <h2 className="text-center text-xl text-secondary">{header}</h2>
      <p className="mt-4 text-center font-cormorant text-5xl font-bold text-white">
        {description}
      </p>
    </>
  );
};

export default SectionHeader;
