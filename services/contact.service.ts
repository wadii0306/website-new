import api from "@/lib/api";

// Posts via same-origin /api/contact proxy (avoids browser CORS to api.wadii.in).
export const contactApi = {
  createContact: async (contactData: {
    fullName: string;
    banquetName: string;
    email: string;
    phone: string;
    city: string;
    venueType?: string;
    message?: string;
  }) => {
    const response = await api.post("/contact", contactData);
    return response.data;
  },
};