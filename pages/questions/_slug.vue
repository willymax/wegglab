<template>
  <with-right-side-bar>
    <template #sidebar>
      <answers-block class="answers-block" />
    </template>
    <div class="page-wrapper">
      <template v-if="$fetchState.pending">
        <div class="article-cards-wrapper">
          <content-placeholders
            v-for="p in 5"
            :key="p"
            rounded
            class="article-card-block"
          >
            <content-placeholders-img />
            <content-placeholders-text :lines="3" />
          </content-placeholders>
        </div>
      </template>
      <template v-else-if="$fetchState.error">
        <p>{{ $fetchState.error.message }}</p>
      </template>
      <div class="question-content-wrapper">
        <question-block class="question-block" />
        <div class="question-aside-wrapper">
          <question-aside-block class="question-aside-block" />
        </div>
      </div>
      <answers-block class="answers-block" />
    </div>
  </with-right-side-bar>
</template>

<script>
import QuestionBlock from '~/components/questions/QuestionBlock.vue'
import AnswersBlock from '~/components/questions/AnswersBlock.vue'
import QuestionAsideBlock from '~/components/questions/QuestionAsideBlock.vue'
import WithRightSideBar from '~/components/Dashboard/WithRightSideBar.vue'
export default {
  components: {
    QuestionBlock,
    AnswersBlock,
    QuestionAsideBlock,
    WithRightSideBar,
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
