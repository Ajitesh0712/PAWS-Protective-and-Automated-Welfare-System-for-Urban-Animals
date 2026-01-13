import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const uploadReport = (formData) =>
  API.post("/upload-report", formData);

export const getReports = () =>
  API.get("/reports");
