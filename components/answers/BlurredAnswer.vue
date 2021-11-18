<template>
  <div class="relative w-full h-44">
    <div class="top-0 left-0 absolute w-full h-full">
      <img src="~/assets/img/blurry.png" class="object-cover h-48 w-full" />
    </div>
    <div class="top-0 left-0 z-10 absolute w-full h-full">
      <card class="w-1/3 text-center m-auto bg-gray-300">
        <h2>Subscribe to access answers</h2>
        <base-nuxt-button-link to="/subscriptions/create"
          >Subscribe</base-nuxt-button-link
        >
      </card>
    </div>
  </div>
</template>

<script>
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Card from '../core-components/Cards/Card.vue'
export default {
  components: { Card, BaseNuxtButtonLink },
}
</script>

<style lang="scss" scoped></style>
