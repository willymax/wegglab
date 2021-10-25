export default {
  data() {
    return {
      selectedRows: [],
      users: [],
      sort: 'created_at',

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
  created() {
    this.getItems()
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
        .then(function (response) {
          // handle success
          that.items = response.data.data
          that.pagination.currentPage = response.data.paginator.current_page
          that.pagination.perPage = parseInt(response.data.paginator.per_page)
          that.total = response.data.paginator.total_count
        })
        .catch(function (error) {
          // handle error
          console.log(error)
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
