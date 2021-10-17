<template>
  <div>
    <p>Hello dashboard</p>
    <logout></logout>
  </div>
</template>

<script>
import Logout from '~/components/widgets/Logout.vue'
export default {
  components: {
    Logout,
  },
  layout: 'DashboardLayout',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$auth.loggedIn) {
      return redirect('/login')
    }
  },
}
</script>

<style lang="scss" scoped></style>
