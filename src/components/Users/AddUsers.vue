<script setup lang="ts">
import { ref } from 'vue';
import DefaultCard from '../Forms/DefaultCard.vue';
import maleDummy from "@/assets/images/profile/user-male.jpg";
import femaleDummy from "@/assets/images/profile/user-female.jpg";
import { blobToBase64, resizeImage } from '@/utils/resizeImage';
import { addOfficer } from '@/services/officerService';
import type { Officers } from '@/types/Officers';

const fullName = ref('');
const email = ref('');
const address = ref('');
const designation = ref('');
const designatedFrom = ref("");
const shortIntro = ref("");
const isActive = ref(true);
const contact = ref("");
const userImage = ref("");
const loading = ref(false);
const imageError = ref(false);
const fullNameError = ref(false);
const emailError = ref(false);
const designatedFromError = ref(false);
const designationError = ref(false);

const removeError = (field: string) => {
    if (field === 'fullName') fullNameError.value = false;
    if (field === 'email') emailError.value = false;
    if (field === 'designatedFrom') designatedFromError.value = false;
    if (field === 'designation') designationError.value = false;
};

const handleSubmit = async (event: Event) => {
    event.preventDefault();
    loading.value = true;

    // Reset errors
    fullNameError.value = false;
    emailError.value = false;
    designatedFromError.value = false;
    designationError.value = false;

    let hasError = false;

    if (!fullName.value) {
        fullNameError.value = true;
        hasError = true;
    }
    if (!email.value) {
        emailError.value = true;
        hasError = true;
    }
    if (!designatedFrom.value) {
        designatedFromError.value = true;
        hasError = true;
    }
    if (!designation.value) {
        designationError.value = true;
        hasError = true;
    }

    if (hasError) {
        loading.value = false;
        return;
    }

    const officer: Officers = {
        email: email.value,
        profilePic: userImage.value,
        name: fullName.value,
        designation: designation.value,
        address: address.value,
        contact: contact.value,
        designatedFrom: designatedFrom.value,
        shortIntro: shortIntro.value,
    }

    const item = await addOfficer(officer);

    loading.value = false;
};

const handleImageLoad = () => {
    imageError.value = false; // Reset error state on successful load
};
const handleImageError = () => {
    imageError.value = true;
};

const fileSizeWarning = ref<boolean>(false);

const onFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file)
    if (file) {
        if (file.size > 2048000) {
            fileSizeWarning.value = true;
        } else {
            fileSizeWarning.value = false;

            try {
                const { blob, fileName } = await resizeImage(file, 1200, 1200, 0.5);
                userImage.value = await blobToBase64(blob);                
                console.log(userImage.value)
                imageError.value = false;
            } catch (error) {
                console.error('Image compression failed:', error);
            } 
        }
    }
};

</script>
<template>
    <DefaultCard cardTitle="Add Users">
        <form @submit="handleSubmit" class="grid grid-cols-1 gap-6 p-6">
            <!-- Profile Picture Section with Active Status -->
            <div class="flex justify-center items-center col-span-full relative">
                <div class="relative size-24">
                    <!-- Profile Picture -->
                    <img v-if="!imageError" :src="userImage != '' ? userImage: maleDummy" alt="Profile Picture"
                        class="size-24 rounded-lg object-cover" 
                        @error="handleImageError" @load="handleImageLoad" />

                    <!-- Default Image -->
                    <div v-else class="w-full h-full flex justify-center items-center bg-gray-200 rounded-lg">
                        <img :src="maleDummy" alt="Profile Picture"
                        class="size-24 rounded-lg object-cover" 
                         />
                    </div>

                    <!-- Camera Icon -->
                    <label for="file-upload"
                        class="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10l1.829-1.828A2 2 0 016.343 7H8m8 0h1.657a2 2 0 011.514.657L21 10M5 18h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm7-6v6m-4-4l4-4 4 4" />
                        </svg>
                    </label>
                    <input id="file-upload" ref="fileUploaderRef" type="file" class="hidden" @change="onFileChange"
                        accept="image/*" />
                </div>

                <!-- Active Status Indicator -->
                <div class="absolute -top-0 left-0 flex items-center space-x-2">
                    <div :class="isActive ? 'bg-green-500' : 'bg-red-500'" class="w-3 h-3 rounded-full"></div>
                    <span :class="isActive ? 'text-green-500' : 'text-red-500'">{{ isActive ? 'Active' : 'Inactive'
                        }}</span>
                </div>
            </div>

            <!-- Form Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">Full Name <span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <input type="text" placeholder="Full Name" v-model="fullName"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', fullNameError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('fullName')" />
                </div>

                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">Email<span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <input type="email" placeholder="Email" v-model="email"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', emailError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('email')" />
                </div>

                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">Designation<span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <input type="text" placeholder="Role" v-model="designation"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', designationError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('designation')" />
                </div>

                <!-- Datetime Picker for "From" Field -->
                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">From<span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>

                    <input type="date" v-model="designatedFrom"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', designatedFromError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('designatedFrom')" />
                </div>

                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">Address</label>
                    <input type="text" placeholder="Address" v-model="address"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                </div>

                <div>
                    <label class="mb-3 block text-sm text-black dark:text-white">Contact</label>
                    <input type="text" placeholder="Contact" v-model="contact"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                </div>

                <!-- Full Row Textarea for Intro -->
                <div class="col-span-full">
                    <label class="mb-3 block text-sm text-black dark:text-white">Intro</label>
                    <textarea v-model="shortIntro" rows="4"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="w-full flex justify-center col-span-full">
                <button type="submit"
                    class="mt-4 bg-blue-500 text-white py-2 px-30 rounded-lg flex items-center justify-center transition duration-200 h-10"
                    :disabled="loading">
                    <span v-if="loading" class="loader mr-2"></span>
                    <span v-else>Add User</span>
                </button>
            </div>
        </form>
    </DefaultCard>
</template>



<style>
.loader {
    border: 2px solid white;
    border-top: 2px solid transparent;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
