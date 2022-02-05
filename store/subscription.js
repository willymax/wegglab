export const state = () => ({
  subscribed: false,
})

export const getters = {
  isSubscribed: (state) => state.addingAnswer,
}

export const actions = {
  update({ commit, dispatch }, params) {
    commit('setSubscribed', params)
  },
}

export const mutations = {
  setSubscribed: (state, subscribed) => {
    state.subscribed = subscribed
  },
}
