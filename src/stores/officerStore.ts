// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const useOfficerStore = defineStore('officers', {
    state: () => ({
        officers: JSON.parse(localStorage.getItem('officers') || '[]') || null,
    }),
    actions: {
        setOfficers(officers: any) {
            this.officers = 
            localStorage.setItem('officers', JSON.stringify(officers))
        },
        clearToken() {
            this.officers = null
            localStorage.removeItem('officers')
        }
    },
    getters: {
        getOfficers: (state) => state.officers
    }
})
