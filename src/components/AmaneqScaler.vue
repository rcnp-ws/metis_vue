<template>
   <div>
      Scaler
      <LocalTimestamp></LocalTimestamp>
      <div v-if="isValid === true">
         Remote : {{ msg.timestamp }} at {{ msg.ip }}
         {{ message }}
      </div>
      <div v-else>{{ ip }} is not available <br /> {{ error }} {{ message }}</div>
      <!--
      <table>
         <tr v-for="scr in msg.scr" :key="scr.ch">
           <td>{{ scr.ch }}</td><td>{{ scr.val }}</td>
         </tr>
      </table>
-->

      <div class="table" v-if="isValid == true">
         <div class="cell" v-for="(scaler, id) in scalers" :key="id">
            <p>{{ id }}</p>
            <p>Frame = {{ scaler.hbfn }} </p>
            {{ scaler.tsstr }}
            <table class="cell" v-for="icol in scaler.nCols" :key="icol">
               <tr>
                  <th>Ch</th>
                  <th>Scaler</th>
                  <th>Rate</th>
               </tr>
               <tr v-for="idx in nRows" :key="idx">
                  <td class="ch" v-if="(icol-1)*nRows+(idx-1) < scaler.data.length">{{ (idx-1) + (icol-1)*nRows  }}</td>
                  <td class="val" v-if="(icol-1)*nRows+(idx-1) < scaler.data.length">{{ scaler.data[(idx-1)+(icol-1)*nRows] }}</td>
                  <td class="val" v-if="(icol-1)*nRows+(idx-1) < scaler.data.length">{{ scaler.rate[(idx-1)+(icol-1)*nRows]}}</td>
               </tr>
            </table>

         </div>

         <!--
         <table class="cell" v-for="irow in nCols" :key="irow">
            <tr>
               <th>Ch</th>
               <th>Scaler</th>
            </tr>
            <tr v-for="idx in nRows" :key="idx">
               <td class="ch" v-if="(irow - 1) * nRows + (idx - 1) < nTot"> {{ msg.scr[(irow - 1) * nRows + (idx - 1)].ch }} </td>
               <td class="val" v-if="(irow - 1) * nRows + (idx - 1) < nTot"> {{ msg.scr[(irow - 1) * nRows + (idx - 1)].val }}
               </td>
            </tr>
         </table>
      -->
      </div>


   </div>
</template>


<script>
import axios from 'axios'
import LocalTimestamp from './LocalTimestamp.vue';
import TS from '../utilities/Timestamp'

export default {
   components: { LocalTimestamp },
   props: {
      ip: String,
   },
   data() {
      return {
         isValid: false,
         status: 0,
         message: "",
         scalers: {},
         info: {},
         error: "",
         msg: { "device": "IDLE" },
         nTot: 32,
         nCols: 1,
         nRows: 32,
         scrs: [],
         addUri: 'http://localhost:8000/scaler/add/hul/' + this.ip,
         readDataUri: 'http://localhost:8000/scaler/read/data/' + this.ip
         // 表を整形する
      }
   },
   methods: {
      update() {
         axios.get(this.readDataUri)
            .then((response) => {
               this.status = response.data.header.status;
               this.message = response.data.header.message;
               this.scalers = response.data.payload;
               if (this.status == 0) {
                  this.isValid = true;
                  for (let key in this.scalers) {
                     let ts = this.scalers[key].ts;
                     this.scalers[key]['tsstr'] = TS.strFromSec(ts);
                     this.scalers[key]['nCols'] = Math.ceil(this.scalers[key].data.length / this.nRows);
                     this.scalers[key]['rate'] = [];
                     for (let i = 0; i < this.scalers[key].data.length; i++) {
                        var val = (this.scalers[key].diff[i]/this.scalers[key].diffTs);
                        console.log(val);
                        this.scalers[key]['rate'][i] = val.toFixed(3);
                     }
                  }
               }
               
               /*
                              this.isValid = true;
                              //console.log(response.data);
                              this.msg = response.data;
                              this.nTot = this.msg.scr.length;
                              //console.log(this.msg);
                              if (this.nTot > 0) {
                                 this.nCols = Math.ceil(this.nTot / this.nRows);
                                 for (let iscr = 0; iscr < this.nRows; ++iscr) {
                                    this.scrs[iscr] = [];
                                 }
                                 for (let iscr = 0; iscr < this.nTot; ++iscr) {
                                    let icol = Math.floor(iscr / this.nRows);
                                    let irow = iscr % this.nRows;
                                    this.scrs[irow][2 * icol + 0] = this.msg.scr[irow + icol * this.nRows].ch;
                                    this.scrs[irow][2 * icol + 1] = this.msg.scr[irow + icol * this.nRows].val;
                                 }
                              } else {
                                 this.nTot = 0;
                                 this.nRows = 0;
                                 this.nCols = 0;
                              }
               */
            })
            .catch((error) => {
               this.isValid = false;
               this.error = error;
            });

         setTimeout(() => { this.update(); }, 1000);
      }
   },
   mounted() {
      //console.log(this.ip);

      axios.get(this.addUri)
         .then((response) => {
            this.status = response.data.header.status;
            this.message = response.data.header.message;
            this.info = response.data.payload;
            if (this.status == 0)
               this.isValid = true;
         }).catch((error) => {
            this.isValid = false;
            this.error = error + " for " + this.addUri;
         });
      this.update();
   }
}
</script>

<style>
div.state {
   border: 1px solid blue;
}

.table {
   display: table;
   border-spacing: 1rem;
}

.cell {
   display: table-cell;
   border: 1px solid;

}

table {
   border-collapse: collapse;
   //width: 100%;
}

td.ch {
   padding: 0.1rem;
   width: 2rem;
}

td.val {
   width: 8rem;
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