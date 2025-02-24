<script setup lang="ts">
import { ref } from 'vue'
import 'cropperjs/dist/cropper.css'
import Cropper from 'vue-cropperjs'
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import type { Events } from '@/types/Events';
//@ts-ignore
import Loader from '@/components/shared/Loader.vue';
import { maxLen, required } from '../Utils/validation';
import { addEvent } from '@/services/eventService';
import { addPhotoAlbum } from '@/services/photoAlbumService';
import type { PhotoAlbums } from '@/types/PhotoAlbums';

// Image and crop-related state
const selectedImage = ref<File | null>(null)
const imagePreview = ref<string | ArrayBuffer | null>(null)
const croppedImage = ref<string | null>(null)
const isDefault = ref<boolean>(false) // State for the default checkbox
const hideUploadButton = ref<boolean>(false);
const showDoneButton = ref<boolean>(false);
const showPreviewImage = ref<boolean>(false);
const cropper = ref(null) // Reference to Cropper instance
const loading = ref(false);
const images = ref<Array<{ file: File; imagePreview: string; uploading: boolean }>>([]);
const imageRows = ref<Array<{ imagePreview: string | ArrayBuffer }>>([]);


let event = ref<Events>({
    id: "",
    title: "",
    description: "",
    participants: "0",
    totalCost: "0",
    eventDate: Date.toLocaleString(),
    coverImage: ""
});

const showCropSection = ref<boolean>(false);

// Handle image selection
const handleImageChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        selectedImage.value = input.files[0]
        showCropSection.value = true;
        // Show a preview of the selected image
        const reader = new FileReader()
        reader.onload = (e) => {
            //@ts-ignore
            imagePreview.value = e.target?.result
        }
        reader.readAsDataURL(selectedImage.value)
        input.value = '';
    }
}

// Handle image selection
const handleUploadImages = async (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;
    const files = Array.from(target.files || []);

    let rowImage: Array<string |ArrayBuffer> = [];
    // Read files and store them as data URLs
    files.forEach(async (file, index) => {
        imageRows.value = [];
        let imageCount = 1;
        console.log(file)
        const reader = new FileReader();
        reader.onload = async (e) => {
            const preview = await e.target?.result ?? '';
            images.value.push({
                file,
                //@ts-ignore
                imagePreview: preview ?? "",
                uploading: false
            });
        };
        reader.readAsDataURL(file);
    });
    
}

const removeImage = () => {
    imagePreview.value = null
    selectedImage.value = null
    croppedImage.value = null
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''  // Reset the file input
}

const resetImageCrop = () => {
    hideUploadButton.value = false;
    imagePreview.value = null
    selectedImage.value = null
    croppedImage.value = null
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''  // Reset the file input
}

// Crop the image
const cropImage = () => {
    console.log(showCropSection)
    if (cropper.value) {
        //@ts-ignore
        croppedImage.value = cropper.value.getCroppedCanvas().toDataURL() // Convert cropped image to base64
        
    } 
    showCropSection.value = false;
    showDoneButton.value = true;
    showPreviewImage.value = true;
    
}

const hideCropSection =() => {
    showCropSection.value = true;
    showDoneButton.value = false;
    showPreviewImage.value = false;
}

const uploadImage = async (eventId: string, image: { file: File; imagePreview: string, uploading: boolean }) => {
    try {
        const body: PhotoAlbums = {
            eventId: eventId,
            image: image.imagePreview,
        }
        await addPhotoAlbum(eventId, body);
    } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error (e.g., notify user)
    }
}

// Modify the submit function to upload each image
const submit = async () => {
    event.value.coverImage = croppedImage.value;
    console.log(event.value);
    try {
        const result = await addEvent(event.value);
        console.log('Event uploaded successfully', result);

        // Upload each image
        images.value.map(image => image.uploading = true);
        for (const image of images.value) {
            await uploadImage(result.id, image);
            image.uploading = false;
        }
    } catch (error) {
        console.error('Error uploading event:', error);
    }
}

