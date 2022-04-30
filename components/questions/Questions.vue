<template>
  <with-right-side-bar>
    <div class="">
      <template v-if="$fetchState.pending">
        <div class="article-cards-wrapper">
          <content-placeholders
            v-for="p in paginator.per_page"
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
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      items: [],
      questions: [],
      relativeUrl: 'questions',
      paginator: {
        total_count: 0,
        per_page: 5,
        current_page: 1,
        last_page: 0,
        total_pages: 0,
        from: 0,
        to: 0,
      },
    }
  },
  async fetch() {
    let queryParams = ''
    if (this.userId) {
      queryParams = queryParams + `&userId=${this.userId}`
    }
    const res = await this.$axios.get(
      `questions?page=${this.paginator.current_page}&perPage=${this.paginator.per_page}${queryParams}`
    )
    this.paginator = { ...res.data.paginator }
    this.questions = this.questions.concat(res.data.data)
  },
  watch: {
    userId(newValue, oldValue) {
      this.resetAndFetch()
    },
  },
  methods: {
    resetAndFetch() {
      this.paginator.current_page = 1
      this.questions = []
      this.$fetch()
    },
    lazyLoadQuestions(isVisible) {
      if (
        this.paginator.total_count < this.paginator.per_page ||
        this.paginator.current_page >= this.paginator.last_page
      ) {
        return
      }
      if (isVisible) {
        this.paginator.current_page++
        this.$fetch()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
