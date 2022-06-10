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
            return that.$axios
              .post('orders', {
                questionId: that.theQuestion._id,
                total: that.amount,
                totalTax: 0,
              })
              .then((response) => {
                return response.data._id
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
              that.$axios
                .post('answer-purchases/', {
                  questionId: that.theQuestion._id,
                  payment_id: orderData.id,
                  user_id: that.$auth.user.id,
                  status: orderData.status,
                  amount: that.amount,
                  create_time: orderData.create_time,
                  update_time: orderData.update_time,
                })
                .then((response) => {
                  // Show a success message within this page, e.g.
                  const element = document.getElementById(
                    'paypal-button-container'
                  )
                  element.innerHTML = ''
                  element.innerHTML = '<h3>Thank you for your payment!</h3>'
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  that.$nuxt.$emit('paymentReceived', true)
                })
                .catch((error) => {
                  console.log(error)
                })
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
