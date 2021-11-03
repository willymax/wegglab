<template>
  <div>
    <no-answers v-if="hasNoAnswers()"></no-answers>
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
  methods: {
    hasNoAnswers() {
      console.log(
        'this.question?.answers.length === 0' +
          (this.question?.answers.length === 0)
      )
      return this.question?.answers.length === 0
    },
  },
}
</script>

<style lang="scss" scoped></style>
