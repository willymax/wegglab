<template>
  <div>
    <questions></questions>
  </div>
</template>

<script>
import Logout from '~/components/widgets/Logout.vue'
import Questions from '~/pages/questions/'
export default {
  components: {
    Logout,
    Questions,
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
