<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsersTable from '@/components/Users/UsersTable.vue'
import AddUsers from '@/components/Users/AddUsers.vue'
import type { Officers } from '@/types/Officers'

// Reactive variable to track the active tab
const activeTab = ref('manage');
const newTab = ref(true);

// Store the selected user
const selectedUser = ref<Officers | null>(null);
// Function to handle user selection for editing
const editUser = (user: Officers) => {
    selectedUser.value = user;
    newTab.value = false; 
    activeTab.value = 'add';
};

const addNewUser = () => {
    selectedUser.value = null; // Reset form fields
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
                    class="px-4 py-2 focus:outline-none" @click="addNewUser">
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
                <UsersTable v-if="activeTab === 'manage'"  @edit-user="editUser" />

                <!-- Show AddUsers when 'Add' tab is active -->
                <AddUsers v-else :user="selectedUser" :newTab="newTab" />
            </div>
        </div>
    </DefaultLayout>
</template>
