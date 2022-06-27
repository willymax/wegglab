<template>
  <div>
    <base-table
      :items="orders"
      :columns="columns"
      table-title="List of Orders"
      resource="orders"
    >
      <template #actions>
        <base-button @click="refund">Refund</base-button>
      </template></base-table
    >
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: { BaseTable, BaseButton },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      orders: [],
      columns: [
        {
          label: 'Order Id',
          'min-width': '310px',
          prop: '_id',
          sortable: 'custom',
        },
        {
          label: 'Paypal Order Id',
          'min-width': '310px',
          prop: 'paypalOrderId',
          sortable: 'custom',
        },
        {
          label: 'Student',
          'min-width': '310px',
          prop: 'customer',
          sortable: 'custom',
        },
        {
          label: 'Question',
          'min-width': '310px',
          prop: 'question._id',
          sortable: 'custom',
        },
        {
          label: 'Total ($)',
          'min-width': '310px',
          prop: 'total',
          sortable: 'custom',
        },
        {
          label: 'Create time',
          'min-width': '310px',
          prop: 'createdAt',
          sortable: 'custom',
        },
        {
          label: 'Status',
          'min-width': '310px',
          prop: 'status',
          sortable: 'custom',
        },
      ],
    }
  },
  async fetch() {},
  mounted() {
    // this.getOrders()
  },
  methods: {
    refund() {},
    async getOrders() {
      let tries = 0
      let retry = true
      while (retry) {
        try {
          const res = await this.$store.dispatch('paypal/getAccessToken')
          const accessToken = res.access_token
          try {
            retry = false
            const response = await this.$axios.get('/orders')
            this.orders = response.data.data
          } catch ($ex) {}
        } catch (error) {
          tries++
          if (tries >= 3) {
            retry = false
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
