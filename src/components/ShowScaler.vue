<template>
   <!-- configuration panel -->
 <ModalBase label="Scaler Configuration">
   <div v-if="'scalers' in config">
      <table>
         <tr>
            <th>id</th>
            <th>ch</th>
         </tr> 
         <tr v-for="scr in config.scalers" :key="scr">
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
         <th>id</th>
         <th>ch</th>
         <th>rate</th>
         <th>scaler</th>
      </tr>
      <tr v-for="scr in config.scalers" :key="scr">
         <td class="id">{{ scr.id }}</td>
         <td class="ch">{{ scr.ch }}</td>
         <td class="val">{{ get(scr.id,scr.ch,"rate") }}</td>
         <td class="val">{{ get(scr.id,scr.ch,"data") }}</td>
      </tr>
   </table>
</div>
{{ config.doReload }}

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
         console.log("add scaler");
         this.config.scalers.push({ id: this.getIdOptions()[0], ch: 0 });
      }

      return {
         add,
         get,
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
         { id: "192.168.2.169-0", ch : 5 },
         { id: "192.168.2.169-0", ch : 5 },
         { id: "192.168.2.169-0", ch : 5 },
   ];
      console.log("mounted show scaler");
      // this.update();
      // this.updateAll();
      console.log(this.config);
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
   //width: 100%;
}

td.id {
   padding: 0.1rem;
   width: 8rem;
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
   font-size: .8rem;
   text-align: right;
   border-bottom: 1px solid #ddd;
   border-top: 1px solid #ddd;
   font-family: /* 英字用のフォントを指定 */ 'Raleway', /* 日本語用のフォントを指定 */ 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', 'メイリオ', Meiryo, sans-serif;
}

th {
   font-weight: bold;
   font-size: 0.8rem;
   color: #000;
   background: #eee;
   text-align: center;
}

img {
   width: 80px;
   display: block;
   margin: 0 auto;
   margin-bottom: .5rem;
}
</style>