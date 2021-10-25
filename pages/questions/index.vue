<template>
  <div class="">
    <ul class="list-none">
      <li v-for="(item, index) in items" :key="item.id">
        <question :details="item"></question>
      </li>
    </ul>
    <base-pagination
      v-model="pagination.currentPage"
      class="pagination-no-border"
      :per-page="pagination.perPage"
      :total="total"
    />
  </div>
</template>

<script>
import Question from '~/components/questions/Question.vue'
import { BasePagination } from '@/components/core-components'
import questionsMixin from '@/mixins/pagination-mixin'
export default {
  components: {
    Question,
    BasePagination,
  },
  mixins: [questionsMixin],
  layout: 'DashboardLayout',
  data() {
    return {
      items: [],
      relativeUrl: 'questions',
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
