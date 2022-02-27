import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  getToken(state: State): string
  getAlbum(state: State): any
  getSiteMediaCount(state: State): any
  getAlbumList(state: State): any
  getUserProfile(state: State): any
}

export const getters: GetterTree<State, State> & Getters = {
  getToken: (state) => {
    return state.token
  },
  getAlbum: (state) => {
    return state.album
  },
  getSiteMediaCount: (state) => {
    return state.siteMediaCount
  },
  getAlbumList: (state) => {
    return state.albumList
  },
  getUserProfile: (state) => {
    return state.userProfile
  }
}
