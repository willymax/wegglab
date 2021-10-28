const getters = {
  testGetter: (state) => {
    return 'questions vuex store working'
  },
  GET_CURRENT_QUESTION: (state) => {
    return state.CURRENT_QUESTION
  },
}
export default getters
