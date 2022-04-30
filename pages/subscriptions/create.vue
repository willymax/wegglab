<template>
  <div
    class="container flex flex-wrap pt-4 pb-10 m-auto mt-6 md:mt-15 lg:px-12 xl:px-16"
  >
    <div class="w-full px-0 lg:px-4">
      <h2
        class="px-12 text-base font-bold text-center md:text-2xl text-gray-700"
      >
        Choose your plan
      </h2>
      <p class="py-1 text-sm text-center text-gray-700 mb-10">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>
      <plans></plans>
    </div>
  </div>
</template>

<script>
import Plan from '~/components/subscriptions/Plan.vue'
import Plans from '~/components/subscriptions/Plans.vue'
export default {
  components: { Plan, Plans },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      plans: [],
      subscription: {
        plan_id: 'P-3M2534737G635851KMGHHR2A',
        // start_time: `${new Date().toISOString()}`,
        quantity: '1',
        shipping_amount: {
          currency_code: 'USD',
          value: '10.00',
        },
        subscriber: {
          name: {
            given_name: `${this.$auth.user.first_name}`,
            surname: `${this.$auth.user.last_name}`,
          },
          email_address: `${this.$auth.user.email}`,
          // shipping_address: {
          //   name: {
          //     full_name: `${this.$auth.user.first_name} ${this.$auth.user.last_name}`,
          //   },
          //   // address: {
          //   //   address_line_1: '2211 N First Street',
          //   //   address_line_2: 'Building 17',
          //   //   admin_area_2: 'San Jose',
          //   //   admin_area_1: 'CA',
          //   //   postal_code: '95131',
          //   //   country_code: 'US',
          //   // },
          // },
        },
        application_context: {
          brand_name: 'Wegglab',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
          },
          // return_url: 'http://localhost:3000/subscriptions',
          // cancel_url: 'http://localhost:3000/subscriptions/create',
        },
      },
    }
  },
  async fetch() {
    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/billing/plans',
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization:
            'Bearer A21AALyUN4wk0Hi_fZSM9VymtUWjevBdtuDdbywZhpzRTZMz2UXPI1iT5hHHySots4F3skwqXuPVG9NosxlzbTCs_lIzvOTyA',
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json())
    this.plans = this.plans.concat(response.plans)
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
