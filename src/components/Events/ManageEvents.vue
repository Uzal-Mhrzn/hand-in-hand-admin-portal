<script setup lang="ts">
import { deleteEventItem, fetchEvents } from '@/services/eventService';
import { useEventStore } from '@/stores/eventStore';
import type { Events } from '@/types/Events';
import { ref, computed, onMounted } from 'vue'

const eventData = ref([
    {
        id: '1',
        title: 'Event 1',
        eventDate: '2024-Aug-01',
        coverImage: '',
        isActive: true,
        description: '',
        participants: '0',
        totalCost: '0'
    }
]);

const currentPage = ref(1)
const perPage = ref(10)
const eventState = useEventStore();

onMounted(async () => {
    await fetch();
})

async function fetch() {
    console.log(eventState.getEvents)
    if (!Array.isArray(eventState.getEvents) || eventState.getEvents.length == 0) {
        await fetchEvents();
    }
    eventData.value = eventState.getEvents;
}


// Compute paginated data
const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return eventData.value.slice(start, end)
})

// Handle page changes
const totalPages = computed(() => Math.ceil(eventData.value.length / perPage.value))

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

function formatDate(datetime: string) {
    if (!datetime) return "";
    const date = new Date(datetime);
    return date.toLocaleDateString();
}

// Handle edit and delete actions
const editEvent = (event: Events) => {
    
}

const deleteEvent = async (event: Events) => {
    if (event.id) {
        await deleteEventItem(event.id);
        eventData.value = eventData.value.filter(e => e.id !== event.id);
        await fetchEvents();
    }
}
</script>

<template>

    <div class="flex flex-col bg-white  dark:bg-boxdark p-2">
        <!-- Table Headers -->
        <div class="grid grid-cols-12 gap-4 rounded-sm bg-gray-1 border-b-2 border-gray-200 dark:bg-meta-4">
            <div class="col-span-3 sm:col-span-3 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Title</h5>
            </div>
            <div class="col-span-2 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Date</h5>
            </div>
            <div class="col-span-4 sm:col-span-4 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Main Image</h5>
            </div>
            <div class="col-span-1 sm:col-span-1 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Is Default</h5>
            </div>
            <div class="col-span-2 sm:col-span-2 flex items-center p-2.5">
                <h5 class="text-sm font-medium uppercase xsm:text-base">Action</h5>
            </div>
        </div>

        <!-- Table Rows -->
        <div v-for="(event, key) in paginatedData" :key="key" :class="`grid grid-cols-12 gap-4 ${key === paginatedData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`">
            <div class="col-span-3 sm:col-span-3 flex items-center p-2.5">
                <p class="hidden text-black dark:text-white sm:block">
                    <span> {{ event.title }}</span>
                </p>
            </div>

            <div class="col-span-2 sm:col-span-2 flex items-center p-2.5">
                <p class="hidden text-black dark:text-white sm:block">
                    <span> {{ formatDate(event.eventDate) }}</span>
                </p>
            </div>

            <div class="col-span-4 sm:col-span-4 flex items-center p-2.5">
                <p class="hidden text-black dark:text-white sm:block">
                    <img v-if="event.coverImage" :src="event.coverImage" alt="Event Image"
                        class="w-80 h-20 rounded-lg" />
                    <span v-else>No image available</span>
                </p>
            </div>

            <div class="col-span-1 sm:col-span-1 flex items-center p-2.5">
                <p class="hidden text-black dark:text-white sm:block">
                    {{ event.isActive ? 'Default' : 'False' }}
                </p>
            </div>

            <div class="col-span-1 sm:col-span-1 flex items-center p-2.5">
                <i @click="editEvent(event)" class="fa fa-edit pr-2 cursor-pointer" style="color:green"></i>
                <span class="cursor-pointer pr-2">Edit</span>
                &nbsp;
                <i class="fa fa-trash pr-2 cursor-pointer" style="color:red" @click="deleteEvent(event)"></i><span
                    class="cursor-pointer">Delete</span>
            </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="eventData.length > 5" class="flex justify-between mt-4 mb-4">
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
