<template>
  <!-- <div id="paypal-button-container" ref="paypalButtonContainer"></div> -->
  <div>
    <base-button @click="createBillingAgreement()">Subscribe</base-button>
  </div>
</template>

<script>
export default {
  props: {
    planId: {
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
        name: 'Override Agreement',
        description:
          'PayPal payment agreement that overrides merchant preferences and shipping fee and tax information.',
        start_date: this.internetDate,
        payer: {
          payment_method: 'paypal',
          // payer_info: {
          //   email: 'payer@example.com',
          // },
        },
        plan: {
          id: this.planId,
        },
        // shipping_address: {
        //   line1: 'Hotel Staybridge',
        //   line2: 'Crooke Street',
        //   city: 'San Jose',
        //   state: 'CA',
        //   postal_code: '95112',
        //   country_code: 'US',
        // },
        override_merchant_preferences: {
          setup_fee: {
            value: '0',
            currency: 'USD',
          },
          return_url: 'http://localhost:3000/subscriptions/create',
          cancel_url: 'http://localhost:3000/subscriptions/create',
          auto_bill_amount: 'YES',
          initial_fail_amount_action: 'CONTINUE',
          max_fail_attempts: '11',
        },
        // override_charge_models: [
        //   {
        //     charge_id: 'CHM-8373958130821962WUTENA2Q',
        //     amount: {
        //       value: '1',
        //       currency: 'GBP',
        //     },
        //   },
        // ],
      }
    },
  },
  mounted() {
    // this.renderButtons()
  },
  methods: {
    async createBillingAgreement() {
      //
      const res = await this.$store.dispatch('paypal/getAccessToken')
      const accessToken = res.access_token
      try {
        const response = await fetch(
          'https://api-m.sandbox.paypal.com/v1/payments/billing-agreements/',
          {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.agreement),
          }
        ).then((res) => res.json())
        if (response.status === 201) {
          console.log(`url ${response.links[0].href}`)
          fetch(response.links[0].href, {
            method: 'POST',
            redirect: 'follow',
          }).then((response) => {
            if (response.redirected) {
              //
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
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
              console.log(JSON.stringify(data))
              that.$axios
                .post('/subscriptions/subscribeUser', {
                  subscription_id: data.subscriptionID,
                  paypal_plan_id: `${that.planId}`,
                  // status: data.status,
                  // start_time: data.start_time,
                })
                .then((res) => {
                  that.$auth.setUser(res.data.data)
                  that.$router.back()
                })
                .catch((error) => {
                  if (error.response) {
                    console.log(JSON.stringify(error.response.data))
                  } else if (error.request) {
                    console.log(error.request)
                  } else {
                    //
                    console.log('Error', error.message)
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
