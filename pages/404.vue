<template>
  <div class="text-center">
    <p>The page you are looking for can not be foound</p>
    <base-nuxt-button-link to="/">Go To Homepage</base-nuxt-button-link>
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseNuxtButtonLink from '~/components/core-components/BaseNuxtButtonLink.vue'
export default {
  components: { BaseButton, BaseNuxtButtonLink },
  layout: 'DashboardLayout',
}
</script>

<style lang="scss" scoped></style>
