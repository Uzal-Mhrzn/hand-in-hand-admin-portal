<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ContactUs from '@/components/ContactUs/ContactUs.vue'

</script>
<template>
    <DefaultLayout>
        <div class="flex flex-col">
            <div class="mt-2">
                <ContactUs />
            </div>
        </div>
    </DefaultLayout>
</template>
