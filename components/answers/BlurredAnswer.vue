<template>
  <div class="relative w-full min-h-fit md:py-12">
    <!-- <div class="inset-0 bg-center absolute w-full">
      <img src="~/assets/img/blurry.png" class="object-cover w-full" />
      <div></div>
      <img src="~/assets/img/blurry.png" bg-[url(/img/grid.svg)]
      class="object-cover w-full" />
    </div> -->
    <div
      :style="{
        backgroundImage: 'url(' + require('@/assets/img/blurry.png') + ')',
      }"
      class="absolute inset-0 bg-center bg-no-repeat bg-cover [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div class="top-0 left-0 z-10 relative w-full">
      <div class="flex flex-col justify-center">
        <card class="min-w-fit text-center m-auto bg-gray-300">
          <div class="px-6 sm:px-12">
            <p>Get full Expert solution in seconds</p>
            <paypal-buy-button
              :amount="30"
              @paymentReceived="paymentReceived"
            ></paypal-buy-button>
            <h2>Or subscribe to access answers</h2>

            <base-nuxt-button-link to="/subscriptions/plans"
              >Subscribe</base-nuxt-button-link
            >
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Card from '../core-components/Cards/Card.vue'
import PaypalBuyButton from '../subscriptions/PaypalBuyButton.vue'
export default {
  components: { Card, BaseNuxtButtonLink, PaypalBuyButton },
  methods: {
    paymentReceived() {
      // reload page
      // location.reload(true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
