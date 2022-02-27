import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [MutationTypes.SET_TOKEN](state: S, payload: string): void
  [MutationTypes.RESET_TOKEN](state: S): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOKEN](state, payload: string) {
    state.token = payload
  },
  [MutationTypes.RESET_TOKEN](state) {
    state.token = ''
  },
  [MutationTypes.SET_ALBUM](state, payload: any) {
    state.album = payload
  },
  [MutationTypes.SET_SITE_MEDIA_COUNT](state, payload: any) {
    state.siteMediaCount = payload
  },
  [MutationTypes.SET_ALBUM_LIST](state, payload: any) {
    state.albumList = payload
  },
  [MutationTypes.SET_USER_PROFILE](state, payload: any) {
    state.userProfile = payload
  }
}
