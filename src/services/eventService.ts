import { useEventStore } from "@/stores/eventStore";
import { apiConstants } from "./ApiConstant";
import { Delete, Fetch, Post } from "./ApiService";
import type { Events } from "@/types/Events";

export async function fetchEvents(): Promise<Events[]> {
  const eventState = useEventStore()

  const events = await Fetch(apiConstants.EVENTS);
  eventState.setEvents(events);
  return events;
}

export async function addEvent(body: Events) {
  const eventState = useEventStore()
  
  console.log(body)
  const events = await Post(apiConstants.EVENTS, body, {"Content-Type": "application/json"});
  eventState.setEvents(events);
  return events;
}

export async function deleteEventItem(eventId: string) {
  return await Delete(`${apiConstants.EVENTS}/${eventId}`);
}
