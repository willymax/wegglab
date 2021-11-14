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
      this.sleep().then(() => {
        const paypalButtonContainer = this.$refs.paypalButtonContainer
        // eslint-disable-next-line no-undef
        paypal
          .Buttons({
            createSubscription(data, actions) {
              return actions.subscription.create({
                plan_id: `${this.planId}`,
              })
            },

            onApprove(data, actions) {
              alert(
                'You have successfully created subscription ' +
                  data.subscriptionID
              )
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
