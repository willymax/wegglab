<template>
  <div class="relative w-full h-48">
    <div class="top-0 left-0 absolute w-full h-48">
      <img src="~/assets/img/blurry.png" class="object-cover h-48 w-full" />
    </div>
    <div class="top-0 left-0 z-10 absolute w-full h-48 min-h-full">
      <div class="flex flex-col justify-center h-48 min-h-full">
        <card class="w-1/3 text-center m-auto bg-gray-300">
          <h2>Subscribe to access answers</h2>
          <base-nuxt-button-link to="/subscription/plans"
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
export default {
  components: { Card, BaseNuxtButtonLink },
}
</script>

<style lang="scss" scoped></style>
