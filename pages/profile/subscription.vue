<template>
  <div>
    <h3>Your Subscription</h3>
    <div v-if="subscribed">
      <card>
        <template #header>Plan Name</template>
        <div>
          {{ subscription }}
        </div>
      </card>
    </div>
    <div v-else>
      <h3>You don't have active subscription</h3>
      <plans></plans>
    </div>
  </div>
</template>

<script>
import Card from '~/components/core-components/Cards/Card.vue'
import Plans from '~/components/subscriptions/Plans.vue'
export default {
  components: { Plans },
  Cardayout: 'AccountSettings',
  data() {
    return {
      subscription: {},
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    subscribed() {
      return this.user.pay_pal_subscription
        ? this.user.pay_pal_subscription.status === 'ACTIVE'
        : false
    },
  },
  mounted() {
    this.getSubscription()
  },
  methods: {
    async getSubscription() {
      // const res = await this.$store.dispatch('paypal/getAccessToken')
      // const accessToken = res.access_token
      const accessToken =
        'A21AAKCs01Dvv1XQ0Bdp9FXL0Ii3NBW7TZB42rbxN6AT6InwO9rYOc1P4MAUKT1TQyB0k3LFvCp0JM6IseRejGrim2ZNLKcwg'
      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${this.user.pay_pal_subscription.subscription_id}`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json())
      this.subscription = response
    },
  },
}
</script>

<style lang="scss" scoped></style>
