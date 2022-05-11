<template>
  <div class="py-2">
    <div v-for="(item, index) in questions" :key="item._id">
      <nuxt-link :to="`/questions/${item.slug}`" class="hover:underline">
        <h4 class="font-normal dark:text-white">
          {{ item.title | truncate(100, '...') }}
        </h4>
      </nuxt-link>
    </div>
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
