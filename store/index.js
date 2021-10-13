import Vuex from 'vuex'
import Vue from 'vue'
import questions from './questions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    counter: 0,
  }),
  mutations: {
    increment(state) {
      state.counter++
    },
  },
  modules: {
    questions,
  },
})
