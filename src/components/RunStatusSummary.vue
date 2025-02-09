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
   <div class="top-frame">
      <h1>Summary </h1>
      <span class="headding-view">BI</span><span style="display: inline-block; width: 20em;" class="content-view"><ShowBeamIntensity/></span><span></span>
      <span class="headding-view">Elapsed </span> <span class="digit">{{ objectPool.daq?.elapsed_time }}</span>
      <br/>
      <h1>Nest DAQ Status Summary</h1>
      <table width="100%">
         <tr>
            <td  class="headding-view">Latest Run</td>
            <td class="content-view">{{ objectPool.daq?.latest_run_number }}</td>
            <td  class="headding-view">Run Status</td>
            <td class="content-view">{{ objectPool.daq?.state }}</td>
         </tr>
         <tr>
            <td class="headding-view">Start Time</td>
            <td class="content-view">{{ objectPool.daq?.start_time }}</td>
            <td class="headding-view">End Time</td>
            <td class="content-view">{{ objectPool.daq?.end_time }}</td>
         </tr>
         <tr>
            <td class="headding-view">Comment</td>
            <td colspan="3">{{ objectPool.daq?.run_comment }}</td>
         </tr>
      </table>
      <br/>
      <h1>Babirl DAQ Status Summary</h1>
      <table width="100%">
         <tr>
            <td class="headding-view">Latest Run</td>
            <td class="content-view">{{ objectPool.babirl?.runinfo.runnumber }}</td>
            <td class="headding-view">Run Status</td>
            <td class="content-view">{{ objectPool.babirl?.runinfo.runstatus }}</td>
         </tr>
         <tr>
            <td class="headding-view">Start Time</td>
            <td class="content-view">{{ objectPool.babirl?.runinfo.startdate }}</td>
            <td class="headding-view">End Time</td>
            <td class="content-view">{{ objectPool.babirl?.runinfo.stopdate }}</td>
         </tr>
         <tr>
            <td class="headding-view">Header</td>
            <td colspan="3">{{ objectPool.babirl?.runinfo.header }}</td>
         </tr>
         <tr>
            <td class="headding-view">Ender</td>
            <td colspan="3">{{ objectPool.babirl?.runinfo.ender }}</td>
         </tr>
      </table>
      <br/>
      <ShowScaler></ShowScaler>
   </div>

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
.top-frame {
   width: 95%;
   padding: 10px;
   margin: 10px;
   border-radius: 5px;
}
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
           text-align: center;
           font-weight: 900;
         width:15%;
      }
      .content-view {
         text-align: left;
         width: 35%;
      }
      .digit {
         display: inline-block;
         width: 5em;
         text-align: right;
      }
</style>