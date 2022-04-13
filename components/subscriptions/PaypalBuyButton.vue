<template>
  <div id="smart-button-container">
    <div style="text-align: center">
      <div id="paypal-button-container"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.$nuxt.$emit('paymentReceived', true)
    this.initPayPalButton()
  },
  methods: {
    initPayPalButton() {
      const that = this
      // eslint-disable-next-line no-undef
      paypal
        .Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'vertical',
            label: 'pay',
          },
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [
                { amount: { currency_code: 'USD', value: that.amount } },
              ],
            })
          },
          onApprove(data, actions) {
            return actions.order.capture().then(function (orderData) {
              // Full available details
              console.log(
                'Capture result',
                orderData,
                JSON.stringify(orderData, null, 2)
              )

              // Show a success message within this page, e.g.
              const element = document.getElementById('paypal-button-container')
              element.innerHTML = ''
              element.innerHTML = '<h3>Thank you for your payment!</h3>'
              // Or go to another URL:  actions.redirect('thank_you.html');
              that.$emit('paymentReceived', true)
              that.$nuxt.$emit('paymentReceived', true)
            })
          },

          onError(err) {
            console.log(err)
          },
        })
        .render('#paypal-button-container')
    },
  },
}
</script>

<style lang="scss" scoped></style>
