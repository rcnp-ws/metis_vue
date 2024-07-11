<template>
  <div>
    <h2 class="font-bold"> NestDAQ Run Controller </h2>
      <div> Next run number (read): {{run_number_read}} </div>
      <div> Latest run number (read): {{run_number_latest}} </div>
      <div>
      Run number (set): <input size="10" class="ipt" type="text" v-model="run_number_set"> <span></span>
     <span v-if="daq_state=='IDLE'&&daq_controllable==1">
         <button  class="btn btn-blue" @click="run_number_set_func()"> Set </button> <span></span>
      </span><span v-else>
         <button  class="btn-disabled"> Set </button> <span></span>
      </span>
         <button  class="btn btn-blue" @click="run_number_clear()"> Clear </button>
      </div>
    <div> Run comment (read): {{run_comment_read}} </div>
    <div>
       Run comment (set): <input size="50" class="ipt" type="text" v-model="run_comment_set"> <span></span>
      <span v-if="daq_state=='IDLE'&&daq_controllable==1">
         <button  class="btn btn-blue" @click="run_comment_set_func()"> Set </button> <span></span>
      </span><span v-else>
         <button  class="btn-disabled"> Set </button> <span></span>
      </span>
       <button  class="btn btn-blue" @click="run_comment_clear()"> Clear </button>
    </div>
    <div> Start time: {{daq_start_time}} </div>
    <div> Stop time: {{daq_stop_time}} </div>
    <div>
       <span v-if="daq_state=='IDLE'&&daq_controllable==1">
          <button class="btn btn-blue" @click='daq_start()'> start </button> <span></span>
       </span><span v-else>
          <button class="btn-disabled"> start </button> <span></span>
       </span>
       <span v-if="daq_state=='RUNNING'&&daq_controllable==1">
          <button class="btn btn-blue" @click='daq_stop()'> stop </button> <span></span>
       </span><span v-else>
          <button class="btn-disabled"> stop </button> <span></span>
       </span>
       <button class="btn btn-blue" @click="daqctl_end()"> end </button>
    </div>
    <h2 class="font-bold"> Expert mode </h2>
    <div>
       <span v-if="daq_state=='IDLE'&&daq_controllable==1">
          <button class="btn btn-blue" @click='publish_daqctl(["CONNECT"],1)'> connect </button> <span></span>
       </span><span v-else>
          <button class="btn-disabled"> connect </button> <span></span>    
       </span>
       <span v-if="daq_state=='DEVICE READY'&&daq_controllable==1">
         <button class="btn btn-blue" @click='publish_daqctl(["INIT TASK"],1)'> init task </button> <span></span>
       </span><span v-else>
         <button class="btn-disabled"> init task </button> <span></span>
       </span>
       <span v-if="daq_state=='READY'&&daq_controllable==1">
          <button class="btn btn-blue" @click='publish_daqctl(["RUN"],1)'> run </button>
       </span><span v-else>
          <button class="btn-disabled"> run </button>
       </span>
    </div>
    <div>
       <span v-if="daq_state=='DEVICE READY'&&daq_controllable==1">
          <button class="btn btn-blue" @click='publish_daqctl(["RESET DEVICE"],1)'> reset device </button> <span></span>
       </span><span v-else>
          <button class="btn-disabled"> reset device </button> <span></span>
       </span>
       <span v-if="daq_state=='READY'&&daq_controllable==1">
          <button class="btn btn-blue" @click='publish_daqctl(["RESET TASK"],1)'> reset task </button> <span></span>
       </span><span v-else>
          <button class="btn-disabled"> reset task </button> <span></span>
       </span>
       <span v-if="daq_state=='RUNNING'&&daq_controllable==1">
          <button class="btn btn-blue" @click='publish_daqctl(["STOP"],1)'> stop </button>
       </span><span v-else>
          <button class="btn-disabled"> stop </button>
       </span>
    </div>
  </div>
  <div> Requested DAQ state: {{wait_daqctl_state}} </div>
  <div> Current matched DAQ state: {{daq_state}} </div>
  <div> State change start time : {{state_change_start_time_in_sec}}, Duration: {{state_change_duration_in_sec}} sec / Timeout: {{state_change_timeout_in_sec}} sec</div>
</template>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
  .btn-disabled{
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed;
  }
  .ipt {
    @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
  }
</style>

<script>
import axios from 'axios'

