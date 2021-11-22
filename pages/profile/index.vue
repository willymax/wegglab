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
              <base-avatar
                :user-avatar="userAvatar"
                :loading="loading"
              ></base-avatar>
              <avatar-upload v-model="FILE" @input="uploadFile"></avatar-upload>
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
import AvatarUpload from '~/components/core-components/AvatarUpload.vue'
import BaseAvatar from '~/components/core-components/BaseAvatar.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import Card from '~/components/core-components/Cards/Card.vue'
export default {
  components: { BaseButton, Card, BaseFileUpload, BaseAvatar, AvatarUpload },
  // layout: 'AccountSettings',
  data() {
    return {
      FILE: {},
      loading: false,
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
      return this.$getImageUrl(this.$auth.user.avatar)
    },
  },
  methods: {
    uploadFile() {
      if (this.FILE) {
        this.loading = true
        const formData = new FormData()
        formData.append('new_avatar', this.FILE)
        delete this.$axios.defaults.headers.common['content-type']
        delete this.$axios.defaults.headers.post['content-type']
        this.$axios({
          method: 'POST',
          url: 'updateAvatar',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        })
          .then((response) => {
            this.loading = false
            this.$notify({
              type: 'success',
              message: 'Avatar uploaded successfully.',
            })
            this.$auth.setUser(response.data.data)
          })
          .catch((error) => {
            this.loading = false
            this.setApiValidation(error.response.data.errors)
          })
          .then(function () {
            // always executed
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
