const API_URL = "http://localhost:8080";

export function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  };
}

export default API_URL;
