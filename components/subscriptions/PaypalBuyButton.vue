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
  computed: {
    theQuestion() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  mounted() {
    this.initPayPalButton()
  },
  methods: {
    initPayPalButton() {
      const that = this
      let orderId
      // eslint-disable-next-line no-undef
      paypal
        .Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'vertical',
            label: 'pay',
          },
          onClick(data, actions) {
            if (that.$auth.loggedIn) {
              return actions.resolve()
            } else {
              console.log('redirect: this.$route.path ' + actions)
              // to be changed in future

              return actions.reject().then((res) => {
                that.$router.push({
                  name: 'login',
                  query: { redirect: that.$route.path },
                })
              })
            }
          },
          createOrder(data, actions) {
            return that.$axios
              .post('orders', {
                questionId: that.theQuestion._id,
                total: that.amount,
                totalTax: 0,
              })
              .then((response) => {
                if (response.data) {
                  return response.data.paypalOrderId
                } else {
                  return null
                  // return actions.reject()
                }
              })
            // return actions.order
            //   .create({
            //     purchase_units: [
            //       {
            //         amount: { currency_code: 'USD', value: that.amount },
            //         custom_id: window.wegglabOrderId,
            //       },
            //     ],
            //   })
            //   .then((orderData) => {
            //     console.log('orderData', orderData)
            //     console.log('orderData.id', orderData.id)
            //     orderId = orderData.id // needed later to complete capture
            //     return orderData.id
            //   })
          },
          onApprove(data, actions) {
            return that.$axios
              .get(`paypal/orders/capture/${data.orderID}`)
              .then(function (orderData) {
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you
                // This example reads a v2/checkout/orders capture response, propagated from the server
                // You could use a different API or structure for your 'orderData'
                const errorDetail =
                  Array.isArray(orderData.details) && orderData.details[0]
                if (
                  errorDetail &&
                  errorDetail.issue === 'INSTRUMENT_DECLINED'
                ) {
                  return actions.restart() // Recoverable state, per:
                  // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                }
                if (errorDetail) {
                  let msg = 'Sorry, your transaction could not be processed.'
                  if (errorDetail.description)
                    msg += '\n\n' + errorDetail.description
                  if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')'
                  return alert(msg) // Show a failure message
                }
                // Full available details
                // Show a success message or redirect
                // alert('Transaction completed!')
                // Show a success message within this page, e.g.
                const element = document.getElementById(
                  'paypal-button-container'
                )
                element.innerHTML = ''
                element.innerHTML = '<h3>Thank you for your payment!</h3>'
                // Or go to another URL:  actions.redirect('thank_you.html');
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
