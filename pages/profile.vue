<template>
  <div>
    <div>
      <nav-bar></nav-bar>
    </div>
    <div>
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/settings/NavBar.vue'
export default {
  components: { NavBar },
  layout: 'DashboardLayout',
}
</script>

<style lang="scss" scoped></style>
