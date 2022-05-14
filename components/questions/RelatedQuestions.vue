<template>
  <div class="py-2">
    <nuxt-link
      v-for="(item, index) in questions"
      :key="item._id"
      :to="`/questions/${item.slug}`"
      class="block underline my-2 hover:text-green-400"
    >
      <h4 class="font-normal dark:text-white">
        {{ item.title | truncate(100, '...') }}
      </h4>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      questions: [],
    }
  },
  mounted() {
    this.loadRelatedQuestions(this.question)
  },
  methods: {
    async loadRelatedQuestions(question) {
      const res = await this.$axios.get(
        `questions?search=${question.title}&perPage=10`
      )
      this.questions = this.questions.concat(res.data.data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
