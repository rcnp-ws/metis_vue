import { reactive } from 'vue';

export default function objectPool() {
  const state = reactive({
    objects : {},
  });

  return {
    get get() {
      return state.objects;
    },

  };
}
