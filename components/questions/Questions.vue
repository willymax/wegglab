<template>
  <with-right-side-bar>
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
        <h1 class="text-2xl">Questions</h1>
        <question
          v-for="(item, index) in questions"
          :key="item._id"
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
  </with-right-side-bar>
</template>

<script>
import Question from '~/components/questions/Question.vue'
import { BasePagination } from '@/components/core-components'
import WithRightSideBar from '~/components/Dashboard/WithRightSideBar.vue'
// import questionsMixin from '@/mixins/pagination-mixin'
export default {
  name: 'Questions',
  components: {
    Question,
    BasePagination,
    WithRightSideBar,
  },
  // mixins: [questionsMixin],
  layout: 'ResponsiveDashboard',
  data() {
    return {
      items: [],
      questions: [],
      relativeUrl: 'questions',
      currentPage: 1,
      size: 5,
    }
  },
  async fetch() {
    const res = await this.$axios.get(
      `questions?page=${this.currentPage}&perPage=${this.size}`
    )
    this.questions = this.questions.concat(res.data.data)
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
