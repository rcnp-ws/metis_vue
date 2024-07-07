<template>
  <div class="bg-gradient-to-r from-blue-300 to-blue-500 min-h-screen">
    <h1 class="text-xl font-bold text-white mb-4 w-11/12 lg:w-10/12 mx-auto">
      Variant: Vertical(default)
    </h1>

    <tab-container class="w-11/12 lg:w-10/12 mx-auto mb-16" :tabList="tabList">
      <template v-slot:tabPanel-1> Content 1 </template>
      <template v-slot:tabPanel-2> Content 2 </template>
      <template v-slot:tabPanel-3> {{tabList[2]}} </template>
      <template v-slot:tabPanel-4> {{tabList[3]}}</template>
    </tab-container>

    <h1 class="text-xl font-bold text-white mb-4 w-11/12 lg:w-10/12 mx-auto">
      Variant: Horizontal
    </h1>

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
import AmaneqScaler from '../components/AmaneqScaler.vue'


export default {
  components: {
    TabContainer,
    AmaneqScaler,
  },
  data() {
    return {
      tabList: ["Tab 1", "Tab 2", "192.168.10.1", "192.168.10.2"],
    };
  },
};
</script>

