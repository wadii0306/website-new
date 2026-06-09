import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL

if (!baseURL && typeof window !== "undefined") {
  console.error(
    "NEXT_PUBLIC_API_URL is not set. Contact form and API calls will fail."
  )
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
})

export default api
