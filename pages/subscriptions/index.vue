<template>
  <div>
    <base-table :items="subscriptions" :columns="columns">
      <template #actions> </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: {
    BaseTable,
  },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      subscriptions: [],
      columns: [
        {
          label: 'Id',
          'min-width': '310px',
          prop: 'subscription.subscription_id',
          sortable: 'custom',
        },
        {
          label: 'status',
          'min-width': '310px',
          prop: 'subscription.status',
          sortable: 'custom',
        },
        {
          label: 'User',
          'min-width': '310px',
          prop: 'first_name',
          sortable: 'custom',
        },
        {
          label: 'Plan Id',
          'min-width': '310px',
          prop: 'subscription.paypal_plan_id',
          sortable: 'custom',
        },
        {
          label: 'Start Date',
          'min-width': '310px',
          prop: 'subscription.start_time',
          sortable: 'custom',
        },
      ],
    }
  },
  async fetch() {
    const res = await this.$axios.get('subscriptions')
    this.subscriptions = this.subscriptions.concat(res.data.data)
  },
}
</script>

<style lang="scss" scoped></style>
