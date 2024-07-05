<template>
  <div>
    <p v-if="msg.length > 0">
      {{msg}}
    </p>
    <p v-else>
      no text
    </p>
    <input type="text" v-model="msg">
    <button @click="clear()">clear</button>
  </div>
  <div>
   <NestDAQStatus></NestDAQStatus>
  </div>
</template>

<script>
//import axios from 'axios'
import NestDAQStatus from './components/NestDAQStatus.vue'

export default {
  data () {
    return {
      msg: 'Hello World! hoge'
    }
  },
  components: {
   NestDAQStatus,
  },
  methods: {
    clear () {
      this.msg = ''
    },
    update () {
//      axios.get('http://localhost:8000/get/hoge')
        //.then((response) => {
            //console.log(response.data);
//            this.msg = response.data.message;
            //});
            //setTimeout(() => { this.update(); }, 1000);
            //}
        }
  },
  mounted () {
    //this.msg = "fuga";
    //this.update();
    
//    fetch('https://shakerato:8000/')
//    .then( response => {
//     this.msg = response.json();  
//          return response.json()
//    });
//    .then( json => {
//      this.msg = json.skip;
//    })
//    .catch( (err) => {
//      this.msg = err // エラー処理
//    });
  }  
}
</script>