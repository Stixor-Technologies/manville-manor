import { BASE_URL } from "./contants";
import { FormValues, ListItemOption } from "./types/types";
export const getVenues = async (
  returnMappedList = false,
  selectedVenue: string | null,
) => {
  let url = `${BASE_URL}/api/venues?populate=*`;

  if (selectedVenue) {
    url += `&filters[venue_name]=${encodeURIComponent(selectedVenue)}`;
  }

  try {
    const resp = await fetch(url, {
      cache: "no-store",
    });
    const venues = await resp.json();
    if (returnMappedList) {
      return venues?.data.map((item: any) => ({
        value: item?.id,
        label: item?.attributes?.venue_name,
      }));
    }

    return venues?.data;
  } catch (error) {
    console.error("There was an error getting venues", error);
    return [];
  }
};

export const getPackages = async (
  returnMappedList = false,
  selectedVenue: string | null,
) => {
  let url = `${BASE_URL}/api/packages?populate=*`;

  if (selectedVenue) {
    url += `&filters[venue][venue_name]=${encodeURIComponent(selectedVenue)}`;
  }

  try {
    const resp = await fetch(url, {
      cache: "no-store",
    });
    const packages = await resp.json();

    if (returnMappedList) {
      return packages?.data.map((item: any) => ({
        value: item?.id,
        label: item?.attributes?.name,
      }));
    }
    return packages?.data;
  } catch (error) {
    console.error("There was an error getting packages", error);
    return [];
  }
};

export const getCatering = async (): Promise<ListItemOption[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/api/caterings`, {
      cache: "no-store",
    });
    const caterings = await resp.json();
    return caterings?.data.map((item: any) => ({
      value: item?.id,
      label: item?.attributes?.name,
    }));
  } catch (error) {
    console.error("There was an error getting catering", error);
    return [];
  }
};

export const getAdditionalServices = async (returnMappedList = false) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/additional-services`, {
      cache: "no-store",
    });
    const services = await resp.json();
    if (returnMappedList) {
      return services?.data.map((item: any) => {
        return {
          value: item?.id,
          label: `${item?.attributes?.name} - $${item?.attributes?.price}`,
        };
      });
    }

    return services?.data;
  } catch (error) {
    console.error("There was an error getting additional services", error);
    return [];
  }
};

export const getFloorPlans = async (
  returnMappedList = false,
  selectedVenue: string | null,
) => {
  let url = `${BASE_URL}/api/floor-options?populate=*`;

  if (selectedVenue) {
    url += `&filters[venue][venue_name]=${encodeURIComponent(selectedVenue)}`;
  }

  try {
    const resp = await fetch(url, {
      cache: "no-store",
    });
    const floorOptions = await resp.json();
    if (returnMappedList) {
      return floorOptions?.data.map((item: any) => ({
        value: item?.id,
        label: item?.attributes?.name,
      }));
    }

    return floorOptions?.data;
  } catch (error) {
    console.error("There was an error getting floor options", error);
    return [];
  }
};

export const checkSlotAvailability = async (selectedDate: string) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/strapi-reservations/time-slots/month/${selectedDate}`,

      {
        cache: "no-store",
      },
    );
    const res = await resp.json();
    return res;
  } catch (error) {
    console.error("There was an error getting slots data", error);
  }
};

export const createBooking = async (values: FormValues) => {
  const requestData = {
    data: values,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/create-reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resp = await response.json();
    return resp;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/blogs?populate=*&pagination[limit]=6`,
      {
        cache: "no-store",
      },
    );
    const blogs = await resp.json();
    return blogs?.data;
  } catch (error) {
    console.error("There was an error getting blogs", error);
  }
};

export const getBlogDetail = async (title: string) => {
  const formattedTitle = title.replace(/%20/g, " ");

  try {
    const resp = await fetch(
      `${BASE_URL}/api/blogs?populate=*&filters[title][$eq]=${formattedTitle}`,
      {
        cache: "no-store",
      },
    );
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getInvoice = async (bookingId: number) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/invoice/${bookingId}?populate=*`,
      {
        cache: "no-store",
      },
    );

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the invoice", error);
    throw error;
  }
};

export const updatePaymentStatus = async (bookingId: number) => {
  try {
    const requestData = {
      data: {
        isPaid: true,
      },
    };

    // add reference to uploaded PDF file to collection
    const updateStatus = await fetch(
      `${BASE_URL}/api/update-payment-status/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
    );

    if (!updateStatus.ok) {
      throw new Error(`HTTP error! Status: ${updateStatus?.status}`);
    }

    const resp = await updateStatus.json();
    return resp;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

export const getRecentEvents = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/recent-events?populate=*`, {
      cache: "no-store",
    });
    const recentEvents = await resp.json();
    return recentEvents?.data;
  } catch (error) {
    console.error("There was an error getting recent Events", error);
    return [];
  }
};

export const getGallerySliderImages = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/gallery-slider?populate=*`, {
      cache: "no-store",
    });
    const sliderImages = await resp.json();
    return sliderImages?.data;
  } catch (error) {
    console.error("There was an error getting slider images", error);
    return [];
  }
};

export const getPortfolio = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/gallery-portfolio?populate=*`, {
      cache: "no-store",
    });
    const portfolioData = await resp.json();
    return portfolioData?.data?.attributes?.images?.data;
  } catch (error) {
    console.error("There was an error getting portfolio", error);
    return [];
  }
};

export const getTestimonials = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/testimonials?populate=*`, {
      cache: "no-store",
    });
    const testimonialsData = await resp.json();
    return testimonialsData?.data;
  } catch (error) {
    console.error("There was an error getting testimonials", error);
    return [];
  }
};

export const getAbout = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/about?populate=*`, {
      cache: "no-store",
    });
    const aboutData = await resp.json();
    return aboutData?.data?.attributes?.images?.data;
  } catch (error) {
    console.error("There was an error getting about data", error);
    return [];
  }
};
