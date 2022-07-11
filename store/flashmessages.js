export const state = () => ({
  flashMessage: '',
  hasFlashMessage: false,
})

export const getters = {
  getterFlashMessage: (state) => {
    const tempFlashMessage = state.flashMessage
    // state.flashMessage = ''
    // state.hasFlashMessage = false
    return tempFlashMessage
  },
  getterHasFlashMessage: (state) => {
    return state.hasFlashMessage
  },
}

export const mutations = {
  updateFlashMessage: (state, payload) => {
    state.flashMessage = payload
    state.hasFlashMessage = true
  },
  updateHasFlashMessage: (state, payload) => {
    state.hasFlashMessage = payload
  },
}

export const actions = {
  updateActionFlashMessage({ commit }, payload) {
    commit('updateFlashMessage', payload)
  },
  updateActionHasFlashMessage({ commit }, payload) {
    commit('updateHasFlashMessage', payload)
  },
}
