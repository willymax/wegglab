<template>
  <div class="items-center">
    <button class="btn btn-sm btn-info mr-4" @click="showDialog = !showDialog">
      Logout
    </button>
    <modal :show.sync="showDialog" :show-close="true">
      <template #default> You are about to logout </template>
      <template #footer>
        <div class="flex flex-row justify-center space-x-4 m-2">
          <button @click="showDialog = !showDialog">Close</button>
          <base-button
            width="md"
            :loading="loading"
            round
            transparent
            @click="logout"
            >Continue</base-button
          >
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import Modal from '~/components/core-components/Modal.vue'
export default {
  components: {
    Modal,
    BaseButton,
  },
  data() {
    return {
      showDialog: false,
      loading: false,
    }
  },
  watch: {},
  methods: {
    async logout() {
      this.loading = true
      try {
        await this.$auth.logout()
      } catch (error) {
        this.loading = false
        this.$toast.error(error.response.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
