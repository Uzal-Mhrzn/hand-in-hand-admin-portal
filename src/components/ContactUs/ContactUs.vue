<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DefaultCard from '../Forms/DefaultCard.vue';
import icon from "@/assets/images/favicon.ico";
import { blobToBase64, resizeImage } from '@/utils/resizeImage';
import type { ContactUs } from '@/types/ContactUs';
import { addContactUs, fetchContactUs, updateContactUs } from '@/services/contactUsService';

const id = ref("");
const address = ref('');
const address2 = ref('');
const copyRightDate = ref('');
const copyRightInfo = ref('');
const postalCode = ref("");
const state = ref("");
const city = ref("");
const contactEmail = ref("");
const contactPhone = ref("");
const contactAdditional = ref("");
const qrCode = ref("");
const loading = ref(false);
const imageError = ref(false);
const addressError = ref(false);
const copyRightDateError = ref(false);
const postalCodeError = ref(false);
const stateError = ref(false);
const cityError = ref(false);
const contactEmailError = ref(false);
const contactPhoneError = ref(false);
const buttonTitle = ref("Add Contact Detail");

onMounted(async () => {
    await fetchContact();
})

const fetchContact = async () => {
    const contacts = await fetchContactUs();
    
    if (contacts.length > 0 && contacts[0].id != null) {
        const contact = contacts[0];
        buttonTitle.value = "Edit Contact Detail";
        address.value = contact.address;
        address2.value = contact.address2 || "";
        copyRightDate.value = contact.copyRightDate || '';
        copyRightInfo.value = contact.copyRightInfo || "";
        postalCode.value = contact.postalCode || "";
        state.value = contact.state;
        city.value = contact.city || "";
        contactEmail.value = contact.contactEmail;
        contactPhone.value = contact.contactPhone;
        contactAdditional.value = contact.contactAdditional;
        qrCode.value = contact.qrCode;
    }
}

const removeError = (field: string) => {
    if (field === 'address') addressError.value = false;
    if (field === 'copyRightDate') copyRightDateError.value = false;
    if (field === 'postalCode') postalCodeError.value = false;
    if (field === 'state') stateError.value = false;
    if (field === 'city') cityError.value = false;
    if (field === 'contactEmail') contactEmailError.value = false;
    if (field === 'contactPhone') contactPhoneError.value = false;
};

const handleSubmit = async (event: Event) => {
    event.preventDefault();
    loading.value = true;

    // Reset errors
    addressError.value = false;
    copyRightDateError.value = false;
    postalCodeError.value = false;
    stateError.value = false;
    cityError.value = false;
    contactEmailError.value = false;
    contactPhoneError.value = false;

    let hasError = false;

    if (!address.value) {
        addressError.value = true;
        hasError = true;
    }
    if (!copyRightDate.value) {
        copyRightDateError.value = true;
        hasError = true;
    }
    if (!postalCode.value) {
        postalCodeError.value = true;
        hasError = true;
    }
    if (!state.value) {
        stateError.value = true;
        hasError = true;
    }
    if (!city.value) {
        cityError.value = true;
        hasError = true;
    }
    if (!contactEmail.value) {
        contactEmailError.value = true;
        hasError = true;
    }
    if (!contactPhone.value) {
        contactPhoneError.value = true;
        hasError = true;
    }

    if (hasError) {
        loading.value = false;
        return;
    }

    const contactDetail: ContactUs = {
        address2: address2.value,
        contactPhone: contactPhone.value,
        address: address.value,
        copyRightInfo: copyRightInfo.value,
        city: city.value,
        contactEmail: contactEmail.value,
        postalCode: postalCode.value,
        state: state.value,
        contactAdditional: contactAdditional.value,
        copyRightDate:  copyRightDate.value,
        qrCode: qrCode.value
    }
    console.log("id", id.value)
    if (id.value == "") 
        await addContactUs(contactDetail);
    else 
        await updateContactUs(id.value, contactDetail);

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
                qrCode.value = await blobToBase64(blob);                
                console.log(contactPhone.value)
                imageError.value = false;
            } catch (error) {
                console.error('Image compression failed:', error);
            } 
        }
    }
};

</script>
<template>
    <DefaultCard cardTitle="Add Contact Us">
        <form @submit="handleSubmit" class="grid grid-cols-1 gap-6 p-6">
            <!-- Form Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Row 1 -->
                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Address <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="Address" v-model="address"
                        :class="['w-full border px-4 py-2 rounded-md', addressError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('address')" />
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Address2</label>
                    <input type="text" placeholder="Address2" v-model="address2"
                        class="w-full border px-4 py-2 rounded-md border-gray-300" />
                </div>

                <!-- Row 2 -->
                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Copy Right Info <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="Enter copyright info" v-model="copyRightInfo"
                        :class="['w-full border px-4 py-2 rounded-md', stateError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('copyRightInfo')" />
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Copy Right Date <span class="text-red-600">*</span></label>
                    <input type="date" v-model="copyRightDate"
                        :class="['w-full border px-4 py-2 rounded-md', postalCodeError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('copyRightDate')" />
                </div>

                <!-- Row 3 -->
                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Postal Code <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="Postal Code" v-model="postalCode"
                        :class="['w-full border px-4 py-2 rounded-md', postalCodeError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('postalCode')" />
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-semibold">State <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="State" v-model="state"
                        :class="['w-full border px-4 py-2 rounded-md', stateError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('state')" />
                </div>

                <!-- Row 4 -->
                <div class="col-span-1">
                    <label class="block text-sm font-semibold">City <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="City" v-model="city"
                        :class="['w-full border px-4 py-2 rounded-md', cityError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('city')" />
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Contact Email <span class="text-red-600">*</span></label>
                    <input type="email" placeholder="Contact Email" v-model="contactEmail"
                        :class="['w-full border px-4 py-2 rounded-md', contactEmailError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('contactEmail')" />
                </div>

                <!-- Row 5 -->
                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Contact Phone <span class="text-red-600">*</span></label>
                    <input type="text" placeholder="Contact Phone" v-model="contactPhone"
                        :class="['w-full border px-4 py-2 rounded-md', contactPhoneError ? 'border-red-500' : 'border-gray-300']"
                        @input="removeError('contactPhone')" />
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-semibold">Additional Contact</label>
                    <input type="text" placeholder="Additional Contact" v-model="contactAdditional"
                        class="w-full border px-4 py-2 rounded-md border-gray-300" />
                </div>
            </div>

            <!-- QR Code Section -->
            <div class="mt-6 flex flex-col items-center justify-center">
                <label class="block text-sm font-semibold">QR Code <span class="text-red-600">*</span></label>
                <div class="relative">
                    <img :src="qrCode !== '' ? qrCode : icon" alt="QR Code"
                        class="w-24 h-24 rounded-lg object-cover border border-gray-300" @error="handleImageError"
                        @load="handleImageLoad" />

                    <!-- Upload Icon -->
                    <label for="file-upload"
                        class="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10l1.829-1.828A2 2 0 016.343 7H8m8 0h1.657a2 2 0 011.514.657L21 10M5 18h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm7-6v6m-4-4l4-4 4 4" />
                        </svg>
                    </label>
                    <input id="file-upload" type="file" class="hidden" @change="onFileChange" accept="image/*" />
                </div>
            </div>

            <!-- Extra Spacing Before Submit Button -->
            <div class="mt-12 flex justify-center">
                <button type="submit"
                    class="px-8 py-3 bg-blue-500 text-white rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :disabled="loading">
                    <span v-if="loading" class="loader mr-2"></span>
                    <span v-else> {{ buttonTitle }}</span>
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
