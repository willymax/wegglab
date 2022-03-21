<template>
  <div>
    <h2 class="text-3xl font-normal leading-normal mt-0 mb-2">Answers</h2>
    <div v-for="answer in question.answers" :key="answer.id">
      <answer v-if="subscribed" :answer="answer"></answer>
    </div>
    <div v-if="question.answers.length > 0 && !subscribed">
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
    subscribed() {
      return this.$store.getters['subscription/isSubscribed']
    },
    user() {
      return this.$auth.user
    },
    // subscribed() {
    //   return this.user.pay_pal_subscription
    //     ? this.user.pay_pal_subscription.status === 'ACTIVE'
    //     : false
    // },
  },
  methods: {
    ownAnswer(answer) {
      return answer.user.id === this.user.id
      //
    },
  },
}
</script>

<style lang="scss" scoped></style>
