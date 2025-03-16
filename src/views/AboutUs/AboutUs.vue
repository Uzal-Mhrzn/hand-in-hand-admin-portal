<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AboutUs from '@/components/AboutUs/AboutUs.vue'

</script>
<template>
    <DefaultLayout>
        <div class="flex flex-col">
            <div class="mt-2">
                <AboutUs />
            </div>
        </div>
    </DefaultLayout>
</template>
