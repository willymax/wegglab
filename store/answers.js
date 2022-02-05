export const state = () => ({
  addingAnswer: false,
})

export const mutations = {
  setAddingAnswer: (state, addingAnswer) => {
    state.addingAnswer = addingAnswer
  },
}

export const actions = {
  updateAddingAnswer({ commit, dispatch }, params) {
    commit('setAddingAnswer', params)
  },
}

export const getters = {
  addingAnswer: (state) => state.addingAnswer,
}
