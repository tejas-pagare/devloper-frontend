// production
// export const BACKEND_BASE_URL = "/api"

// dev
export const BACKEND_BASE_URL = location.hostname==="localhost" ? "http://localhost:3000":"/api";