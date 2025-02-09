<!--
 @file ShowBeamIntensity.vue
 @brief Show the beam intensity monitor for BIC1000C current integrator

-->

<template>
   <!-- display panel -->
   <div class="frame">{{ value }} {{ unit }}</div> / <div class="frame"> {{ range }} </div>
   <!-- configuration panel -->
   <ModalBase label="">
      <div>
         <table>
            <tr>
               <th>item</th>
               <th>id</th>
               <th>ch</th>
            </tr>
            <tr v-for="i in nScalers" :key="i">
               <td>{{ items[i-1] }}</td>
               <td>
                  <select v-model="ids[i-1]">
                     <option v-for="id in idOptions" :key="id" :value="id">{{ id }}</option>
                  </select>
               </td>
               <td><input v-model="chs[i-1]" /></td>
            </tr>
         </table>
      </div>
   </ModalBase>  
</template>

<script>
import { useGlobalStore } from '@/stores/global';
import { defineComponent } from 'vue';
import { ref } from 'vue';
import ModalBase from './ModalBase.vue';
import objectPool from '@/stores/objectPool';

export default defineComponent ({
   components: { ModalBase },
   setup() {
      const { objectPool } = useGlobalStore();
      const unit = ref("nA");
      const value = ref(0);
      const range = ref("0 nA");
      function update() {
         if (objectPool["scalers"]) {
            this.idOptions = [];
            for ( let id of Object.keys(objectPool["scalers"])) {
               this.idOptions.push(id);
            }
         }

         let unitBits = [
            objectPool.scalers?.[this.ids[0]]?.rate[this.chs[0]],
            objectPool.scalers?.[this.ids[1]]?.rate[this.chs[1]],
            objectPool.scalers?.[this.ids[2]]?.rate[this.chs[2]],
            objectPool.scalers?.[this.ids[3]]?.rate[this.chs[3]]
         ];
         let bit = (unitBits[3] > 0) << 3 |
            (unitBits[2] > 0) << 2 |
            (unitBits[1] > 0) << 1 |
            (unitBits[0] > 0);
            bit = 15 - bit;
         this.unit = this.unitOptions[bit];  
         let bi = objectPool.scalers?.[this.ids[4]]?.rate[this.chs[4]] 
         * this.fsrOptions[bit]/2.;
         this.value = bi.toFixed(2);
         //this.value = 15 - bit;
         this.range = this.fsrOptions[bit] + this.unitOptions[bit];
         objectPool['bi'] = { 'value' : this.value};
         setTimeout(() => { this.update(); }, 900);
      }

      return {
         update,
         items : ["CI Range 0","CI Range 1","CI Range 2","CI Range 3","CI Rate"],
         ids :  ["192.168.2.169-0","192.168.2.169-0","192.168.2.169-0","192.168.2.169-0","192.168.2.169-1"],
         chs : [6,7,8,9,3],
         nScalers : 5,
         value,
         unit,
         range,
         idOptions: [],
         fsrOptions: [2, 6, 20, 60, 200, 600,
               2, 6, 20, 60, 200, 600, 
               2, 6, 20],
            unitOptions: ["nA","nA","nA","nA","nA","nA",
               "uA","uA","uA","uA","uA","uA",
               "mA","mA","mA"]
      }  
   },
   mounted() {
      objectPool['bi'] = { 'value' : 0};
      this.update();
   }
})
</script>

<style scoped>

div.frame {
   width : 150px;
   display: inline-block;
   padding: 0rem 1rem 0rem 0rem;
   text-align: right;
   font-family: /* 英字用のフォントを指定 */ 'Raleway', /* 日本語用のフォントを指定 */ 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', 'メイリオ', Meiryo, sans-serif;
}
</style>