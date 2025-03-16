<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ManageEvents from '@/components/Events/ManageEvents.vue';
import AddEvents from '@/components/Events/AddEvents.vue';
import type { Events } from '@/types/Events';

// Reactive variable to track the active tab
const activeTab = ref('manage');
const newTab = ref(true);

// Store the selected user
const selectedEvent = ref<Events | null>(null);
// Function to handle user selection for editing
const editEvent = (event: Events) => {
    selectedEvent.value = event;
    newTab.value = false; 
    activeTab.value = 'add';
};

const addNewEvent = () => {
    selectedEvent.value = null; // Reset form fields
    newTab.value = true; // Set to true for adding a new user
    activeTab.value = 'add'; // Switch to Add Users tab
};

</script>
<template>
    <DefaultLayout>
        <div class="flex flex-col">
            <!-- Tab Navigation -->
            <div class="flex p-2 bg-white  dark:bg-boxdark">
                <button :class="{ 'border-b-2 border-blue-500': activeTab === 'add' }"
                    class="px-4 py-2 focus:outline-none" @click="addNewEvent">
                    <span class="font-bold">Add</span>
                </button>
                <button :class="{ 'border-b-2 border-blue-500': activeTab === 'manage' }"
                    class="ml-3 px-4 py-2 focus:outline-none" @click="activeTab = 'manage'">
                    <span class="font-bold">Manage</span>
                </button>
            </div>
            <!-- Content based on active tab -->
            <div class="mt-2">
                <!-- Show UsersTable when 'Manage' tab is active -->
                <ManageEvents v-if="activeTab === 'manage'" @edit-event="editEvent"/>

                <!-- Show AddUsers when 'Add' tab is active -->
                <AddEvents v-else :event="selectedEvent" :newTab="newTab"/>
            </div>
        </div>
    </DefaultLayout>
</template>
