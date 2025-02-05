<template>
   <LocalTimestamp></LocalTimestamp>

   <h1>Metis</h1>
   <div>
      <ul class="tabs-menu" v-for="(tab, name) in tablist" :key="name">
         <li
            :class="{ active: currentTab === name }"
            @click="currentTab = name"
         >{{ tab }}</li>
         </ul>
      <div class="tabs-content">
         <!-- 
            コンポーネントを keep-alive で破壊されないようにする。keep-aliveのコンポーネントは一つのみ。
            https://qiita.com/yuta-katayama-23/items/db3e4b4f9bfb098e5e6f
          -->
          <keep-alive> 
            <component :is="currentTab" v-bind="getPropsForCurrentTab"></component>
         </keep-alive>
      </div>      
   </div>
   

   <div>
      <NestDAQController></NestDAQController>
      <NestDAQStateList></NestDAQStateList>
      <NestDAQSoundAlert></NestDAQSoundAlert>
      <!-- ><NestDAQStatus></NestDAQStatus> -->
   </div>
     <tab-example></tab-example>
     <test-component></test-component>
</template>
<script>
import NestDAQController from './components/NestDAQController.vue'
import NestDAQStateList  from './components/NestDAQStateList.vue'
import NestDAQSoundAlert from './components/NestDAQSoundAlert.vue'
import TabExample from './examples/TabExample.vue'
import RunStatusSummary from './components/RunStatusSummary.vue'
import testComponent from './components/test.vue'
import LocalTimestamp from './components/LocalTimestamp.vue'
import ConfigPanel from './components/ConfigPanel.vue'
//import NestDAQStatus     from './components/NestDAQStatus.vue'

export default {
   data () {
      return {
         tablist: {
            RunStatusSummary: 'Status',
            NestDAQController: 'Control',
            TabExample: 'Scaler',
            ConfigPanel: 'Config'
         },
         currentTab: 'RunStatusSummary',
         propsForRunStatusSummary : {},
         propsForNestDAQController: { },
         propsForTabExample: { }
      }
   },
   computed: {
      getPropsForCurrentTab() {
         switch (this.currentTab) {
            case 'RunStatusSummary':
               return this.propsForRunStatusSummary;
            case 'NestDAQController':
               return this.propsForNestDAQController;
            case 'TabExample':
               return this.propsForTabExample;
            default:
               return {};
         }
      }
   },
   components: {
      NestDAQController,
      NestDAQStateList,
      NestDAQSoundAlert,
      TabExample,
      RunStatusSummary,
      testComponent,
      LocalTimestamp,
      ConfigPanel,
      //NestDAQStatus
   },
   methods: {
   },
   mounted () {
   }  
}
</script>

<style>
html {
   font-family: /* 英字用のフォントを指定 */ 'Raleway', /* 日本語用のフォントを指定 */ 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', 'メイリオ', Meiryo, sans-serif;
}
</style>
<style scoped>
body {
  color: #3f4548;
}

/* ulのデフォルトスタイルを消去 */
.tabs-menu {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

/* タブの基本スタイル */
.tabs-menu li {
  display: block;
  float: left;
  margin-right: 8px;
  margin-bottom: -1px;
  padding: 10px 20px;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  border-radius: 4px 4px 0 0;
  color: #557f95;
  text-decoration: none;
}

/* タブにマウスを乗せたらカーソルの形を変える */
.tabs-menu li:hover {
  cursor: pointer;
}

/* 非選択のタブにマウスを乗せたら色を変える */
.tabs-menu li:not(.active):hover {
  border-color: #f0f0f0 #f0f0f0 #999;
  background-color: #f0f0f0;
}

/* 選択中のタブ */
.tabs-menu .active {
  border-color: #999 #999 transparent #999;
  background-color: #f0fbff;
  color: black;
}

/* タブコンテンツ表示エリア */
.tabs-content {
  clear: both;
  background-color: #f0fbff;
  border: 1px solid #999;
  border-radius: 0 4px 4px 4px;
  padding: 10px 10px 30px 10px;
}
</style>