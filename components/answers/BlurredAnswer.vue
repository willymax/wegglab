<template>
  <div class="relative w-full min-h-fit md:py-12">
    <div
      :style="{
        backgroundImage: 'url(' + require('@/assets/img/blurry.png') + ')',
      }"
      class="absolute inset-0 bg-center bg-no-repeat bg-cover [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div class="top-0 left-0 z-10 relative w-full">
      <div class="flex flex-col justify-center">
        <card class="min-w-fit text-center m-auto bg-gray-300">
          <div v-if="subscribed" class="px-6 sm:px-12">
            <base-button :round="true" @click="unlockQuestion"
              >Show Answers</base-button
            >
          </div>
          <div v-else class="px-6 sm:px-12">
            <p>Get full Expert solution in seconds</p>
            <paypal-buy-button :amount="30"></paypal-buy-button>
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
import BaseButton from '../core-components/BaseButton.vue'
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Card from '../core-components/Cards/Card.vue'
import PaypalBuyButton from '../subscriptions/PaypalBuyButton.vue'
export default {
  components: { Card, BaseNuxtButtonLink, PaypalBuyButton, BaseButton },
  computed: {
    user() {
      return this.$auth.user
    },
    subscribed() {
      return this.user.subscription
        ? this.user.subscription.status === 'ACTIVE'
        : false
    },
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  methods: {
    unlockQuestion() {
      this.$axios
        .get('questions/unlockQuestion/' + this.question._id)
        .then((response) => {
          location.reload(true)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
