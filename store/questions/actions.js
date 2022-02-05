const actions = {
  SET_CURRENT_QUESTION({ commit }, question) {
    commit('SET_CURRENT_QUESTION', question)
  },
  SET_SUBJECTS({ commit }, subjects) {
    commit('SET_SUBJECTS', subjects)
  },
}
export default actions
