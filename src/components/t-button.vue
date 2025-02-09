// reference  https://codesandbox.io/s/vue-tailwind-button-component-rsz2s?file=/src/App.vue

<template>
   <button
   class="btn font-medium items-center cursor-pointer border shadow hover:shadow-lg focus:outline-none focus:shadow-outline btn-teal-outline ">
   <slot></slot>
   </button>
 </template>
 <script>
import { defineComponent} from 'vue'

 export default defineComponent({
   props: {
   },

   setup() {
   }
 });
 </script>


<style scoped>
.btn-indigo {
@apply bg-indigo-600 text-indigo-100 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white;
}
.btn-teal {
@apply bg-teal-600 text-teal-100 border-teal-600 hover:bg-teal-700 hover:border-teal-700 hover:text-white;
}

.btn-teal-outline {
@apply border-teal-600 bg-white text-teal-600 hover:bg-teal-600 hover:border-teal-600 hover:text-white;
}

.btn-indigo-outline {
@apply border-indigo-600 bg-white text-indigo-600 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white;
}

.btn-purple {
   @apply bg-purple-600 text-purple-100 border-purple-600 hover:bg-purple-700 hover:border-purple-700 hover:text-white;
}

.btn-red {
   @apply bg-red-600 text-red-100 border-red-600 hover:bg-red-700 hover:border-red-700 hover:text-white;
}

</style>