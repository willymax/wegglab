<template>
  <div>
    <answers></answers>
    <post-answer v-show="canAnswerTheQuestion" class="m-4"></post-answer>
    <add-answers v-if="showPostAnswer" class="m-4">Post Answer</add-answers>
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
    canAnswerTheQuestion() {
      return this.question && this.question.canAnswer
    },
    showPostAnswer() {
      return this.question && this.question.isAvailableToTake
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
