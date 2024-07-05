<template>
   <div>
      hoge aaaa

      {{msg}}
   </div>
</template>


<script>
import axios from 'axios'

export default {
   data() {
      return {
         msg: {"device":"IDLE"}
      }
   },
   methods: {
      update() {
         axios.get('http://localhost:8000/nestdaq/status/')
        .then((response) => {
            //console.log(response.data);
                this.msg = response.data;
            });
            setTimeout(() => { this.update(); }, 1000);
      }
   },
   mounted() {
      this.update()
   }
}
</script>

<style>
div.state {
border: 1px solid blue;
}
</style>