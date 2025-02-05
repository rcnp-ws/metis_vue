<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
export default defineComponent({
   props: {
     label: {
       type: String,
       default: 'Modal',
     },
     closeButtonLabel: {
       type: String,
       default: 'Close',
     },
   },
   name: 'ModalBase',
   setup() {
      const open = ref(false);
      return { open };
   },
});


// https://reffect.co.jp/vue/understand-component-by-moda-window
</script>
<template>
<Teleport to="body">
   <div v-if="open" class="modal">
    <slot></slot> <br/>
    <button @click="open = false">{{closeButtonLabel}}</button>
  </div>
</Teleport>  
   <input type="checkbox" v-model="open" />
   <div v-if="!open">
   <button @click="open = true">{{label}}</button>
   </div>
   <div v-else>
   <button @click="open = false">{{label}}</button>
   </div>
</template>

<style scoped>
div {
   display: inline;
}
.modal {
   border: 1px solid black;
   background-color: white;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>