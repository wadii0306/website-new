import axios from "axios"

// Same-origin client for /api/* routes (contact form proxy).
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
})

export default api
