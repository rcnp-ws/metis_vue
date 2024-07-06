<template>
   <div>
      Scaler
      <LocalTimestamp></LocalTimestamp>
      {{msg.timestamp}}
      <table>
         <tr v-for="scr in msg.scr" :key="scr.ch">
           <td>{{ scr.ch }}</td><td>{{ scr.val }}</td>
         </tr>
      </table>
   </div>
</template>


<script>
import axios from 'axios'
import LocalTimestamp from './LocalTimestamp.vue';

export default {
   components: { LocalTimestamp },
   data() {
      return {
         msg: {"device":"IDLE"}
      }
   },
   methods: {
      update() {
         axios.get('http://localhost:8000/amqscr/read/192.168.2.160')
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

table {
  border-collapse: collapse;
  //width: 100%;
}
th,
td {
  padding: 0rem 1rem 0rem 0rem;
  font-size: .8rem;
  text-align: right;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
th {
  font-weight: normal;
  font-size: .5rem;
  color: #666;
  background: #eee;
}
img {
  width: 80px;
  display: block;
  margin: 0 auto;
  margin-bottom: .5rem;
}
</style>