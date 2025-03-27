import { Metadata } from "next";
import Calendar from "@/components/calendar";
import { REDIRECT_URL } from "@/utils/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: `${REDIRECT_URL}/calendar`,
  },
};
const CalendarPage = () => {
  return (
    <>
      <Calendar />
    </>
  );
};

export default CalendarPage;
