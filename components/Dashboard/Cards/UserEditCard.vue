<template>
  <div class="card">
    <div class="card-header">
      <h1>Edit Profile</h1>
    </div>
    <div class="card-body">
      <form ref="profile_form" @submit.prevent="handleProfileUpdate">
        <base-input
          v-model="mutableUser.name"
          label="Name"
          prepend-icon="fas fa-user"
          placeholder="Your name"
        />
        <validation-error :errors="apiValidationErrors.name" />
        <base-input
          v-model="mutableUser.email"
          label="Email"
          prepend-icon="fas fa-envelope"
          placeholder="Email"
        />
        <validation-error :errors="apiValidationErrors.email" />
        <div class="my-4">
          <base-button
            type="button"
            class="btn btn-sm btn-primary"
            native-type="submit"
          >
            Submit
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import formMixin from '@/mixins/form-mixin'
import ValidationError from '~/components/ValidationError.vue'

export default {
  name: 'UserEditCard',

  components: {
    BaseInput,
    BaseButton,
    ValidationError,
  },

  mixins: [formMixin],

  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      mutableUser: JSON.parse(JSON.stringify(this.user)),
    }
  },

  methods: {
    async handleProfileUpdate() {
      if (['1'].includes(this.mutableUser._id)) {
        await this.$notify({
          type: 'danger',
          message: 'You are not allowed not change data of default users.',
        })
        return
      }
      try {
        await this.$store.dispatch('profile/update', this.mutableUser)
        this.unsetApiValidationErrors()

        this.$notify({
          type: 'success',
          message: 'Profile updated successfully.',
        })
        await this.$store.getters['profile/me']
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Oops, something went wrong!',
        })
        this.setApiValidation(error.response.data.errors)
      }
    },
  },
}
</script>
