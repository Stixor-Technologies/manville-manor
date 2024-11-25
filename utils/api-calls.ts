import { BASE_URL } from "./contants";
import { FormValues, ListItemOption } from "./types/types";

export const getVenues = async (): Promise<ListItemOption[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/api/venues`, {
      cache: "no-store",
    });
    const venues = await resp.json();
    return venues?.data.map((item: any) => ({
      value: item?.id,
      label: item?.attributes?.venue_name,
    }));
  } catch (error) {
    console.error("There was an error getting venues", error);
    return [];
  }
};

export const getPeopleCount = async (): Promise<ListItemOption[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/api/people-counts`, {
      cache: "no-store",
    });
    const peopleCount = await resp.json();
    return peopleCount?.data.map((item: any) => ({
      value: item?.id,
      label: item?.attributes?.numberOfPeople,
    }));
  } catch (error) {
    console.error("There was an error getting people counts", error);
    return [];
  }
};

// export const getPackages = async (): Promise<ListItemOption[]> => {
//   try {
//     const resp = await fetch(`${BASE_URL}/api/packages`, {
//       cache: "no-store",
//     });
//     const peopleCount = await resp.json();
//     return peopleCount?.data.map((item: any) => ({
//       value: item?.id,
//       label: item?.attributes?.name,
//     }));
//   } catch (error) {
//     console.error("There was an error getting packages", error);
//     return [];
//   }
// };

export const getPackages = async (returnMappedList = false) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/packages?populate=*`, {
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

export const getAdditionalServices = async (): Promise<ListItemOption[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/api/additional-services`, {
      cache: "no-store",
    });
    const services = await resp.json();
    return services?.data.map((item: any) => ({
      value: item?.id,
      label: item?.attributes?.name,
    }));
  } catch (error) {
    console.error("There was an error getting additional services", error);
    return [];
  }
};

// export const getFloorPlans = async (): Promise<ListItemOption[]> => {
//   try {
//     const resp = await fetch(`${BASE_URL}/api/floor-options`, {
//       cache: "no-store",
//     });
//     const floorOptions = await resp.json();
//     return floorOptions?.data.map((item: any) => ({
//       value: item?.id,
//       label: item?.attributes?.name,
//     }));
//   } catch (error) {
//     console.error("There was an error getting floor options", error);
//     return [];
//   }
// };

// export const getBackdrops = async (): Promise<ListItemOption[]> => {
//   try {
//     const resp = await fetch(`${BASE_URL}/api/back-drops`, {
//       cache: "no-store",
//     });
//     const backDrops = await resp.json();
//     return backDrops?.data.map((item: any) => ({
//       value: item?.id,
//       label: item?.attributes?.name,
//     }));
//   } catch (error) {
//     console.error("There was an error getting Backdrops", error);
//     return [];
//   }
// };

export const getFloorPlans = async (returnMappedList = false) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/floor-options?populate=*`, {
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

export const getBackdrops = async (returnMappedList = false) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/back-drops?populate=*`, {
      cache: "no-store",
    });
    const backDrops = await resp.json();

    if (returnMappedList) {
      return backDrops?.data.map((item: any) => ({
        value: item?.id,
        label: item?.attributes?.name,
      }));
    }

    return backDrops?.data;
  } catch (error) {
    console.error("There was an error getting Backdrops", error);
    return [];
  }
};

export const checkSlotAvailability = async (selectedDate: string) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/strapi-reservations/time-slots/day/${selectedDate}`,
      {
        cache: "no-store",
      },
    );
    const res = await resp.json();
    return res;
  } catch (error) {
    console.error("There was an error getting floor options", error);
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

export const postContract = async (bookingId: any, pdfFile: any) => {
  try {
    // Upload PDF to Strapi media library
    const uploadPdf = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: pdfFile,
    });
    const resp = await uploadPdf.json();
    const pdfId = resp?.[0]?.id;

    const requestData = {
      data: {
        contract: pdfId,
      },
    };

    // add reference to uploaded PDF file to collection
    const addPdf = await fetch(`${BASE_URL}/api/post-contract/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!addPdf.ok) {
      throw new Error(`HTTP error! Status: ${addPdf?.status}`);
    }

    const addPdfResp = await addPdf.json();
    return addPdfResp;
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
        next: { revalidate: 7200 },
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
