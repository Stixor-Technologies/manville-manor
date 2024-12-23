import React from "react";
import Testimonials from "./testimonials";
import { getTestimonials } from "@/utils/api-calls";
import { Testimonial } from "@/utils/types/types";

const TestimonialsSection = async () => {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div>
      {testimonials?.length > 0 && <Testimonials testimonials={testimonials} />}
    </div>
  );
};

export default TestimonialsSection;
