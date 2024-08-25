import { EPIC_FHIR_R4_URL, LS_KEYS } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

export const fhirApi = axios.create({
  baseURL: EPIC_FHIR_R4_URL,
  headers: {
    "Content-Type": "application/fhir+json",
    Authorization: `Bearer ${getCookie(LS_KEYS.ACCESS_TOKEN)}`,
  },
});

fhirApi.interceptors.request.use((config) => {
  const access_token = getCookie(LS_KEYS.ACCESS_TOKEN);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
