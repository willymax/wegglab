<template>
  <card>
    <div class="flex flex-row">
      <div>
        <h2 class="bold blur-lg">Personal info</h2>
        <p>Tell us about yourself</p>
      </div>
      <div class="flex-1">
        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div class="mb-4 md:flex md:justify-between">
            <base-input
              v-model="form.data.attributes.firstName"
              alternative
              class="mb-3"
              placeholder="First Name"
              name="First Name"
              label="First Name"
            ></base-input>
            <base-input
              v-model="form.data.attributes.lastName"
              alternative
              class="mb-3"
              placeholder="First Name"
              name="First Name"
              label="First Name"
            ></base-input>
          </div>
          <div class="flex">
            <base-input
              v-model="form.data.attributes.email"
              alternative
              class="mb-3"
              placeholder="Email"
              type="email"
              name="email"
              label="Email"
            ></base-input>
          </div>
          <div>
            <label for="">Profile Image</label>
            <div class="flex flex-row items-center">
              <base-avatar :user-avatar="userAvatar"></base-avatar>
              <base-button>Upload New Avatar</base-button>
            </div>
          </div>
          <div>
            <base-button>Save</base-button>
          </div>
        </form>
      </div>
    </div>
  </card>
</template>

<script>
import BaseAvatar from '~/components/core-components/BaseAvatar.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import Card from '~/components/core-components/Cards/Card.vue'
export default {
  components: { BaseButton, Card, BaseFileUpload, BaseAvatar },
  // layout: 'AccountSettings',
  data() {
    return {
      form: {
        data: {
          attributes: {
            firstName: this.$auth.user.first_name,
            lastName: this.$auth.user.last_name,
            email: this.$auth.user.email,
            userProfileImage: {},
          },
        },
      },
    }
  },
  computed: {
    userAvatar() {
      return this.$auth.user.avatar
    },
  },
}
</script>

<style lang="scss" scoped></style>
