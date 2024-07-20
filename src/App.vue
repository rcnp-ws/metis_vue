<template>
   <h1>Metis Components</h1>
   <div>
      <NestDAQController></NestDAQController>
      <NestDAQStateList></NestDAQStateList>
      <NestDAQSoundAlert></NestDAQSoundAlert>
      <!-- ><NestDAQStatus></NestDAQStatus> -->
   </div>
</template>

<script>
import NestDAQController from './components/NestDAQController.vue'
import NestDAQStateList  from './components/NestDAQStateList.vue'
import NestDAQSoundAlert from './components/NestDAQSoundAlert.vue'
//import NestDAQStatus     from './components/NestDAQStatus.vue'

export default {
   data () {
      return {
      }
   },
   components: {
      NestDAQController,
      NestDAQStateList,
      NestDAQSoundAlert,
      //NestDAQStatus
   },
   methods: {
   },
   mounted () {
   }  
}
</script>
