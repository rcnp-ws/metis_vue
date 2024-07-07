<template>
   <div>
      Scaler
      <LocalTimestamp></LocalTimestamp>
      Remote : {{msg.timestamp}} at {{ msg.ip }}

<!--
      <table>
         <tr v-for="scr in msg.scr" :key="scr.ch">
           <td>{{ scr.ch }}</td><td>{{ scr.val }}</td>
         </tr>
      </table>
-->      
      <table>
         <tr v-for="(scrcol,irow) in scrs" :key="irow">
            <td v-for="(aScr,icol) in scrcol" :key="icol">{{ aScr }}</td>
         </tr>
      </table>
   </div>
</template>


<script>
import axios from 'axios'
import LocalTimestamp from './LocalTimestamp.vue';

export default {
   components: { LocalTimestamp },
   props: {
      ip: String,
   },
   data() {
      return {
         msg: {"device":"IDLE"},
         nTot: 32,
         nCols: 1,
         nRows: 32,
         scrs: [],
         // 表を整形する
      }
   },
   methods: {
      update() {
         axios.get('http://localhost:8000/scaler/read/'+this.ip)
        .then((response) => {
            //console.log(response.data);
               this.msg = response.data;
               this.nTot = this.msg.scr.length;
               //console.log(this.msg);
               if (this.nTot > 0) {
                  this.nCols = Math.ceil(this.nTot / this.nRows);
                  for (let iscr = 0; iscr < this.nRows; ++iscr ) {
                     this.scrs[iscr] = [];
                  }
                  for (let iscr = 0; iscr < this.nTot; ++iscr ) {
                     let icol = Math.floor(iscr/this.nRows);
                     let irow = iscr%this.nRows;
                     this.scrs[irow][2 * icol + 0] = this.msg.scr[irow + icol * this.nRows].ch;
                     this.scrs[irow][2 * icol + 1] = this.msg.scr[irow + icol * this.nRows].val;
                  }
               } else {
                  this.nTot = 0;
                  this.nRows = 0;
                  this.nCols = 0;
               }
            });
            setTimeout(() => { this.update(); }, 1000);
      }
   },
   mounted() {
      //console.log(this.ip);
      this.update();

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