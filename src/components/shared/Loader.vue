<template>
    <div class="overlay"></div>
    <div class="loader-container">
      <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div class="w-24 h-24 border-4 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-600 rounded-full absolute">
        </div>
  
          <img :src="loadingImg" alt="Loading..." class="w-8 h-8 animate-ping1 relative z-10 opacity-90" />
        </div>
  
        <!-- <div class="w-20 h-20 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin" ></div> -->
  
  
    </div>
  </template>
  
  <script setup>
  import loader from '@/assets/images/loader.svg';
  const loadingImg = loader;
  </script>
  <style scoped>
  /* ... existing styles ... */
  
  .animate-ping1 {
    animation: ping 2s infinite; /* Adjust the duration as needed */
  }
  
  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  </style>