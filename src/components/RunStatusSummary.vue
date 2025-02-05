<!--
@brief Show the summary of data acquisition and processing system
@details This component shows the summary of the data acquisition and processing system. It includes the following information:
 - run number, run status, start time, and end time, warning in the devices
 - beam intensity
 - number of events (or frames) accumulated  
 @author Shinsuke OTA <ota@rcnp.osaka-u.ac.jp>
 @created 2025-02-02 09:55
-->
<template>
   <div>
      <table>
         <tr>
            <td  class="headding-view">Latest Run</td>
            <td>{{ objectPool.daq?.latest_run_number }}</td>
         </tr>
         <tr>
            <td  class="headding-view">Run Status</td>
            <td>{{ objectPool.daq?.state }}</td>
         </tr>
         <tr>
            <td class="headding-view">Start Time</td>
            <td>{{ objectPool.daq?.start_time }}</td>
         </tr>
         <tr>
            <td class="headding-view">End Time</td>
            <td >{{ objectPool.daq?.end_time }}</td>
         </tr>
         <tr>
            <td class="headding-view">Elapsed Time</td>
            <td >{{ objectPool.daq?.elapsed_time }}</td>
         </tr>
         <tr>
            <td class="headding-view">Comment</td>
            <td>{{ objectPool.daq?.run_comment }}</td>
         </tr>
         <tr>
            <td class="headding-view">Beam Intensity</td>
            <td><ShowBeamIntensity/></td>
            </tr> 
      </table>
   </div>

<ShowScaler></ShowScaler>
</template>

<script>
import { useGlobalStore } from '@/stores/global';
import { defineComponent, reactive } from 'vue';
import ShowScaler from './ShowScaler.vue';
import ShowBeamIntensity from './ShowBeamIntensity.vue';

export default defineComponent ({
   components: { 
      ShowScaler,
      ShowBeamIntensity,
      },
   setup() {
      const { objectPool, configPool } = reactive(useGlobalStore());

      return {
         objectPool,
         configPool,
      }
   },
})
</script>

<style scoped>
td {
   padding: 2px;
   margin: 0px;
   border-bottom: solid 1px #dddddd;
}
   
        .changed {
           background-color: #ffff00;
        }
   
        .warning {
           background-color: #aa0000;
           color: white;
           text-align: center
        }
   
        .normal {
           background-color: #8888bb;
           color: white;
           text-align: center;
        }
   
        .notify {
           background-color: #bbbb33;
           color: black;
           ;
           text-align: center
        }
   
        .digit-view {
           width: 100px;
           text-align: right;
           padding: 5px;
           font-size: 11pt;
        }
   
        .digit-input {
           width: 90%;
           padding: 3px 3px;
           border-radius: 3px;
           border: 2px solid #ddd;
           box-sizing: border-box;
        }
   
        .text-input {
           width: 100%;
           padding: 3px 3px;
           border-radius: 3px;
           border: 2px solid #ddd;
           box-sizing: border-box;
        }
   
        .headding-view {
           font-size: 85%;
           text-align: center;
           font-weight: 900;

      }
</style>