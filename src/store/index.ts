import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { State, state } from '@/store/state'
import { Mutations, mutations } from '@/store/mutations'
import { Actions, actions } from './actions'
import { Getters, getters } from './getters'

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})

export function useStore() {
  return baseUseStore(key)
}
