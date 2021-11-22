<template>
  <card>
    <template #header>
      <h1>Change Password</h1>
    </template>
    <form ref="password_form" @submit.prevent="handleChangePassword">
      <base-input
        v-model="form.current_password"
        type="password"
        name="current_password"
        autocomplete="on"
        class="mb-3"
        prepend-icon="fa fa-key"
        label="Current Password"
        rules="required"
      />
      <validation-error :errors="apiValidationErrors.current_password" />
      <base-input
        v-model="form.password"
        type="password"
        name="password"
        autocomplete="on"
        class="mb-3"
        prepend-icon="fa fa-key"
        label="New Password"
        rules="required"
      />
      <validation-error :errors="apiValidationErrors.password" />
      <base-input
        v-model="form.password_confirmation"
        type="password"
        name="confirm_password"
        autocomplete="on"
        class="mb-3"
        prepend-icon="fa fa-key"
        label="Confirm Password"
        rules="required"
      />
      <validation-error :errors="apiValidationErrors.confirm_password" />
      <div class="my-4">
        <base-button
          type="button"
          class="btn btn-md btn-secondary"
          native-type="submit"
          :loading="loading"
        >
          Change Password
        </base-button>
      </div>
    </form>
  </card>
</template>
<script>
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import formMixin from '@/mixins/form-mixin'
import ValidationError from '~/components/ValidationError.vue'
import Card from '~/components/core-components/Cards/Card.vue'

export default {
  name: 'UserPasswordCard',
  components: {
    BaseInput,
    BaseButton,
    ValidationError,
    Card,
  },
  mixins: [formMixin],

  props: {},
  data() {
    return {
      loading: false,
      form: {
        current_password: null,
        password_new: null,
        password_confirmation: null,
      },
      user: Object.assign({}, this.$auth.user),
    }
  },
  computed: {},
  methods: {
    async handleChangePassword() {
      if (['1'].includes(this.user.id)) {
        await this.$notify({
          type: 'danger',
          message: 'You are not allowed not change data of default users.',
        })
        return
      }
      this.user.current_password = this.form.current_password
      this.user.password = this.form.password
      this.user.password_confirmation = this.form.password_confirmation
      try {
        await this.$store.dispatch('users/update', this.user)
        this.$refs.password_form.reset()
        this.unsetApiValidationErrors()
        this.$notify({
          type: 'success',
          message: 'Password changed successfully.',
        })
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Oops, something went wrong!',
        })
        console.log(JSON.stringify(error.response))
        this.setApiValidation(error.response.data.errors)
      }
    },
  },
}
</script>
