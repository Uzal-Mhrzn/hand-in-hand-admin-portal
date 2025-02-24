<script setup lang="ts">
import { ref, watch } from 'vue';

// Define props including modelValue and errorMessage, with default value for errorMessage
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,    // Prop for v-model support
  errorMessage: {
    type: String,
    default: '',         // Default value is an empty string, making it optional
  },
});

// Emit function to send updates to the parent component
const emit = defineEmits(['update:modelValue']);

// Create a local reference to store the input value
const localValue = ref(props.modelValue);

// Watch for changes in the modelValue prop and update the local value
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

// Emit update when local value changes
const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  localValue.value = value;  // Update local value
  emit('update:modelValue', value);  // Emit the update event
};
</script>

<template>
  <div class="mb-4">
    <!-- Label for the input field -->
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    
    <!-- Input field with conditional border color -->
    <div class="relative">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        v-model="localValue"
        @input="updateValue"
        class="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
        :class="{ 'border-red-500': props.errorMessage, 'border-stroke': !props.errorMessage, 'dark:border-form-strokedark': !props.errorMessage }"
      />

      <!-- Slot for any icons or elements -->
      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>

    <!-- Error message display -->
    <p v-if="props.errorMessage" class="mt-2 text-[12px] text-red-500">{{ props.errorMessage }}</p>
  </div>
</template>
