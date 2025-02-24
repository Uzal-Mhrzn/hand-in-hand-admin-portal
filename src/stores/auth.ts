// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null, // Initially load token from localStorage
        name: localStorage.getItem('name') || null,
        designation: localStorage.getItem('designation') || null,
    }),
    actions: {
        setToken(newToken: any) {
            this.token = newToken
            localStorage.setItem('token', newToken) // Persist token to localStorage
        },
        setName(name: string) {
            this.name = name
            localStorage.setItem('name', name) // Persist token to localStorage
        },
        setDesignation(designation: any) {
            this.designation = designation
            localStorage.setItem('designation', designation) // Persist token to localStorage
        },
        clearToken() {
            this.token = null
            localStorage.removeItem('token') // Clear token from localStorage
        },
        clearName() {
            this.name = null
            localStorage.removeItem('name') // Clear token from localStorage
        },
        clearDesignation() {
            this.designation = null
            localStorage.removeItem('designation') // Clear token from localStorage
        },
        clearAll() {
            this.clearToken();
            this.clearName();
            this.clearDesignation();
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token, // Check if the user is authenticated
        getToken: (state) => state.token,
        getName: (state) => state.name,
        getDesignation: (state) => state.designation,
    }
})
