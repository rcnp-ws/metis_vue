<template>
  <div>
    <h2> Run Controller </h2>
    <div> Run number: <input type="text" v-model="run_number_current"> Next:  <input type="text" v-model="run_number_next"></div>
    <div> Comment: <input size="50" type="text" v-model="run_comment"> <button @click="clear()"> clear</button></div>
    <div> Start: {{daq_start_time}} </div>
    <div> Stop: {{daq_stop_time}} </div>
    <div>
      <button @click='set_daq_start_time();publish_daqctl(["CONNECT","INIT TASK","RUN"],1)'> start </button>
      <button @click='set_daq_stop_time();publish_daqctl(["STOP","RESET TASK","RESET DEVICE"],1)'> stop </button>
      <button @click="daqctl_end()"> end </button>
    </div>
    <h2> Expert mode </h2>
    <div><button @click='publish_daqctl(["CONNECT"],1)'> connect </button></div>
    <div><button @click='publish_daqctl(["INIT TASK"],1)'> init task </button></div>
    <div><button @click='publish_daqctl(["RUN"],1)'> run </button></div>
    <div><button @click='publish_daqctl(["STOP"],1)'> stop </button></div>
    <div><button @click='publish_daqctl(["RESET TASK"],1)'> reset task </button></div>
    <div><button @click='publish_daqctl(["RESET DEVICE"],1)'> reset device </button></div>
</div>
  <div> {{wait_daqctl_state}} </div>  
  <div> {{state}} </div>  
  <div> {{status_msg}} </div>
  <div> State change start time : {{state_change_start_time_in_sec}}, Duration: {{state_change_duration_in_sec}} sec / Timeout {{state_change_timeout_in_sec}} sec</div>  
</template>

<script>
import axios from 'axios'

export default {
   data() {
      return {
             run_number_current: 1001,
             run_comment: "default run comment",
             daqctl_chnl: "",
             daqctl_msg: "",
             status_msg: "",
             state_change_start_time_in_sec: 0,
             state_change_duration_in_sec: 0,
             state_change_timeout_in_sec: 10,
             state_change_error: 0,
             wait_daqctl_state: "IDLE",
             daq_start_time: "",
             daq_stop_time: ""
      }
   },
   methods: {
      update() {
         axios.get('http://localhost:8000/nestdaq/run_number/')
        .then((response) => {
            //console.log(response.data);
                this.run_number_current = response.data;
                this.run_number_next = Number(this.run_number_current) +1 ;
            });
	axios.get('http://localhost:8000/set/run_info:run_comment/'+this.run_comment);
        axios.get('http://localhost:8000/nestdaq/run_comment/')
        .then((response) => {
                this.run_comment = response.data;
            });
        axios.get('http://localhost:8000/nestdaq/status/')
        .then((response) => {
            //console.log(response.data);
                this.status_msg = response.data;
            });
        setTimeout(() => { this.update(); }, 1000);
      },
      wait_for_state_change(){
        this.state_change_duration_in_sec = Number(Date.now() / 1000 - this.state_change_start_time_in_sec);
        if (this.state_change_duration_in_sec > this.state_change_timeout_in_sec) {
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
      clear(){
        this.run_comment = "";
      },
      set_daq_start_time(){
        this.daq_start_time = new Date();
        this.daq_stop_time = "";
      },
      set_daq_stop_time(){
        this.daq_stop_time = new Date();
      },
      publish_daqctl(cmd_arr, publish_flag){
         if (cmd_arr.length == 0) {
            return;
         }
         if (publish_flag == 1) {
            this.daqctl_chnl = "daqctl";
            this.daqctl_msg = '{"command":"change_state","value":"'+cmd_arr[0]+'","services":["all"],"instances":["all"]}';
            axios.get('http://localhost:8000/publish/'+this.daqctl_chnl+'/'+this.daqctl_msg);
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
            this.state_change_done = 0;
            this.state_change_start_time_in_sec = Number(Date.now() / 1000);
            this.wait_for_state_change();
            setTimeout(() => { this.publish_daqctl(cmd_arr, 0); }, 1000);
         }else{
            if (this.state_change_done == 0) {
               setTimeout(() => { this.publish_daqctl(cmd_arr, 0); }, 1000);
            }else{
               cmd_arr.shift();
               setTimeout(() => { this.publish_daqctl(cmd_arr, 1); }, 1000);
            }
         }
      },
      daqctl_end(){
         this.daqctl_chnl = "daqctl";
         this.daqctl_msg = '{"command":"change_state","value":"END","services":["all"],"instances":["all"]}';
         axios.get('http://localhost:8000/publish/'+this.daqctl_chnl+'/'+this.daqctl_msg);
      }
   },
   mounted() {
      this.update()
   }
}
</script>

<style>
div.state {
border: 1px solid blue;
}
</style>
