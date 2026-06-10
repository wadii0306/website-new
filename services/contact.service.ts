import api from "@/lib/api";

// Contact API functions
export const contactApi = {
  // Create a new contact submission
  createContact: async (contactData: {
    fullName: string;
    banquetName: string;
    email: string;
    phone: string;
    city: string;
    venueType?: string;
    message?: string;
  }) => {
    console.info("[Wadii Website] Contact form submission started", {
      email: contactData.email,
      banquetName: contactData.banquetName,
      city: contactData.city,
    })

    const response = await api.post("/website", contactData)

    console.info("[Wadii Website] Contact form submitted successfully", {
      email: contactData.email,
    })

    return response.data
  },
}