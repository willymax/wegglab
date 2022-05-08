<template>
  <div class="items-center m-2">
    <button
      class="btn btn-sm btn-info mr-4 w-full"
      @click="showDialog = !showDialog"
    >
      Logout
    </button>
    <app-modal :show.sync="show">
      <template #default>
        <p>You are about to logout</p>
      </template>
      <template #footer>
        <div class="flex flex-row justify-center space-x-4 m-2">
          <button @click="showDialog = !showDialog">Close</button>
          <base-button width="md" :loading="loading" round @click="logout"
            >Continue</base-button
          >
        </div>
      </template>
    </app-modal>
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
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
