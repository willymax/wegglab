const getters = {
  testGetter: (state) => {
    return 'questions vuex store working'
  },
  GET_CURRENT_QUESTION: (state) => {
    return state.CURRENT_QUESTION
  },
  GET_SUBJECTS: (state) => {
    return state.SUBJECTS
  },
  GET_GUEST_QUESTION: (state) => {
    return state.GUEST_QUESTION
  },
}
export default getters
