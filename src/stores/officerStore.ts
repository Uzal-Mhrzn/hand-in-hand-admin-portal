// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'
import type { Officers } from "@/types/Officers";

export const useOfficerStore = defineStore('officers', {
    state: () => ({
        selectedOfficer: JSON.parse(localStorage.getItem('selectedOfficer') || '[]') || null,
        officers: JSON.parse(localStorage.getItem('officers') || '[]') || null,
    }),
    actions: {
        setOfficers(officers: any) {
            this.officers = 
            localStorage.setItem('officers', JSON.stringify(officers))
        },
        selectedOfficer(officer: any) {
            this.selectedOfficer = 
            localStorage.setItem('selectedOfficer', JSON.stringify(officer))
        },
        clearToken() {
            this.officers = null
            localStorage.removeItem('officers')
        }
    },
    getters: {
        getOfficers: (state) => state.officers,
        getSelectedOfficers: (state) => state.selectedOfficer
    }
})
