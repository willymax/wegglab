import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import questions from './questions'

Vue.use(Vuex)

const store = new Store({
  state: () => ({
    counter: 0,
  }),
  mutations: {
    increment(state) {
      state.counter++
    },
  },
  modules: {
    questions: { ...questions, ...{ namespaced: true } },
  },
})
