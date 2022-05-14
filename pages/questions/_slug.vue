<template>
  <with-right-side-bar>
    <template #sidebar>
      <h1 class="text-xl font-bold">Related Questions</h1>
      <related-questions
        v-if="!$fetchState.pending"
        :question="question"
      ></related-questions>
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
      <template v-if="$fetchState.error && !$fetchState.pending">
        <div class="flex flex-col items-center justify-center">
          <template v-if="$fetchState.error.status === 404">
            <p>The question you are looking for does not exist</p>
            <base-nuxt-button-link to="/questions/ask"
              >Ask Our Experts</base-nuxt-button-link
            >
          </template>
          <template
            v-if="$fetchState.error.status && $fetchState.error.status !== 404"
          >
            <p>An error has occurred</p>
            <base-button @click="refreshQuestion()">Refresh</base-button>
          </template>
        </div>
      </template>
      <div v-if="question" class="question-content-wrapper">
        <question-block class="question-block" />
        <answers-block class="answers-block" />
      </div>
    </div>
  </with-right-side-bar>
</template>

<script>
import QuestionBlock from '~/components/questions/QuestionBlock.vue'
import AnswersBlock from '~/components/questions/AnswersBlock.vue'
import WithRightSideBar from '~/components/Dashboard/WithRightSideBar.vue'
import BlurredAnswer from '~/components/answers/BlurredAnswer.vue'
import RelatedQuestions from '~/components/questions/RelatedQuestions.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseNuxtButtonLink from '~/components/core-components/BaseNuxtButtonLink.vue'
export default {
  components: {
    QuestionBlock,
    AnswersBlock,
    WithRightSideBar,
    BlurredAnswer,
    RelatedQuestions,
    BaseButton,
    BaseNuxtButtonLink,
  },
  auth: false,
  layout: 'ResponsiveDashboard',
  async fetch() {
    let question = await this.$axios.get(`questions/${this.$route.params.slug}`)
    question = question.data.data

    await this.$store.dispatch('questions/SET_CURRENT_QUESTION', question)
  },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  created() {
    this.$nuxt.$on('paymentReceived', ($event) => {
      location.reload(true)
    })
  },
  methods: {
    refreshQuestion() {
      this.fetch()
    },
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
