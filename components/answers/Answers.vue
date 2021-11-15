<template>
  <div>
    <h2 class="text-3xl font-normal leading-normal mt-0 mb-2">Answers</h2>
    <div v-if="user.subscribed">
      <answer
        v-for="answer in question.answers"
        :key="answer.id"
        :answer="answer"
      ></answer>
    </div>
    <blurred-answer v-else class="w-full"></blurred-answer>
  </div>
</template>

<script>
import Answer from './Answer.vue'
import BlurredAnswer from './BlurredAnswer.vue'
export default {
  components: { Answer, BlurredAnswer },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
    user() {
      return this.$auth.user
    },
  },
}
</script>

<style lang="scss" scoped></style>
