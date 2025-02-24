// src/stores/auth.js or auth.ts (depending on your project setup)
import { defineStore } from 'pinia'

export const usePhotoAlbumStore = defineStore('photoalbums', {
    state: () => ({
        photos: JSON.parse(localStorage.getItem('photos') || '[]'), // Provide default empty array string if null
    }),
    actions: {
        setPhotoAlbums(photos: any) {
            this.photos = photos;
            localStorage.setItem('photos', JSON.stringify(photos)); // Persist token to localStorage
        },
        clearPhotoAlbum() {
            this.photos = null;
            localStorage.removeItem('photos'); // Clear token from localStorage
        },
        clearAll() {
            this.photos = null;
        }
    },
    getters: {
        getPhotoAlbum: (state) => state.photos
    },
})
