<template>
  <div>
    <h3>Your Subscription</h3>
  </div>
</template>

<script>
export default {
  layout: 'AccountSettings',
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    async getSubscription() {
      const res = await this.$store.dispatch('paypal/getAccessToken')
      const accessToken = res.access_token
      const response = await fetch(
        `https://api-m.paypal.com/v1/billing/subscriptions/${this.user.subscription_id}`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json())
      // user.subscribed = response.status === 'ACTIVE'
    },
  },
}
</script>

<style lang="scss" scoped></style>
