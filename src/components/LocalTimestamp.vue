<template>
   <div class="timestamp">
      {{ timestamp }}
   </div>
</template>


<script>
import TS from '../utilities/Timestamp'
export default {
   setup() {
      
   },
   data() {
      return {
         timestamp : "timestamp"
      }
   },
   computed: {

   },
   methods: {

      update() {
         // const now = new Date();
         this.timestamp = TS.strFromSec();
         setTimeout(() => { this.update(); }, 1000);
      }
   },
   mounted() {
      this.update()
   }
}
</script>

<style>
div.timestamp {
   font-size: 1.5rem;
}
</style>