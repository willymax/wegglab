<template>
  <div class="flex flex-col items-center justify-center">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <div v-else>
      <h1>An error occurred</h1>
      <p>{{ error }}</p>
    </div>
    <base-nuxt-button-link>Home page</base-nuxt-button-link>
  </div>
</template>

<script>
import BaseNuxtButtonLink from '~/components/core-components/BaseNuxtButtonLink.vue'
export default {
  components: { BaseNuxtButtonLink },
  layout: 'ResponsiveDashboard',
  props: {
    error: {
      type: Object,
      default: () => {
        return {
          statusCode: 404,
        }
      },
    },
  },
}
</script>
