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
    price: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    internetDate() {
      const currentDate = new Date()
      const theDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}T00:00:00`
      return theDate
    },
    agreement() {
      return {
        plan_id: this.planId,
        start_time: this.internetDate,
        quantity: '1',
        shipping_amount: {
          currency_code: 'USD',
          value: '0',
        },
        // subscriber: {
        //   name: {
        //     given_name: 'John',
        //     surname: 'Doe',
        //   },
        //   email_address: 'customer@example.com',
        //   shipping_address: {
        //     name: {
        //       full_name: 'John Doe',
        //     },
        //     address: {
        //       address_line_1: '2211 N First Street',
        //       address_line_2: 'Building 17',
        //       admin_area_2: 'San Jose',
        //       admin_area_1: 'CA',
        //       postal_code: '95131',
        //       country_code: 'US',
        //     },
        //   },
        // },
        application_context: {
          brand_name: 'Wegglab',
          locale: 'en-US',
          shipping_preference: 'SET_PROVIDED_ADDRESS',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
          },
          return_url: 'https://example.com/returnUrl',
          cancel_url: 'https://example.com/cancelUrl',
        },
      }
    },
  },
  mounted() {
    this.renderButtons()
  },
  methods: {
    async createBillingAgreement() {
      //
      const res = await this.$store.dispatch('paypal/getAccessToken')
      const accessToken = res.access_token
      fetch('https://api-m.sandbox.paypal.com/v1/billing/subscriptions', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.agreement),
      })
        .then((res) => res.json())
        .then((response) => {
          const MyWindow = window.open(
            response.links[0].href,
            'MyWindow',
            'width=600,height=300'
          )
          // top.window.opener.location =
          // fetch(response.links[0].href, {
          //   method: 'POST',
          //   redirect: 'follow',
          // }).then((response) => {
          //   if (response.redirected) {
          //     //
          //   }
          // })
          if (response.status === 201) {
            top.window.opener.location = response.links[0].href
            fetch(response.links[0].href, {
              method: 'POST',
              redirect: 'follow',
            }).then((response) => {
              if (response.redirected) {
                //
              }
            })
          }
        })
        .catch(function (err) {
          this.$toast.error(err.message)
        })
    },
    renderButtons() {
      const that = this
      this.sleep(100).then(() => {
        const paypalButtonContainer = this.$refs.paypalButtonContainer
        // eslint-disable-next-line no-undef
        paypal
          .Buttons({
            style: {
              size: 'responsive',
              tagline: 'false',
              color: 'blue',
              shape: 'pill',
            },
            createSubscription(data, actions) {
              return actions.subscription.create({
                plan_id: `${that.planId}`,
              })
            },
            onApprove(data, actions) {
              that.$axios
                .post('/subscriptions', {
                  subscription_id: data.subscriptionID,
                  paypal_plan_id: `${that.planId}`,
                  // status: data.status,
                  // start_time: that.internetDate,
                })
                .then((res) => {
                  // Object.assign(target, source)
                  that.$auth.setUser(
                    Object.assign(that.$auth.user, res.data.data)
                  )
                  that.$router.back()
                })
                .catch((error) => {
                  if (error.response) {
                    //
                  } else if (error.request) {
                    //
                  } else {
                    //
                  }
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