</script>
<template>
    <template v-if="loading">
        <tr class="d-flex flex-fill justify-center align-center">
            <Loader></Loader>
        </tr>
    </template>
    <template v-else>
        <div class="overflow-hidden rounded-lg bg-white shadow mt-5 py-6 px-8">
            <v-form ref="form">
                <div class="px-4 sm:px-6">
                    <!-- First Row (Title and Event Date) -->
                    <div class="flex flex-wrap -mx-4 mb-6">
                        <div class="w-full sm:w-1/2 px-4">
                            <label for="title" class="block text-sm font-medium text-gray-900 mb-2">Title</label>
                            <input type="text" v-model="event.title" :rules="[required, maxLen(event.title, 250)]"
                                placeholder="Event Title"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="w-full sm:w-1/2 px-4">
                            <label for="event-date" class="block text-sm font-medium text-gray-900 mb-2">Event
                                Date</label>
                            <input type="date" v-model="event.eventDate" :rules="[required]"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <!-- Second Row (Description) -->
                    <div class="mb-6">
                        <label for="description"
                            class="block text-sm font-medium text-gray-900 mb-2">Description</label>
                        <textarea v-model="event.description" placeholder="Event Description"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    <!-- Third Row (Total Participants and Total Cost) -->
                    <div class="flex flex-wrap -mx-4 mb-6">
                        <div class="w-full sm:w-1/2 px-4">
                            <label for="participants" class="block text-sm font-medium text-gray-900 mb-2">Total
                                Participants</label>
                            <input type="text" v-model="event.participants" placeholder="Total Participants"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="w-full sm:w-1/2 px-4">
                            <label for="total-cost" class="block text-sm font-medium text-gray-900 mb-2">Total
                                Cost</label>
                            <input type="text" v-model="event.totalCost" placeholder="Total Cost"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>


                    <!-- Image Upload Section -->
                    <div class="p-4 bg-white dark:bg-boxdark rounded-lg shadow-md mt-6">

                        <div v-if="!imagePreview && !hideUploadButton" class="flex items-center justify-start">
                            <label for="file-upload"
                                class="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue hover:bg-blue-700 hover:shadow transition duration-150">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0L8 12m4-4v12" />
                                </svg>
                                Choose Cover Photo
                            </label>
                            <input id="file-upload" type="file" accept="image/*" class="hidden"
                                @change="handleImageChange" />
                        </div>

                        <!-- Image Preview with Cropper -->
                        <div v-if="imagePreview && showCropSection == true" class="relative mt-4">
                            <Cropper :src="imagePreview" ref="cropper" aspect-ratio="16/9" view-mode="1"
                                class="w-full h-[400px] max-w-full" style="object-fit: cover;" />
                            <button @click="removeImage"
                                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>

                        <div v-if="imagePreview" class="mt-4">
                            <button v-if="showCropSection" @click="cropImage" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                                {{ 'Crop Image' }}
                            </button>
                        </div>

                        <div v-if="showPreviewImage" class="cropped-preview mt-4 relative">
                            <img :src="croppedImage??''" alt="Cropped Image" class="max-w-full h-auto rounded-lg" />
                            <!-- Close button positioned at top-right of the image -->
                            <button @click="resetImageCrop"
                                class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <i class="fa fa-times"></i>
                            </button>

                            <div v-if="showDoneButton" class="flex items-center justify-start mt-4">
                                <div class="flex flex-center">
                                    <label for="done-cropping"
                                        class="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg tracking-wide border border-blue hover:bg-blue-700 hover:shadow transition duration-150">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0L8 12m4-4v12" />
                                        </svg>
                                        <button  v-if="!showCropSection" @click="hideCropSection" >
                                            {{ 'Crop Again' }}
                                        </button>
                                    </label>
                                   
                                </div>

                                <div>
                                    <label for="file-upload"
                                        class="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg tracking-wide border border-blue hover:bg-blue-700 hover:shadow transition duration-150">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0L8 12m4-4v12" />  
                                        </svg>
                                        <input id="file-upload" type="file" accept="image/*" class="hidden" multiple
                                        @change="handleUploadImages" />
                                        {{ 'Add Images' }}
                                    </label>
                                    
                                </div>


                            </div>

                            <div v-if="imageRows">
                                <div class="image-row grid grid-cols-4 gap-4">
                                    <div v-for="(image, index) in images" :key="'image-' + String(index)" class="relative">
                                        <img :src="image.imagePreview ?? ''" class="thumbnail" alt="Uploaded Image" />
                                        <div v-if="image.uploading" class="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75">
                                            <Loader /> <!-- Assuming Loader is a component that shows a loading spinner -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <!-- Submit Button -->
                    <div class="flex justify-end pt-6">
                        <button type="button" @click="submit"
                            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Save
                        </button>
                    </div>
                </div>
            </v-form>
        </div>
    </template>
</template>

<style scoped>
.cropped-preview img {
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
}
</style>
