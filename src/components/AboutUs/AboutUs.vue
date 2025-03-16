<script setup lang="ts">
import { onMounted, ref} from 'vue';
import DefaultCard from '../Forms/DefaultCard.vue';
import icon from "@/assets/images/favicon.ico";
import { blobToBase64, resizeImage } from '@/utils/resizeImage';
import type { AboutUs } from '@/types/AboutUs';
import { addAboutUs, updateAboutUs, fetchAboutUs } from '@/services/aboutUsService';

const id = ref("");
const vision = ref('');
const mission = ref('');
const foundedOn = ref("");
const foundedBy = ref('');
const info = ref("");

const loading = ref(false);
const visionError = ref(false);
const foundedOnError = ref(false);
const missionError = ref(false);
const foundedByError = ref(false);
const buttonTitle = ref("Add About Detail");

onMounted(async () => {
    await fetchAbout();
})

const fetchAbout = async () => {
    const about = await fetchAboutUs();
    console.log(about)
    
    if (about && about.id != null) {
        buttonTitle.value = "Edit About Detail";
        vision.value = about.vision;
        mission.value = about.mission;
        foundedOn.value = new Date(about.foundedOn).toISOString().split('T')[0] ;
        foundedBy.value = about.foundedBy;
        info.value = about.info || "";
    }
}

const removeError = (field: string) => {
    if (field === 'address') visionError.value = false;
    if (field === 'copyRightDate') foundedOnError.value = false;
    if (field === 'postalCode') missionError.value = false;
    if (field === 'state') foundedByError.value = false;
};

const handleSubmit = async (event: Event) => {
    event.preventDefault();
    loading.value = true;

    // Reset errors
    visionError.value = false;
    foundedOnError.value = false;
    missionError.value = false;
    foundedByError.value = false;

    let hasError = false;

    if (!vision.value) {
        visionError.value = true;
        hasError = true;
    }
    if (!foundedOn.value) {
        foundedOnError.value = true;
        hasError = true;
    }
    if (!mission.value) {
        missionError.value = true;
        hasError = true;
    }
    if (!foundedBy.value) {
        foundedByError.value = true;
        hasError = true;
    }

    if (hasError) {
        loading.value = false;
        return;
    }

    const aboutDetail: AboutUs = {
        mission: mission.value,
        vision: vision.value,
        foundedBy: foundedBy.value,
        info: info.value,
        foundedOn: foundedOn.value,
    }
    console.log("id", id.value)
    if (id.value == "") 
        await addAboutUs(aboutDetail);
    else 
        await updateAboutUs(id.value, aboutDetail);

    loading.value = false;
};

</script>
<template>
    <DefaultCard cardTitle="Add Contact Us">
        <form @submit="handleSubmit" class="grid grid-cols-1 gap-6 p-6">
            <!-- Form Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="col-span-full">
                    <label class="block text-sm font-semibold">Vision <span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <textarea rows="4" placeholder="vision" v-model="vision"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', visionError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('vision')" />
                </div>

                <div class="col-span-full">
                    <label class="block text-sm font-semibold">Mission<span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <textarea rows="4" placeholder="mission" v-model="mission"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', foundedByError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('mission')" />
                </div>

                <!-- Datetime Picker for "From" Field -->
                <div>
                    <label class="block text-sm font-semibold">Founded On<span
                            class="font-bold text-red-600 text-xl">*</span>
                    </label>

                    <input type="date" v-model="foundedOn"
                        :class="['w-full rounded-lg border-[1.5px] text-black bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary', missionError ? 'border-red-500' : 'border-stroke']"
                        @input="removeError('foundedOn')" />
                </div>

                <div>
                    <label class="block text-sm font-semibold">Founded By<span
                        class="font-bold text-red-600 text-xl">*</span>
                    </label>
                    <input type="text" placeholder="foundedBy" v-model="foundedBy"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                        @input="removeError('foundedBy')" />
                </div>

                <div class="col-span-full">
                    <label class="block text-sm font-semibold">Info</label>
                    <textarea rows="4" placeholder="info" v-model="info"
                        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                </div>
            </div>
            
            <!-- Submit Button -->
            <div class="w-full flex justify-center col-span-full">
                <button type="submit"
                    class="mt-4 bg-blue-500 text-white py-2 px-30 rounded-lg flex items-center justify-center transition duration-200 h-10"
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