export default {
   data() {
      return {
             run_number_read: 0,
             run_number_set: 0,
             run_number_latest: 0,
             run_comment_read: "default run comment",
             run_comment_set: "default run comment",
             status_msg: "",
             state_change_start_time_in_sec: 0,
             state_change_duration_in_sec: 0,
             state_change_timeout_in_sec: 20,
             state_change_error: 0,
             state_change_done: 0,
             wait_daqctl_state: "IDLE",
             daq_controllable: 1,
             daq_state: "",
             daq_start_time: "",
             daq_stop_time: ""
      }
   },
   methods: {
      daq_start(){
         this.daq_start_time = new Date();
         this.daq_stop_time = "";
         this.publish_daqctl(["CONNECT","INIT TASK","RUN"],1)
      },
      daq_stop(){
         this.daq_stop_time = new Date();
         this.publish_daqctl(["STOP","RESET TASK","RESET DEVICE"],1);
      },
      update() {
        this.check_daq_state();
        axios.get('http://ata03:8000/get/run_info:run_number/')
        .then((response) => {
           this.run_number_read = response.data["message"];
        })
        .catch((error)=>{
            console.log(error.data);
        });
        axios.get('http://ata03:8000/get/run_info:latest_run_number/')
        .then((response) => {
                this.run_number_latest = response.data["message"];
        })
        .catch((error)=>{
            console.log(error.data);
        });
        axios.get('http://ata03:8000/nestdaq/run_comment/')
        .then((response) => {
                this.run_comment_read = response.data;
        })
        .catch((error)=>{
            console.log(error.data);
        });
        axios.get('http://ata03:8000/nestdaq/status/')
        .then((response) => {
            //console.log(response.data);
                this.status_msg = response.data;
        })
	.catch((error)=>{
            console.log(error.data);
        });
        setTimeout(() => { this.update(); }, 1000);
      },
      update_run_number_set(){
         axios.get('http://ata03:8000/get/run_info:run_number/')
         .then((response) => {
            this.run_number_set = response.data["message"];
         })
         .catch((error)=>{
             console.log(error.data);
         });
      },
      update_run_comment_set(){
         axios.get('http://ata03:8000/get/run_info:run_comment/')
         .then((response) => {
            this.run_comment_set = response.data["message"];
         })
         .catch((error)=>{
             console.log(error.data);
         });
      },
      check_daq_state(){
         if (this.status_msg.length == 0) {
            this.daq_state = "";
         }
         let mismatch_flag = 0;
         for (let key in this.status_msg){
           if (this.status_msg[key] != Object.values(this.status_msg)[0]) {
               mismatch_flag = 1;
            }
         }
         if(mismatch_flag == 0){
            this.daq_state = Object.values(this.status_msg)[0];
         }else{
            this.daq_state = "";
         }
      },
      wait_for_state_change(){
        this.state_change_duration_in_sec = parseInt(Date.now() / 1000 - this.state_change_start_time_in_sec);
        if (this.state_change_duration_in_sec >= this.state_change_timeout_in_sec) {
           this.state_change_error = 1;
        }else{
          let mismatch_flag = 0;
          for (let key in this.status_msg){
            if (this.status_msg[key] != this.wait_daqctl_state) {
               mismatch_flag = 1;
            }
          }
          if (mismatch_flag == 1) {
             setTimeout(() => { this.wait_for_state_change(); }, 1000);
          }else{
             this.state_change_done = 1;
          }
        }
      },
      run_number_clear(){
         this.run_number_set = "";
      },
      run_number_set_func(){
         axios.get('http://ata03:8000/set/run_info:run_number/'+this.run_number_set)
            .catch((error)=>{
            console.log(error.data);
         });
      },
      run_comment_clear(){
        this.run_comment_set = "";
      },
      run_comment_set_func(){
	axios.get('http://ata03:8000/set/run_info:run_comment/'+this.run_comment_set)
            .catch((error)=>{
            console.log(error.data);
        });
      },
      publish_daqctl(cmd_arr, publish_flag){
         this.daq_controllable = 0;
         if (cmd_arr.length == 0) {
            this.daq_controllable = 1;
            return;
         }
         if (publish_flag == 1) {
            let daqctl_chnl = "daqctl";
            let daqctl_msg = '{"command":"change_state","value":"'+cmd_arr[0]+'","services":["all"],"instances":["all"]}';
            axios.get('http://ata03:8000/publish/'+daqctl_chnl+'/'+daqctl_msg)
            .catch((error)=>{
              console.log(error.data);
            });
            if (cmd_arr[0] == "STOP") {
               axios.get('http://ata03:8000/incr/run_info:run_number')
               .catch((error)=>{console.log(error.data);});
               this.update_run_number_set();
            }
            if (cmd_arr[0] == "CONNECT") {
              this.wait_daqctl_state = "DEVICE READY";
            }else if (cmd_arr[0] == "INIT TASK") {
              this.wait_daqctl_state = "READY";
            }else if (cmd_arr[0] == "RUN") {
              this.wait_daqctl_state = "RUNNING";
            }else if (cmd_arr[0] == "STOP") {
              this.wait_daqctl_state = "READY";
            }else if (cmd_arr[0] == "RESET TASK") {
              this.wait_daqctl_state = "DEVICE READY";
            }else if (cmd_arr[0] == "RESET DEVICE") {
              this.wait_daqctl_state = "IDLE";
            }
            this.state_change_error = 0;
            this.state_change_done = 0;
            this.state_change_start_time_in_sec = parseInt(Date.now() / 1000);
            this.wait_for_state_change();
            setTimeout(() => { this.publish_daqctl(cmd_arr, 0); }, 1000);
         }else{
            if (this.state_change_error == 1) {
               return;
            }
            if (this.state_change_done == 0) {
               setTimeout(() => { this.publish_daqctl(cmd_arr, 0); }, 1000);
            }else{
               cmd_arr.shift();
               setTimeout(() => { this.publish_daqctl(cmd_arr, 1); }, 1000);
            }
         }
      },
      daqctl_end(){
         let daqctl_chnl = "daqctl";
         let daqctl_msg = '{"command":"change_state","value":"END","services":["all"],"instances":["all"]}';
         axios.get('http://ata03:8000/publish/'+daqctl_chnl+'/'+daqctl_msg)
         .catch((error)=>{
            console.log(error.data);
         });
      }
   },
   mounted() {
      this.update();
      this.update_run_number_set();
      this.update_run_comment_set();  
   }
}
</script>

<style>
div.state {
border: 1px solid blue;
}
</style>
