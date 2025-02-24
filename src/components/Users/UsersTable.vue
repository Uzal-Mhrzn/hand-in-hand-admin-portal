<script setup lang="ts">
import { deleteOfficer, fetchOfficers } from '@/services/officerService';
import { useOfficerStore } from '@/stores/officerStore';
import type { Officers } from '@/types/Officers';
import { ref, computed, onMounted } from 'vue'

const officersData = ref<Officers[]>([]);

const officerState = useOfficerStore();
const currentPage = ref(1)
const perPage = ref(5)

// Compute paginated data
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return officersData.value?.slice(start, end)
})

// Handle page changes
const totalPages = computed(() => Math.ceil(officersData.value?.length / perPage.value || 1))

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

onMounted(async () => {
    await fetch();
})

const setDefaultImage = (event: any) => {
    event.target.outerHTML = `
<svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="m 4 1 c -1.644531 0 -3 1.355469 -3 3 v 1 h 1 v -1 c 0 -1.109375 0.890625 -2 2 -2 h 1 v -1 z m 2 0 v 1 h 4 v -1 z m 5 0 v 1 h 1 c 1.109375 0 2 0.890625 2 2 v 1 h 1 v -1 c 0 -1.644531 -1.355469 -3 -3 -3 z m -5 4 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m -5 1 v 4 h 1 v -4 z m 13 0 v 4 h 1 v -4 z m -4.5 2 l -2 2 l -1.5 -1 l -2 2 v 0.5 c 0 0.5 0.5 0.5 0.5 0.5 h 7 s 0.472656 -0.035156 0.5 -0.5 v -1 z m -8.5 3 v 1 c 0 1.644531 1.355469 3 3 3 h 1 v -1 h -1 c -1.109375 0 -2 -0.890625 -2 -2 v -1 z m 13 0 v 1 c 0 1.109375 -0.890625 2 -2 2 h -1 v 1 h 1 c 1.644531 0 3 -1.355469 3 -3 v -1 z m -8 3 v 1 h 4 v -1 z m 0 0" fill="#2e3434" fill-opacity="0.34902"></path>
    </svg>`;
};

async function fetch() {
    console.log(officerState.getOfficers)
    if (!Array.isArray(officerState.getOfficers) || officerState.getOfficers.length == 0) {
        await fetchOfficers();
    }
    officersData.value = officerState.getOfficers;
}

// Handle edit and delete actions
const editUser = (officer: Officers) => {

}

const deleteUser = async (officer: Officers) => {
    if (officer.id) {
        deleteOfficer(officer.id);
        officersData.value = officersData.value.filter(o => o.id !== officer.id);
        await fetchOfficers();
    }
}

const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); // Formats the date to 'MM/DD/YYYY'
}
</script>

<template>

    <div class="flex flex-col bg-white p-2 dark:bg-boxdark">
        <!-- Table Headers -->
        <div class="grid grid-cols-10 gap-4 rounded-sm bg-gray-1 border-b-2 border-gray-200 dark:bg-meta-4">
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Picture</h5>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Name</h5>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Designation</h5>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Designated From</h5>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Action</h5>
            </div>
        </div>

        <!-- Table Rows -->
        <div v-for="(officer, key) in paginatedData" :key="key"
            :class="`grid grid-cols-10 gap-4 ${key === paginatedData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`">
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <img :src="officer.profilePic" @error="setDefaultImage" :alt="officer.name"
                    class="w-12 h-12 flex-none rounded-full object-contain" />
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <p class="hidden text-black dark:text-white sm:block">{{ officer.name }}</p>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <p class="text-meta-3">{{ officer.designation }}</p>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <p class="text-meta-3">{{ formatDate(officer.designatedFrom) }}</p>
            </div>
            <div class="col-span-12 sm:col-span-2 flex items-center p-2.5">
                <button class="mr-2 bg-blue-500 text-white px-3 py-1 rounded" @click="editUser(officer)">
                    <i class="fa fa-edit pr-2 cursor-pointer"></i>Edit
                </button>
                <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(officer)">
                    <i class="fa fa-trash pr-2 cursor-pointer"></i>Delete
                </button>
            </div>
        </div>



        <!-- Pagination Controls -->
        <div class="flex justify-between mt-4 mb-4">
            <div class="flex gap-2">
                <button class="w-25 bg-gray-300 text-black px-4 py-2 rounded" :disabled="currentPage === 1"
                    @click="prevPage">
                    Previous
                </button>
                <button class="w-25 bg-gray-300 text-black px-4 py-2 rounded" :disabled="currentPage === totalPages"
                    @click="nextPage">
                    Next
                </button>
            </div>
            <p>Page {{ currentPage }} of {{ totalPages }}</p>
        </div>

    </div>
</template>
