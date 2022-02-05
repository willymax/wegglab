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
}
export default getters
