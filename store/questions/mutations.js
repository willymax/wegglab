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
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
export default mutations
