// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const useEventStore = defineStore('events', {
    state: () => ({
        events: JSON.parse(localStorage.getItem('events') || '[]'), // Provide default empty array string if null
    }),
    actions: {
        setEvents(events: any) {
            this.events = events;
            localStorage.setItem('events', JSON.stringify(events)); // Persist token to localStorage
        },
        clearEvents() {
            this.events = null;
            localStorage.removeItem('events'); // Clear token from localStorage
        },
        clearAll() {
            this.events = null;
        }
    },
    getters: {
        getEvents: (state) => state.events
    },
})
