export default {
  data() {
    return {
      selectedRows: [],
      users: [],
      sort: 'createdAt',

      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },

      total: 1,
    }
  },
  computed: {
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1)
    },

    to() {
      let highBound = this.from + this.pagination.perPage
      if (this.total < highBound) {
        highBound = this.total
      }
      return highBound
    },
  },
  watch: {
    'pagination.currentPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
    'pagination.perPage'(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getItems()
      }
    },
  },
  mounted() {
    // this.getItems()
  },
  methods: {
    getItems() {
      const that = this
      this.$axios
        .get(this.relativeUrl, {
          params: {
            perPage: this.pagination.perPage,
            page: this.pagination.currentPage,
          },
        })
        .then((response) => {
          // handle success
          that.items = response.data.data
          that.pagination.currentPage = response.data.paginator.currentPage
          that.pagination.perPage = parseInt(response.data.paginator.perPage)
          that.total = response.data.paginator.totalCount
        })
        .catch((error) => {
          // handle error
          this.$toast.error(error.message)
        })
        .then(function () {
          // always executed
        })
    },
    onProFeature() {
      this.$notify({
        type: 'danger',
        message: 'This is a PRO feature.',
      })
    },
    sortChange({ prop, order }) {
      if (order === 'descending') {
        this.sort = `-${prop}`
      } else {
        this.sort = `${prop}`
      }
      this.getItems()
    },
  },
}
