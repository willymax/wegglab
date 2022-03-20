<template>
  <div>
    <h3></h3>
    <div v-if="$fetchState.pending">
      <content-loading></content-loading>
    </div>
    <template v-else-if="$fetchState.error">
      <p>{{ $fetchState.error.message }}</p>
    </template>
    <div v-else>
      <card v-if="subscription.status === 'ACTIVE'" header-classes="font-bold">
        <template #header>Your Subscription</template>
        <div>
          <div>
            <base-label>Plan</base-label>
            {{ plan.name }}
          </div>
          <div>
            <base-label>Start Date</base-label>
            {{ subscription.start_time }}
          </div>
          <div>
            <base-label>Next Billing</base-label>
            {{ billing_info.next_billing_time }}
          </div>
          <base-button @click="cancelSubscription()"
            >Cancel Subscription</base-button
          >
        </div>
      </card>
      <div v-else>
        <h3>You don't have active subscription</h3>
        <plans></plans>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseLabel from '~/components/core-components/BaseLabel.vue'
import Card from '~/components/core-components/Cards/Card.vue'
import ContentLoading from '~/components/core-components/ContentLoading.vue'
import Plans from '~/components/subscriptions/Plans.vue'
export default {
  components: { Plans, ContentLoading, BaseLabel, BaseButton },
  Cardayout: 'AccountSettings',
  data() {
    return {
      subscription: {},
      plan: {},
      loading: false,
      errorLoading: false,
    }
  },
  async fetch() {
    if (this.subscribed) {
      const res = await this.$store.dispatch('paypal/getAccessToken')
      const accessToken = res.access_token
      console.log(`${this.user.pay_pal_subscription.subscription_id}`)
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
      console.log(JSON.stringify(response))
      this.subscription = response
      const planResponse = await fetch(
        `https://api.sandbox.paypal.com/v1/billing/plans/${this.user.pay_pal_subscription.paypal_plan_id}`,
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json())
      console.log(JSON.stringify(planResponse))
      this.plan = planResponse
    }
  },
  computed: {
    billing_info() {
      if (this.subscription.billing_info) {
        return this.subscription.billing_info
      }
      return {}
    },
    user() {
      return this.$auth.user
    },
    subscribed() {
      return this.user.pay_pal_subscription
        ? this.user.pay_pal_subscription.status === 'ACTIVE'
        : false
    },
    price() {
      if (this.plan.billing_cycles) {
        return this.plan.billing_cycles.pricing_scheme.fixed_price.value
      }
      return null
    },
    cancellationLink() {
      if (this.subscription.links) {
        return this.subscription.links[0].href
      }
      return ''
    },
  },
  mounted() {
    // this.getSubscription()
  },
  methods: {
    async cancelSubscription() {
      try {
        const res = await this.$store.dispatch('paypal/getAccessToken')
        const accessToken = res.access_token
        await fetch(`${this.cancellationLink}`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {})
          .then((res) => {
            this.subscription.status = 'CANCELLED'
          })
      } catch (error) {
        console.log(error)
      }
    },
    async cancelSubscriptionOnWegglab() {
      //
      try {
        await this.$axios
          .put('subscriptions/unsubscribeUser', {
            subscription_id: this.subscription._id,
          })
          .then((res) => {})
      } catch (error) {}
    },
    getSubscription() {
      if (this.subscribed) {
        this.loading = true
        // const res = await this.$store.dispatch('paypal/getAccessToken')
        this.$axios
          .get(
            `subscriptions/paypalSubscriptions/${this.$auth.user.pay_pal_subscription._id}`
          )
          .then((res) => {
            this.subscription = res.data.data
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            //
            console.log(error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
