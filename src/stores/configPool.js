import { reactive } from 'vue';

export default function configPool() {
  const state = reactive({
    configs : {},
  });

  return {
/*
    get get() {
      return state.configs;
    },
*/
    get : (id) => {
      if (! (id in state.configs)) {
         state.configs[id] = { doReload : false, }
      }
      return state.configs[id];
    }
  };
}
