<template>
  <div class="relative w-full">
    <!-- <div class="inset-0 bg-center absolute w-full">
      <img src="~/assets/img/blurry.png" class="object-cover w-full" />
      <div></div>
      <img src="~/assets/img/blurry.png" bg-[url(/img/grid.svg)]
      class="object-cover w-full" />
    </div> -->
    <div
      class="absolute inset-0 bg-[url(~/assets/img/blurry.png)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div class="top-0 left-0 z-10 absolute w-full h-48 min-h-full">
      <div class="flex flex-col justify-center min-h-fit">
        <card class="min-w-fit text-center m-auto bg-gray-300">
          <p>Get full Expert solution in seconds</p>
          <paypal-buy-button></paypal-buy-button>
          <h2>Or subscribe to access answers</h2>

          <base-nuxt-button-link to="/subscriptions/plans"
            >Subscribe</base-nuxt-button-link
          >
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
}
</script>

<style lang="scss" scoped></style>
