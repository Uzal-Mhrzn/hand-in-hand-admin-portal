// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const useAboutUsStore = defineStore('aboutus', {
    state: () => ({
        aboutUs: JSON.parse(localStorage.getItem('aboutus') || '{}'), // Provide default empty array string if null
    }),
    actions: {
        setAboutUs(aboutUs: any) {
            this.aboutUs = aboutUs;
            localStorage.setItem('aboutus', JSON.stringify(aboutUs));
        },
        clearAboutUs() {
            this.aboutUs = null;
            localStorage.removeItem('aboutus'); // Clear token from localStorage
        },
        clearAll() {
            this.aboutUs = null;
        }
    },
    getters: {
        getAboutUs: (state) => state.aboutUs
    },
})
