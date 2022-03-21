export const state = () => ({
  subscribed: true,
})

export const getters = {
  isSubscribed: (state) => state.subscribed,
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
