<template>
  <div class="container">
    <div>
      <profile-nav-bar></profile-nav-bar>
    </div>
    <div>
      <card class="border-2 m-4">
        <nuxt-child />
      </card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/core-components/Cards/Card.vue'
import ProfileNavBar from '~/components/settings/ProfileNavBar.vue'
export default {
  components: { ProfileNavBar, Card },
  layout: 'ResponsiveDashboard',
}
</script>

<style lang="scss" scoped></style>
