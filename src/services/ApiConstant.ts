export const BASE = 'https://hq56d6ir59.execute-api.us-east-1.amazonaws.com/dev'; // import.meta.env.VITE_BASE_URL;

const LOGIN = "/auth/login";
const EVENTS = "/events";
const PHOTOALBUMS = "/events/{id}/album";
const OFFICERS = "/officers";

//login
export const apiConstants = {
  LOGIN: BASE.concat(LOGIN),
  EVENTS: BASE.concat(EVENTS),
  PHOTOALBUMS: BASE.concat(PHOTOALBUMS),
  OFFICERS: BASE.concat(OFFICERS),
}
