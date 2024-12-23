"use client";
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { cn } from "@/lib/utils";
import { checkSlotAvailability } from "@/utils/api-calls";
import "./styles.css";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

const CalendarPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [originalSlots, setOriginalSlots] = useState(null);
  const [filter, setFilter] = useState("AM");
  const lastFetchedDate = useRef("");
  const startMonth = new Date();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const fetchSlots = async (start: string) => {
    try {
      const slotsData = await checkSlotAvailability(start);
      setOriginalSlots(slotsData);
      formatEvents(slotsData, filter);
      lastFetchedDate.current = start;
    } catch (error) {
      console.error("Error fetching slot availability:", error);
    }
  };

  const handleDatesSet = (info: any) => {
    const firstDateOfMonth = moment(info.view.currentStart).format(
      "MM-DD-YYYY",
    );

    // Avoid redundant API calls if the current month is already fetched
    if (lastFetchedDate.current === firstDateOfMonth) {
      return;
    }

    console.log("Dates set triggered, fetching for:", firstDateOfMonth);
    fetchSlots(firstDateOfMonth); // Call the API with the new month
  };

  const formatEvents = (slotsData: any, filter: string) => {
    const filteredEvents = Object.values(slotsData)
      .filter((slot: any) => slot?.reservations && slot?.slots)
      .flatMap((slot: any) =>
        slot?.slots
          .filter((timeSlot: any) => {
            const hour = parseInt(timeSlot.time.split(":")[0], 10);
            return filter === "AM" ? hour < 12 : hour >= 12;
          })
          .filter((timeSlot: any) => !timeSlot?.available)
          .map((timeSlot: any) => {
            const combinedDateTime = moment(slot.date).set({
              hour: parseInt(timeSlot.time.split(":")[0], 10),
              minute: parseInt(timeSlot.time.split(":")[1], 10),
              second: 0,
              millisecond: 0,
            });

            return {
              title: `Booked - ${combinedDateTime.format("h:mm A")}`,
              start: combinedDateTime.toISOString(),
              allDay: true,
              color: "green",
            };
          }),
      );

    setEvents(filteredEvents);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (originalSlots) {
      formatEvents(originalSlots, newFilter);
    }
  };

  const handleDateClick = (data: any) => {
    const isDisabled = data.dayEl.classList.contains("disabled-cell");
    if (isDisabled) {
      return;
    }

    const clickedDate = moment(data.date).format("YYYY-MM-DD");

    // Find the slot for the clicked date in originalSlots
    const slotForDate = originalSlots
      ? Object.values(originalSlots)?.find((slot) =>
          slot?.date.startsWith(clickedDate),
        )
      : null;

    if (!slotForDate || !slotForDate?.slots) {
      console.log("No available slots for this date.");
      return; // Exit if no slots are available
    }

    // Filter the slots based on the AM/PM filter
    const filteredSlots = slotForDate?.slots?.filter((timeSlot) => {
      const hour = parseInt(timeSlot.time.split(":")[0], 10);
      return filter === "AM" ? hour < 12 : hour >= 12;
    });

    // Find the first available time slot
    const firstAvailableSlot = filteredSlots?.find(
      (timeSlot) => timeSlot.available,
    );

    if (!firstAvailableSlot) {
      console.log("No available slots in the selected time range.");
      return; // Exit if no slots are available in the selected range
    }

    const newEventTime = firstAvailableSlot.time; // Use the time from the available slot
    const newEventStart = `${clickedDate}T${newEventTime}:00`;

    // Remove the previously added event
    const updatedEvents = events.filter((event) => event.userAdded !== true);

    // Add the new user event
    const newEvent = {
      title: `Engaged - ${moment(newEventStart).format("h:mm A")}`, // Add time in 12-hour format
      start: newEventStart,
      allDay: true,
      color: "#74604B",
      userAdded: true,
    };

    setEvents([...updatedEvents, newEvent]);
    setIsButtonDisabled(false);
    setSelectedDateTime(newEvent);
  };

  const dayCellClassNames = (date: any) => {
    // Check if the current date is in originalSlots and slots is false
    const dateStr = moment(date.date).format("YYYY-MM-DD"); // Format the date to match your keys
    const slot = originalSlots
      ? Object.values(originalSlots)?.find((slot) =>
          slot?.date?.startsWith(dateStr),
        )
      : null;

    if (slot && slot?.slots === false) {
      return ["disabled-cell"];
    }
    return [];
  };

  console.log("dayCellClassNames");

  const handleProceed = () => {
    if (selectedDateTime) {
      const startTime = selectedDateTime?.start;
      const date = new Date(startTime);
      const formattedDateTime = date.toISOString();
      router.push(`/booking?selectedDate=${formattedDateTime}`);
    }
  };

  return (
    <div className="container mb-8">
      <h2 className="text-center font-cormorant text-[4rem] text-white">
        Calendar
      </h2>

      <div className="relative my-8">
        {originalSlots && (
          <div className="absolute left-4 top-3.5 flex items-center">
            <button
              className={cn(
                " ",
                filter === "AM" ? "text-black" : "text-black/40",
              )}
              onClick={() => handleFilterChange("AM")}
            >
              AM
            </button>

            <div className="mx-2 h-5 w-0.5 bg-black" />
            <button
              className={cn(
                " ",
                filter === "PM" ? "text-black" : "text-black/40",
              )}
              onClick={() => handleFilterChange("PM")}
            >
              PM
            </button>
          </div>
        )}

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "",
            center: "prev,title,next",
            right: "",
          }}
          validRange={{
            start: new Date(startMonth.getFullYear(), startMonth.getMonth(), 1),
          }}
          datesSet={handleDatesSet} // Triggered on initial render and navigation
          dateClick={handleDateClick}
          dayCellClassNames={dayCellClassNames} // Add custom classes to cells
        />
      </div>

      {originalSlots && (
        <div className="mx-auto w-fit">
          <Button disabled={isButtonDisabled} onClick={handleProceed}>
            Proceed
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
