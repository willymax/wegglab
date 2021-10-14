<template>
  <div class="items-center">
    <button class="btn btn-sm btn-info mr-4" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        this.$toast.error(error.response.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
