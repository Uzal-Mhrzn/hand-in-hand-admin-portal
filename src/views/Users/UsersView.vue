<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsersTable from '@/components/Users/UsersTable.vue'
import AddUsers from '@/components/Users/AddUsers.vue'

// Reactive variable to track the active tab
const activeTab = ref('manage')
</script>


<template>
    <DefaultLayout>
        <div class="flex flex-col">
            <!-- Tab Navigation -->
            <div class="flex p-2 bg-white  dark:bg-boxdark">
                <button :class="{ 'border-b-2 border-blue-500': activeTab === 'add' }"
                    class="px-4 py-2 focus:outline-none" @click="activeTab = 'add'">
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
                <UsersTable v-if="activeTab === 'manage'" />

                <!-- Show AddUsers when 'Add' tab is active -->
                <AddUsers v-else />
            </div>
        </div>
    </DefaultLayout>
</template>
