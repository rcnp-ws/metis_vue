<template>
   <div class="timestamp">
      {{ timestamp }}
   </div>
</template>


<script>
import NF from '../utilities/NumberFormat';
export default {
   setup() {
      
   },
   data() {
      return {
         timestamp : "timestamp"
      }
   },
   methods: {
      update() {
         const now = new Date();
         const year = now.getFullYear();
         const month = NF.zeroPadding(now.getMonth()+1,2)
         const day =  NF.zeroPadding(now.getDate(),2)
         const hh = NF.zeroPadding(now.getHours(),2)
         const mm = NF.zeroPadding(now.getMinutes(),2)
         const ss = NF.zeroPadding(now.getSeconds(),2)
         const tzhh = NF.zeroPadding(Math.abs(now.getTimezoneOffset()/60),2)
         const tzmm = NF.zeroPadding(Math.abs(now.getTimezoneOffset())%60,2)

         const tzstr =(now.getTimezoneOffset() < 0 ? "+" : "-") + tzhh + ":" + tzmm;
         this.timestamp = year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss + " " + tzstr ;
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
   font-size: 2rem;
}
</style>