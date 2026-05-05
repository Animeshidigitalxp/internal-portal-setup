import axios from "axios";

const api = axios.create({
  baseURL: "https://demo-ai-agent-app.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
