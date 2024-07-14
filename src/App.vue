<template>
   <h1>Metis Components</h1>
   <div>
      <NestDAQController></NestDAQController>
      <NestDAQStateList></NestDAQStateList>
      <NestDAQStatus></NestDAQStatus>
   </div>
</template>

<script>
import NestDAQController from './components/NestDAQController.vue'
import NestDAQStateList  from './components/NestDAQStateList.vue'
import NestDAQStatus     from './components/NestDAQStatus.vue'

export default {
   data () {
      return {
      }
   },
   components: {
      NestDAQController,
      NestDAQStateList,
      NestDAQStatus
   },
   methods: {
   },
   mounted () {
   }  
}
</script>
