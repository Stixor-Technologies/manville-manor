import About from "@/components/about";
import { REDIRECT_URL } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Manville Manor - Manville, NJ Event Venue",
  description:
    "Learn about Manville Manor, an elegant New Jersey event venue blending timeless manor charm with modern amenities. Read our story, meet our team, and discover why our Manville, NJ venue is ideal for weddings, corporate functions, baby showers, and more.",
  alternates: {
    canonical: `${REDIRECT_URL}/about-us`,
  },
};

const AboutPage = () => {
  return (
    <>
      <About />
    </>
  );
};

export default AboutPage;
