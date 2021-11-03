<template>
  <div>
    <h2 class="text-3xl font-normal leading-normal mt-0 mb-2">Answers</h2>
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
