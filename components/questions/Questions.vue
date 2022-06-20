<template>
  <with-right-side-bar>
    <div class="">
      <template v-if="$fetchState.pending">
        <div class="article-cards-wrapper">
          <content-placeholders
            v-for="p in 3"
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
        <div class="flex flex-col items-center justify-center">
          <p>{{ $fetchState.error.message }}</p>
          <p>An error occurred while loading questions. Try again.</p>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center items-center">
          <base-input
            v-model="searchText"
            label="Search"
            placeholder="Enter search text"
            class="flex-grow"
            @keydown.enter="performSearch()"
          >
            <template #infoBlock>
              <base-button class="ml-2" @click="performSearch()"
                >Search</base-button
              >
            </template>
          </base-input>
        </div>
        <h1 class="text-2xl">Questions</h1>
        <question
          v-for="(item, index) in questions"
          :key="item._id"
          v-observe-visibility="
            index >= questions.length - 6 ? lazyLoadQuestions : false
          "
          :details="item"
        ></question>
      </template>
      <div class="flex flex-col items-center justify-center">
        <p
          v-if="
            !$fetchState.pending && !$fetchState.error && questions.length === 0
          "
        >
          No questions found
        </p>
        <base-button @click="resetAndFetch()">Refresh</base-button>
      </div>
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
import BaseButton from '../core-components/BaseButton.vue'
import BaseInput from '../core-components/Inputs/BaseInput.vue'
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
    BaseButton,
    BaseInput,
  },
  // mixins: [questionsMixin],
  layout: 'ResponsiveDashboard',
  props: {
    userId: {
      type: String,
      default: null,
    },
    tag: {
      type: String,
      default: null,
    },
    bookmarked: {
      type: Boolean,
      default: false,
    },
    answered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: this.$route.query.search,
      items: [],
      questions: [],
      relativeUrl: 'questions',
      paginator: {
        totalCount: 0,
        perPage: 5,
        currentPage: 1,
        lastPage: 0,
        totalPages: 0,
        from: 0,
        to: 0,
      },
    }
  },
  async fetch() {
    console.log('fetching fetch');
    let queryParams = `&bookmarked=${this.bookmarked}&answered=${this.answered}`
    if (this.userId) {
      queryParams = queryParams + `&userId=${this.userId}`
    }
    if (this.tag) {
      queryParams = queryParams + `&tag=${this.tag}`
    }
    if (this.$route.query.search) {
      queryParams = queryParams + `&search=${this.$route.query.search}`
    }
    const res = await this.$axios.get(
      `questions?page=${this.paginator.currentPage}&perPage=${this.paginator.perPage}${queryParams}`
    )
    this.paginator = { ...res.data.paginator }
    this.questions = this.questions.concat(res.data.data)
  },
  watch: {
    '$route.query'(newValue) {
      this.searchText = this.$route.query.search
      this.resetAndFetch()
    },
    userId(newValue, oldValue) {
      this.resetAndFetch()
    },
    bookmarked(newValue, oldValue) {
      this.resetAndFetch()
    },
    answered(newValue, oldValue) {
      this.resetAndFetch()
    },
  },
  methods: {
    performSearch() {
      this.$router.push({ query: { search: this.searchText } })
    },
    resetAndFetch() {
      this.paginator.currentPage = 1
      this.questions = []
      this.$fetch()
    },
    lazyLoadQuestions(isVisible) {
      if (
        this.paginator.totalCount < this.paginator.perPage ||
        this.paginator.currentPage >= this.paginator.lastPage
      ) {
        return
      }
      if (isVisible) {
        this.paginator.currentPage++
        this.$fetch()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
