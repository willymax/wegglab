<template>
  <div>{{ subscriptions }}</div>
</template>

<script>
export default {
  layout: 'DashboardLayout',
  data() {
    return {
      subscriptions: [],
    }
  },
  async fetch() {
    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/subscriptions/',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization:
            'Bearer A21AALyUN4wk0Hi_fZSM9VymtUWjevBdtuDdbywZhpzRTZMz2UXPI1iT5hHHySots4F3skwqXuPVG9NosxlzbTCs_lIzvOTyA',
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    this.subscriptions = this.plans.concat(response.subscriptions)
  },
}
</script>

<style lang="scss" scoped></style>
