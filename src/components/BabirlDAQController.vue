<!-- 
 @file BabirlDAQController.vue
 @brief BabirlDAQController component
 @created 2025-02-05 22:15:20
 @author Shinsuke OTA <ota@rcnp.osaka-u.ac.jp>
 -->

<template> 
  <div>
    <h1>BabirlDAQController</h1>
    <p>DAQ Controller for Babirl</p>
  </div>
  <table border="0"   width="1000">
    <tbody>
      <tr>
        <td width="15%" class="headding-view"> RUN </td>
        <td width="35%">{{objectPool.babirl?.runinfo.runnumber}}</td>
        <td width="15%" class="headding-view"> Status </td>
        <td width="35%" :class="stateStyle">
          {{objectPool.babirl?.runinfo.runstatus}}</td>
      </tr>
      <tr>
      <td class="headding-view"> Start </td>
      <td> {{objectPool.babirl?.runinfo?.startdate}}</td>
      <td class="headding-view"> Stop </td>
      <td> {{objectPool.babirl?.runinfo?.stopdate}}</td>
      </tr>
      <tr v-if="isRunning == 1">
        <td class="headding-view"> Header </td>
        <td colspan="3"> {{objectPool.babirl?.runinfo?.header}}</td>
      </tr>
      <tr v-if="isRunning == 0">
        <td class="headding-view"> Header </td>
        <td colspan="3"> <input type="text" style="width: 25em;" v-model="config.header" placeholder="please write header">
        <t-button v-on:click="daqnssta()">NSSTA</t-button>
        <t-button v-on:click="daqstart()" v-bind:disabled="config.header === ''">START</t-button>
        </td>
      </tr>

      <tr v-if="isRunning == 0">
        <td class="headding-view"> Ender </td>
        <td colspan="3"> {{objectPool.babirl?.runinfo?.ender}}</td>
      </tr>
      <tr v-if="isRunning == 1">
        <td class="headding-view"> Ender </td>
        <td colspan="3"> <input type="text" v-model="config.ender" placeholder="please write ender">
        <t-button v-on:click="daqstop()" v-bind:disabled="isSaved && config.ender === ''">STOP</t-button>
      </td>
      </tr>
    </tbody>
  </table>
  <span class="headding-view">Latest Runnumber</span> <input size="5" type="text" v-model="config.runnumber" placeholder="please write run number"><t-button v-on:click="setrunnumber()">SET</t-button>
</template>  


<script>
import { defineComponent,  } from 'vue';
import { useGlobalStore } from '@/stores/global';
import { reactive, ref, computed } from 'vue';
import axios from 'axios';
import objectPool from '@/stores/objectPool';
import TButton from './t-button.vue';
export default defineComponent({
  name: 'BabirlDAQController',
  props: {
   hostname : String,
   apiurl : String,
   compId : { 
    type: String,
    default: 'babirl',
   }
  },
  components: {
    TButton,
  },
  setup(props) {
    const { objectPool, configPool } = reactive(useGlobalStore());
    const isRunning = ref(false);
    const isSaved = ref(false);
    const isStateOK = ref(false)
    const stateStyle = computed (() => ({
      'state-active': isRunning.value == true,
      'state-idle': isRunning.value == false && isStateOK.value == true,
      'state-warning': isRunning.value == false && isStateOK.value == false
    }));

    function updateConfig () {
      axios.get(props.apiurl + "/" + props.hostname + "/monitor").then((response) => {
        objectPool['babirl'] = response.data;
      });
      this.isRunning = (objectPool['babirl']?.runinfo?.runstatus === 'START' || objectPool['babirl']?.runinfo?.runstatus === 'NSSTA');
      this.isSaved = objectPool['babirl']?.runinfo?.runstatus === 'START';
      this.isStateOK = true;
      setTimeout((() => { this.updateConfig(); }), 100);
      }
    function daqnssta() {
     axios.get(props.apiurl + "/" + props.hostname + "/control/nssta");
    }
    function daqstart() {
      axios.get(props.apiurl + "/" + props.hostname + "/control/start/header="+this.config.header);
    }
    function daqstop() {
      axios.get(props.apiurl + "/" + props.hostname + "/control/stop/ender="+(this.config.ender === '' ? 'NSSTA' : this.config.ender));
    } 
    function setrunnumber() {
      axios.get(props.apiurl + "/" + props.hostname + "/control/setrunnumber/"+this.config.runnumber);
    }

    function test() {
      console.log('test');
    } 

    return {
      stateStyle,
      objectPool,
      configPool,
      isStateOK,
      updateConfig,
      daqnssta,
      daqstart,
      daqstop,
      setrunnumber,
      test,
      isRunning,
      isSaved,
      config: configPool.get(props.compId),
    };
  },
  mounted() {
    objectPool['babirl'] = {};
    this.config.header = "";
    this.config.ender = "";
    this.updateConfig();
    console.log('BabirlDAQController mounted');
  },
});
</script>


<style scoped>

td {
    padding: 1px;
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
    color: black;;
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
    width: 50px;
    text-align: center;
    font-weight: bold;;
    font-size: 11pt;
}
</style>