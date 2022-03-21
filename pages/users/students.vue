<template>
  <div>
    <base-table
      :items="students"
      :columns="columns"
      :resource="resource"
      :pagination="pagination"
      :total="total"
      :paginated="paginated"
      @getItems="getItems()"
    >
      <template #actions> </template
    ></base-table>
  </div>
</template>

<script>
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: { BaseTable },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      students: [],
      resource: 'users?type=student',
      total: 0,
      paginated: true,
      columns: [
        {
          label: 'Id',
          'min-width': '310px',
          prop: 'id',
          sortable: 'custom',
        },
        {
          label: 'First Name',
          'min-width': '310px',
          prop: 'first_name',
          sortable: 'custom',
        },
        {
          label: 'Last Name',
          'min-width': '310px',
          prop: 'last_name',
          sortable: 'custom',
        },
        {
          label: 'Email',
          'min-width': '310px',
          prop: 'email',
          sortable: 'custom',
        },
        {
          label: 'Created At',
          'min-width': '310px',
          prop: 'createdAt',
          sortable: 'custom',
        },
      ],
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },
    }
  },
  methods: {
    getItems() {
      const that = this
      this.$axios
        .get(this.resource, {
          params: {
            perPage: this.pagination.perPage,
            page: this.pagination.currentPage,
          },
        })
        .then(function (response) {
          // handle success
          that.students = response.data.data
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
  },
}
</script>

<style lang="scss" scoped></style>
