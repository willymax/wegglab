<template>
  <div>
    <h2 class="">Answers</h2>
    <answer
      v-for="answer in question.answers"
      :key="answer.id"
      :answer="answer"
    ></answer>
  </div>
</template>

<script>
import Answer from './Answer.vue'
export default {
  components: { Answer },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
}
</script>

<style lang="scss" scoped></style>
