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
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
export default mutations
