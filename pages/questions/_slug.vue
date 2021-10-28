<template>
  <div class="page-wrapper">
    <div v-if="$fetchState.pending">
      <div class="question-content-wrapper">
        <question-block class="question-block" />
        <div class="question-aside-wrapper">
          <question-aside-block class="question-aside-block" />
        </div>
      </div>
      <answers-block class="answers-block" />
    </div>
    <template v-else-if="$fetchState.error">
      <p>{{ $fetchState.error.message }}</p>
    </template>
  </div>
</template>

<script>
import QuestionBlock from '~/components/questions/QuestionBlock.vue'
import AnswersBlock from '~/components/questions/AnswersBlock.vue'
import QuestionAsideBlock from '~/components/questions/QuestionAsideBlock.vue'
export default {
  components: {
    QuestionBlock,
    AnswersBlock,
    QuestionAsideBlock,
  },
  layout: 'DashboardLayout',
  asyncData({ params, redirect }) {
    const slug = params.slug
    // const response = await this.$axios.get(slug)
  },
  data() {
    return {
      question: {},
    }
  },
  async fetch() {
    let question = await this.$axios.get(`questions/${this.$route.params.slug}`)
    question = question.data.data

    await this.$store.dispatch('questions/SET_CURRENT_QUESTION', question)
    this.question = question
  },
}
</script>

<style>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
</style>
