import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ActionTypes.GET_TOKEN]({ commit }: AugmentedActionContext, payload: string): Promise<string>
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_TOKEN]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = ''
        commit(MutationTypes.SET_TOKEN, data)
        resolve(data)
      }, 500)
    })
  },
  [ActionTypes.GET_ALBUM]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = ''
        commit(MutationTypes.SET_ALBUM, data)
        resolve(data)
      }, 500)
    })
  },
  [ActionTypes.GET_SITE_MEDIA_COUNT]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = ''
        commit(MutationTypes.GET_SITE_MEDIA_COUNT, data)
        resolve(data)
      }, 500)
    })
  },
  [ActionTypes.GET_ALBUM_LIST]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = ''
        commit(MutationTypes.GET_ALBUM_LIST, data)
        resolve(data)
      }, 500)
    })
  },
  [ActionTypes.GET_USER_PROFILE]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = ''
        commit(MutationTypes.GET_USER_PROFILE, data)
        resolve(data)
      }, 500)
    })
  }
}
