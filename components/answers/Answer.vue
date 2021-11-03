<template>
  <card>
    <answer-user
      :user="answer.user"
      :timestamp="answer.created_at"
    ></answer-user>
    <div>
      <h2>{{ answer.body }}</h2>
    </div>
  </card>
</template>

<script>
import Card from '../core-components/Cards/Card.vue'
import AnswerUser from './AnswerUser.vue'
export default {
  components: { Card, AnswerUser },
  props: {
    answer: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
