<template>
  <div>
    <answers></answers>
    <post-answer v-if="addingAnswer && $auth.loggedIn"></post-answer>
    <add-answers
      v-if="$auth.user.role === 'expert' || $auth.user.role === 'admin'"
      >Post Answer</add-answers
    >
  </div>
</template>

<script>
import AddAnswers from '../answers/AddAnswers.vue'
import Answers from '../answers/Answers.vue'

import PostAnswer from '../answers/PostAnswer.vue'
export default {
  components: { Answers, PostAnswer, AddAnswers },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
    addingAnswer() {
      return this.$store.getters['answers/addingAnswer']
    },
  },
  methods: {
    hasNoAnswers() {
      if (this.question && this.question.answers) {
        return this.question.answers.length === 0
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped></style>
