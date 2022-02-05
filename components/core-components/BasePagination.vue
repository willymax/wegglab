<template>
  <ul
    class="pagination flex pl-0"
    :class="[size && `pagination-${size}`, align && `justify-content-${align}`]"
  >
    <li
      class="page-item prev-page rounded-full"
      :class="{ disabled: value === 1 }"
    >
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <span aria-hidden="true"
          ><i class="fa fa-angle-left" aria-hidden="true"></i
        ></span>
      </a>
    </li>
    <li
      v-for="item in range(minPage, maxPage)"
      :key="item"
      class="page-item"
      :class="{ active: value === item }"
    >
      <a class="page-link" @click="changePage(item)">{{ item }}</a>
    </li>
    <li class="page-item next-page" :class="{ disabled: value === totalPages }">
      <a class="page-link" aria-label="Next" @click="nextPage">
        <span aria-hidden="true"
          ><i class="fa fa-angle-right" aria-hidden="true"></i
        ></span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'BasePagination',
  props: {
    pageCount: {
      type: Number,
      default: 0,
      description:
        'Pagination page count. This should be specified in combination with perPage',
    },
    perPage: {
      type: Number,
      default: 10,
      description:
        'Pagination per page. Should be specified with total or pageCount',
    },
    total: {
      type: Number,
      default: 0,
      description:
        'Can be specified instead of pageCount. The page count in this case will be total/perPage',
    },
    value: {
      type: Number,
      default: 1,
      description: 'Pagination value',
    },
    size: {
      type: String,
      default: '',
      description: 'Pagination size',
    },
    align: {
      type: String,
      default: '',
      description: 'Pagination alignment (e.g center|start|end)',
    },
  },
  data() {
    return {
      defaultPagesToDisplay: 5,
    }
  },
  computed: {
    totalPages() {
      if (this.pageCount > 0) return this.pageCount
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage)
      }
      return 1
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages
      }
      return this.defaultPagesToDisplay
    },
    minPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1
        }
        return this.value - pagesToAdd
      } else {
        return 1
      }
    },
    maxPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage < this.totalPages) {
          return newMaxPage
        } else {
          return this.totalPages
        }
      } else {
        return this.pagesToDisplay
      }
    },
  },
  watch: {
    perPage() {
      this.$emit('input', 1)
    },
    total() {
      this.$emit('input', 1)
    },
  },
  methods: {
    range(min, max) {
      const arr = []
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    changePage(item) {
      this.$emit('input', item)
    },
    nextPage() {
      if (this.value < this.totalPages) {
        this.$emit('input', this.value + 1)
      }
    },
    prevPage() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
  },
}
</script>
<style scoped>
.page-item .page-link,
.page-item span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 0;
  margin: 0 3px;
  border-radius: 50% !important;
  width: 36px;
  height: 36px;
  font-size: 0.875rem;
}
.page-item.disabled .page-link {
  color: #8898aa;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #8898aa;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
</style>
