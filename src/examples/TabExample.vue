<template>
  <div class="bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen">
    <h1 class="text-xl font-bold text-white mb-4 w-11/12 lg:w-10/12 mx-auto">
      Variant: Vertical(default)
    </h1>
    <div>
     <span><input type="checkbox" v-model="activate" @click="toggle(activate)">: </span>
     <span v-if="activate == true">active</span>
     <span v-else> suspended </span>
    </div>
<!--    
    <tab-container class="w-11/12 lg:w-10/12 mx-auto mb-16" :tabList="tabList">
      <template v-slot:tabPanel-1> Content 1 </template>
      <template v-slot:tabPanel-2> Content 2 </template>
      <template v-slot:tabPanel-3> {{tabList[2]}} </template>
      <template v-slot:tabPanel-4> {{tabList[3]}}</template>
    </tab-container>
-->
    <h1 class="text-xl font-bold text-white mb-4 w-11/12 lg:w-10/12 mx-auto">
      Variant: Horizontal
    </h1>
<!--
    <tab-container
      class="w-11/12 lg:w-10/12 mx-auto"
      :tabList="tabList"
      variant="horizontal"
    >
      <template v-slot:tabPanel-1> Content 1 </template>
      <template v-slot:tabPanel-2> Content 2 </template>
      <template v-slot:tabPanel-3> <amaneq-scaler :ip=tabList[2]></amaneq-scaler> </template>
      <template v-slot:tabPanel-4> <amaneq-scaler :ip=tabList[3]></amaneq-scaler> </template>
    </tab-container>
-->
    <tab-container
      class="w-11/12 lg:w-10/12 mx-auto"
      :tabList="tabList"
      variant="horizontal">
         <template v-for="ip,itab in tabList" :key="itab" #[`tabPanel-${itab+1}`]><amaneq-scaler :ip=ip></amaneq-scaler></template>
      </tab-container>
    <div class="text-center py-12">
      <a
        href="https://lucaspezzano.medium.com/subscribe"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white font-semibold underline"
      >
        Get straight to your email next time I post a demo or article
      </a>
    </div>
  </div>
</template>

<script>
import TabContainer from '../components/TabContainer.vue';
import AmaneqScaler from '../components/AmaneqScaler.vue';
import axios from 'axios';

export default {
  components: {
    TabContainer,
    AmaneqScaler,
  },
  methods: {
    toggle(activate) {
      console.log(activate);
      if (activate) {
      // toggle from activated to suspended
        axios.get(this.api+this.suspend);
        } else {
        axios.get(this.api+this.resume);
        }
      },
  },
  data() {
    return {
      api: "http://172.16.210.154:8000",
      resume: "/scaler/resume",
      suspend: "/scaler/suspend",
      activate: false,
      tabList: [
//      "192.168.2.160",
//      "192.168.2.161",
//      "192.168.2.162",
//      "192.168.2.163",
//      "192.168.2.164",
//      "192.168.2.165",
//      "192.168.2.166",
//      "192.168.2.167",
//      "192.168.2.168",
"192.168.2.169"
      ]
    };
  },
};
</script>

