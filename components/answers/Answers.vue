<template>
  <div>
    <h2 class="text-3xl font-normal leading-normal mt-0 mb-2">Answers</h2>
    <div v-for="answer in question.answers" :key="answer._id">
      <answer :answer="answer"></answer>
    </div>
    <div v-if="question.showBlur">
      <blurred-answer></blurred-answer>
    </div>
  </div>
</template>

<script>
import Answer from './Answer.vue'
import BlurredAnswer from './BlurredAnswer.vue'
export default {
  // ownAnswer(answer)
  components: { Answer, BlurredAnswer },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    ownAnswer(answer) {
      return answer.user._id === this.user._id
      //
    },
  },
}
</script>

<style lang="scss" scoped></style>
