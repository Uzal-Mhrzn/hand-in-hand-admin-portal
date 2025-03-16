// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const useContactUsStore = defineStore('contactus', {
    state: () => ({
        contactus: JSON.parse(localStorage.getItem('contactus') || '[]'), // Provide default empty array string if null
    }),
    actions: {
        setContactUs(contactus: any) {
            this.contactus = contactus;
            localStorage.setItem('contactus', JSON.stringify(contactus));
        },
        clearContactUs() {
            this.contactus = null;
            localStorage.removeItem('contactus'); // Clear token from localStorage
        },
        clearAll() {
            this.contactus = null;
        }
    },
    getters: {
        getContactUs: (state) => state.contactus
    },
})
