import { inject } from 'vue';

import counterStore from './counter';
import objectPool from './objectPool';
import configPool from './configPool';

export default function globalStore() {
  return {
    counter: counterStore(),
    objectPool: objectPool(),
    configPool: configPool(),
  };
}

//export type GlobalStore = ReturnType<typeof globalStore>;

export const GlobalStoreKey = Symbol('globalStore');

export function useGlobalStore() {
  const store = inject(GlobalStoreKey);
  if (!store) {
    throw new Error(`${GlobalStoreKey} is not provided`);
  }
  return store;
}

/*
* https://qiita.com/tmy/items/a545e44100247c364a71
*/