<template>
  <div>
    <questions></questions>
  </div>
</template>

<script>
import Questions from '~/components/questions/Questions.vue'
import Logout from '~/components/widgets/Logout.vue'
export default {
  components: {
    Logout,
    Questions,
  },
  layout: 'ResponsiveDashboard',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$auth.loggedIn) {
      return redirect('/login')
    }
  },
}
</script>

<style lang="scss" scoped></style>
