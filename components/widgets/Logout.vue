<template>
  <div class="items-center">
    <button class="btn btn-sm btn-info mr-4" @click="showDialog = !showDialog">
      Logout
    </button>
    <modal :show="showDialog" :show-close="true">
      <template #default> Do you want to logout? </template>
    </modal>
  </div>
</template>

<script>
import Modal from '~/components/core-components/Modal.vue'
export default {
  components: {
    Modal,
  },
  data() {
    return {
      showDialog: false,
    }
  },
  watch: {},
  methods: {
    logout() {
      this.$toast.error('Error is')
      // try {
      //   await this.$auth.logout()
      // } catch (error) {
      //   this.$toast.error(error.response.message)
      // }
    },
  },
}
</script>

<style lang="scss" scoped></style>
