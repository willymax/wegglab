<template>
  <div>
    <div>
      <nav-bar></nav-bar>
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
import NavBar from '~/components/settings/NavBar.vue'
export default {
  components: { NavBar, Card },
  layout: 'DashboardLayout',
}
</script>

<style lang="scss" scoped></style>
