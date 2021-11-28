<template>
  <div>
    <base-table :items="plans" :columns="columns">
      <template #actions>
        <base-button @click="subscribe">Subscribe</base-button>
      </template></base-table
    >
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseTable from '~/components/tables/BaseTable.vue'
export default {
  components: { BaseTable, BaseButton },
  layout: 'DashboardLayout',
  data() {
    return {
      plans: [],
      columns: [
        {
          label: 'Id',
          'min-width': '310px',
          prop: 'id',
          sortable: 'custom',
        },
        {
          label: 'Product ID',
          'min-width': '310px',
          prop: 'product_id',
          sortable: 'custom',
        },
        {
          label: 'Name',
          'min-width': '310px',
          prop: 'name',
          sortable: 'custom',
        },
        {
          label: 'Status',
          'min-width': '310px',
          prop: 'status',
          sortable: 'custom',
        },
        {
          label: 'Description',
          'min-width': '310px',
          prop: 'description',
          sortable: 'custom',
        },
        {
          label: 'Create time',
          'min-width': '310px',
          prop: 'create_time',
          sortable: 'custom',
        },
      ],
    }
  },
  async fetch() {
    let tries = 0
    let retry = true
    while (retry) {
      try {
        const res = await this.$store.dispatch('paypal/getAccessToken')
        const accessToken = res.access_token
        try {
          retry = false
          const response = await fetch(
            'https://api-m.sandbox.paypal.com/v1/billing/plans',
            {
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          ).then((res) => res.json())
          console.log(`The plans are ${JSON.stringify(response.plans)}`)
          this.plans = response.plans
        } catch ($ex) {
          tries++
          if (tries >= 3) {
            retry = false
          }
        }
      } catch (error) {}
    }
  },
  methods: {
    subscribe() {},
  },
}
</script>

<style lang="scss" scoped></style>
