export const BASE = 'http://ec2-3-85-90-24.compute-1.amazonaws.com:3000'; // import.meta.env.VITE_BASE_URL;

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
