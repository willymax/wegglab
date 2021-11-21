<template>
  <div id="paypal-button-container" ref="paypalButtonContainer"></div>
</template>

<script>
export default {
  props: {
    planId: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.renderButtons()
  },
  methods: {
    renderButtons() {
      const that = this
      this.sleep(100).then(() => {
        const paypalButtonContainer = this.$refs.paypalButtonContainer
        // eslint-disable-next-line no-undef
        paypal
          .Buttons({
            createSubscription(data, actions) {
              return actions.subscription.create({
                plan_id: `${that.planId}`,
              })
            },

            onApprove(data, actions) {
              that.$axios
                .post('/subscriptions/subscribeUser', {
                  subscription_id: data.subscriptionID,
                  // status: data.status,
                  // start_time: data.start_time,
                })
                .then((res) => {
                  this.$auth.setUser(res.data)
                  this.$router.back()
                })
                .catch((error) => {
                  console.log(JSON.stringify(error.response.data))
                })
            },
          })
          .render(paypalButtonContainer)
      })
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
  },
}
</script>

<style lang="scss" scoped></style>
