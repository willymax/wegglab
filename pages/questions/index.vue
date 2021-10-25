<template>
  <div class="">
    <template v-if="$fetchState.pending">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
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
    <template v-else>
      <question
        v-for="(item, index) in questions"
        :key="item.id"
        v-observe-visibility="
          index === questions.length - 1 ? lazyLoadQuestions : false
        "
        :details="item"
      ></question>
    </template>
    <!-- <base-pagination
      v-model="pagination.currentPage"
      class="pagination-no-border"
      :per-page="pagination.perPage"
      :total="total"
    /> -->
  </div>
</template>

<script>
import Question from '~/components/questions/Question.vue'
import { BasePagination } from '@/components/core-components'
// import questionsMixin from '@/mixins/pagination-mixin'
export default {
  components: {
    Question,
    BasePagination,
  },
  // mixins: [questionsMixin],
  layout: 'DashboardLayout',
  data() {
    return {
      items: [],
      questions: [],
      relativeUrl: 'questions',
      currentPage: 1,
    }
  },
  async fetch() {
    const res = await this.$axios.get(
      `questions?tag=nuxt&state=rising&page=${this.currentPage}`
    )

    // const articles = await fetch(
    //   `https://dev.to/api/articles?tag=nuxt&state=rising&page=${this.currentPage}`
    // ).then((res) => res.json())

    this.questions = this.questions.concat(res.data)
    console.log(JSON.stringify(this.questions))
  },
  methods: {
    lazyLoadQuestions(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage++
          this.$fetch()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
