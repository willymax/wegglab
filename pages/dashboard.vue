<template>
  <div>Hello dashboard</div>
</template>

<script>
export default {
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
