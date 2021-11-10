<template>
  <div>Plans {{ plans }}</div>
</template>

<script>
export default {
  layout: 'DashboardLayout',
  data() {
    return {
      plans: [],
    }
  },
  async fetch() {
    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/plans',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization:
            'Bearer A21AAI_TD--qn_fJ8HlHhhR2ilmscVo1fahfCmAQ2U1DepetJgm1rF0HbhBmKE4ANyVMMAb52KkHmfivq1T5bg5YXHf9b-Kyw',
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    this.plans = this.plans.concat(response.plans)
  },
  methods: {
    async getPlans(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization:
            'Bearer A21AAIT2KvcsVY7vfuhlqaf_QDgxxhpIdbJexwhWzyZf74-xkK-pRAtQgesPDJ5nOm2g53-Bgg3tNBZnYebYRzoqqlfOaNVwg',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      return response.json() // parses JSON response into native JavaScript objects
    },
  },
}
</script>

<style lang="scss" scoped></style>
