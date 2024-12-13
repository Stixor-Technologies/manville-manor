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

// export const getAdditionalServices = async (): Promise<ListItemOption[]> => {
//   try {
//     const resp = await fetch(`${BASE_URL}/api/additional-services`, {
//       cache: "no-store",
//     });
//     const services = await resp.json();
//     return services?.data.map((item: any) => ({
//       value: item?.id,
//       label: item?.attributes?.name,
//     }));
//   } catch (error) {
//     console.error("There was an error getting additional services", error);
//     return [];
//   }
// };

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

export const getAdditionalServices = async (returnMappedList = false) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/additional-services`, {
      cache: "no-store",
    });
    const services = await resp.json();
    if (returnMappedList) {
      return services?.data.map((item: any) => ({
        value: item?.id,
        label: item?.attributes?.name,
      }));
    }

    return services?.data;
  } catch (error) {
    console.error("There was an error getting additional services", error);
    return [];
  }
};

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

export const postContract = async (
  bookingId: any,
  imageFile: File,
  contractDate: string,
) => {
  try {
    // Create FormData for image upload
    const formData = new FormData();
    formData.append("files", imageFile);

    // Step 1: Upload Image to Strapi
    const uploadImageResponse = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!uploadImageResponse.ok) {
      throw new Error(
        `Failed to upload image. Status: ${uploadImageResponse.status}`,
      );
    }

    const uploadImageResult = await uploadImageResponse.json();
    const imageId = uploadImageResult?.[0]?.id;

    if (!imageId) {
      throw new Error("Image upload failed: No ID returned.");
    }

    // Step 2: Update Contract with Image ID and Date
    const requestData = {
      data: {
        clientSignature: imageId, // Reference the uploaded image
        contractDate,
      },
    };

    const updateContractResponse = await fetch(
      `${BASE_URL}/api/post-contract/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      },
    );

    if (!updateContractResponse.ok) {
      throw new Error(
        `Failed to update contract. Status: ${updateContractResponse.status}`,
      );
    }

    const updateContractResult = await updateContractResponse.json();
    return updateContractResult;
  } catch (error) {
    console.error("Error uploading contract data:", error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/blogs?populate=*&pagination[limit]=6`,
      // {
      //   next: { revalidate: 7200 },
      // },
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

export const getPorfolioFilters = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/portfolio-filters?populate=*`, {
      cache: "no-store",
    });
    const porfolioFilters = await resp.json();
    return [
      { value: "all", label: "All" },
      ...porfolioFilters?.data.map((item: any) => ({
        value: item?.attributes?.name,
        label: item?.attributes?.name,
      })),
    ];
    // return porfolioFilters;
  } catch (error) {
    console.error("There was an error getting porfolio filters", error);
    return [];
  }
};

export const getPortfolio = async () => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/potfolio?populate[portfolioCategory][populate]=*`,
      {
        cache: "no-store",
      },
    );
    const portfolioData = await resp.json();
    return portfolioData?.data;
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
