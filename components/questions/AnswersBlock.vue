<template>
  <div>
    <no-answers v-if="question.answers.length === 0"></no-answers>
    <answers v-else></answers>
  </div>
</template>

<script>
import Answers from '../answers/Answers.vue'
import NoAnswers from '../answers/NoAnswers.vue'
export default {
  components: { NoAnswers, Answers },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
}
</script>

<style lang="scss" scoped></style>
