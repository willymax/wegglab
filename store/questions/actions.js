const actions = {
  SET_CURRENT_QUESTION({ commit }, question) {
    commit('SET_CURRENT_QUESTION', question)
  },
  SET_SUBJECTS({ commit }, subjects) {
    commit('SET_SUBJECTS', subjects)
  },
  SET_GUEST_QUESTION({ commit }, guestQuestionFormData) {
    commit('SET_GUEST_QUESTION', guestQuestionFormData)
  },
}
export default actions
