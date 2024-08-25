export const EPIC_SMART_AUTH_URL =
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";
export const EPIC_SMART_TOKEN_URL =
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
export const EPIC_FHIR_R4_URL =
  "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";

export const REDIRECT_URI = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_REDIRECT_URI
  : import.meta.env.VITE_DEV_REDIRECT_URI;
export const CLIENT_ID = import.meta.env.PROD
  ? import.meta.env.VITE_EPIC_PROD_CLIENT_ID
  : import.meta.env.VITE_EPIC_NON_PROD_CLIENT_ID;

export const LS_KEYS = {
  CODE_VERIFIER: "my-health_code_verifier",
  STATE: "my-health_state",
  ACCESS_TOKEN: "my-health_access_token",
  PATIENT_ID: "my-health_patient_id",
};
