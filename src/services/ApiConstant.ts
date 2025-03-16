export const BASE = import.meta.env.VITE_BASE_URL;

const LOGIN = "/auth/login";
const EVENTS = "/events";
const PHOTOALBUMS = "/events/{id}/albums";
const OFFICERS = "/officers";
const ABOUTUS = "/aboutus";
const CONTACTUS = "/contactus";

//login
export const apiConstants = {
  LOGIN: BASE.concat(LOGIN),
  EVENTS: BASE.concat(EVENTS),
  PHOTOALBUMS: BASE.concat(PHOTOALBUMS),
  OFFICERS: BASE.concat(OFFICERS),
  ABOUTUS: BASE.concat(ABOUTUS),
  CONTACTUS: BASE.concat(CONTACTUS),
}
