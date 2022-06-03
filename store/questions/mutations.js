const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  SET_CURRENT_QUESTION(state, question) {
    state.CURRENT_QUESTION = question
  },
  SET_SUBJECTS(state, subjects) {
    state.SUBJECTS = subjects
  },
  SET_GUEST_QUESTION(state, guestQuestionFormData) {
    state.GUEST_QUESTION = guestQuestionFormData
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  ADD_QUESTION_ANSWERS(state, newAnswers) {
    state.CURRENT_QUESTION.answers.unshift(newAnswers)
    state.CURRENT_QUESTION = { ...state.CURRENT_QUESTION }
  },
}
export default mutations
