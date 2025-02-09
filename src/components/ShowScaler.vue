<template>
   <!-- configuration panel -->
 <ModalBase label="Scaler Configuration">
   <div v-if="'scalers' in config">
      <table>
         <tr>
            <th>>name</th>
            <th>id</th>
            <th>ch</th>
         </tr> 
         <tr v-for="scr in config.scalers" :key="scr">
            <td><input type="text" v-model="scr.name"/></td>
            <td><select v-model="scr.id">
                  <option v-for="id in getIdOptions()" :key="id" :value="id">{{ id }}</option>
               </select>
            </td>
            <td><input v-model="scr.ch"/></td>
         </tr> 
      </table>
   </div>
   <button @click="add">add scaler</button>

<!--
  id : <input v-model="id" /><br />
  ch : <input v-model="ch" /><br />
  type : <select v-model="type">
      <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
   </select><br />
-->
 </ModalBase>

 <!-- display panel -->
 <div v-if="'scalers' in config">
   <table>
      <tr>
         <th>name</th>
         <th>id</th>
         <th>ch</th>
         <th>rate (kHz)</th>
         <th>rate (kHz / nA)</th>
         <th>scaler</th>
      </tr>
      <tr v-for="scr in config.scalers" :key="scr">
         <td class="name">{{ scr.name }}</td>
         <td class="id">{{ scr.id }}</td>
         <td class="ch">{{ scr.ch }}</td>
         <td class="val">{{ get(scr.id,scr.ch,"rate") }}</td>
         <td class="val">{{ ratePerBeam(scr.id,scr.ch) }}</td>
         <td class="val">{{ get(scr.id,scr.ch,"data") }}</td>
      </tr>
   </table>
</div>
</template>

<script>
import { useGlobalStore } from '@/stores/global';
import { ref, reactive, defineComponent, computed } from 'vue';

import ModalBase from './ModalBase.vue';

export default defineComponent ({
   components: { ModalBase },
   props: {
      compId: {
         type: String,
         default: "scaler",
      }
   },
   setup(props) {
      const value = ref("scaler values");
      const scalers = ref([]);
      const rates = ref([]);
      const nScalers = ref(1);
      const { objectPool, configPool } = reactive(useGlobalStore());
      const get = computed(() => {
         return (id, ch, type) => {
         return objectPool["scalers"]?.[id]?.[type]?.[ch] || "not available";
      }}  );
      const ratePerBeam = computed(() => {
         return (id, ch) => {
            if ('bi' in objectPool) {
               return (objectPool["scalers"]?.[id]?.rate[ch]/objectPool.bi.value).toPrecision(4) || "N/A";
            } else {
               return "N/A";
            }
         }
      });


      const getIdOptions = computed(() => {
         return () => {
            let options = [];
            for ( let id of Object.keys(objectPool["scalers"])) {
               options.push(id);
            }
            return options;
         }
      });
      function add() {
         this.config.scalers.push({ id: this.getIdOptions()[0], ch: 0 });
      }

      return {
         add,
         get,
         ratePerBeam,
         getIdOptions,
         objectPool,
         configPool,
         config: configPool.get(props.compId),
         value,
         scalers,
         rates,
         nScalers,
         ids : ["192.168.2.169-0"],
         chs : [5],
         types : ["rate"],
         id : "192.168.2.169-0", // id of the scaler
         ch : 5, // channel number of the scaler
         type : "rate", // type of the scaler data { data, rate, diff }
         typeOptions: ["data", "rate", "diff"],
         idOptions: [],
      }
   },
   mounted() {
      this.config["scalers"] = [
      { name: "GR", id: "192.168.2.169-1", ch : 6 },
      { name: "Recoil", id: "192.168.2.169-1", ch : 1},
      { name: "GR PS2", id: "192.168.2.169-1", ch : 2 },
      { name: "GR PS3", id: "192.168.2.169-1", ch : 0},
         { name: "AKIMUNE U", id: "192.168.2.169-0", ch : 0 },
         { name: "AKIMUNE D", id: "192.168.2.169-0", ch : 1 },
         { name: "AKIMUNE L", id: "192.168.2.169-0", ch : 2 },
         { name: "AKIMUNE R", id: "192.168.2.169-0", ch : 3 },
         { name: "RF", id: "192.168.2.169-0", ch : 5 },
   ];
      // this.update();
      // this.updateAll();
   }
})
</script>


<style scoped>


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
   width: 70%;
}

td.name {
   padding: 0.1rem;
   text-align: center;
   width: 10rem;
}


td.id {
   padding: 0.1rem;
   width: 10rem;
}

td.ch {
   padding: 0.1rem;
   width: 2rem;
}

td.val {
   width: 8rem;
}


td.id, td.ch, td.val {
   padding: 0rem 1rem 0rem 0rem;
   text-align: right;
   border-bottom: 1px solid #ddd;
   border-top: 1px solid #ddd;
   font-family: /* 英字用のフォントを指定 */ 'Raleway', /* 日本語用のフォントを指定 */ 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', 'メイリオ', Meiryo, sans-serif;
}


img {
   width: 80px;
   display: block;
   margin: 0 auto;
   margin-bottom: .5rem;
}
</style>