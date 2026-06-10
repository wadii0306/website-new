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
    const response = await api.post("/website", contactData)
    return response.data
  },
}