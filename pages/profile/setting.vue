<template>
  <div class="md:flex flex-row">
    <div>
      <h2 class="bold blur-lg">Personal info</h2>
      <p>Tell us about yourself</p>
    </div>
    <div class="flex-1">
      <form class="p-2 mb-4 rounded">
        <div class="mb-4 space-x-4 md:flex">
          <base-input
            v-model="form.data.attributes.first_name"
            alternative
            class="mb-3"
            placeholder="First Name"
            name="First Name"
            label="First Name"
          ></base-input>
          <base-input
            v-model="form.data.attributes.last_name"
            alternative
            class="mb-3"
            placeholder="First Name"
            name="First Name"
            label="First Name"
          ></base-input>
        </div>
        <div class="mb-4 space-x-4 md:flex">
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
        <div class="w-full">
          <base-label>Profile Image</base-label>
          <div class="flex flex-row items-center md:space-x-4 flex-wrap mb-2">
            <base-avatar
              :user-avatar="userAvatar"
              :loading="loading"
            ></base-avatar>
            <avatar-upload v-model="FILE" @input="uploadFile"></avatar-upload>
          </div>
        </div>
        <div>
          <base-button class="w-full md:w-1/3" @click="update"
            >Save</base-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AvatarUpload from '~/components/core-components/AvatarUpload.vue'
import BaseAvatar from '~/components/core-components/BaseAvatar.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import BaseLabel from '~/components/core-components/BaseLabel.vue'
import Card from '~/components/core-components/Cards/Card.vue'
export default {
  components: {
    BaseButton,
    Card,
    BaseFileUpload,
    BaseAvatar,
    AvatarUpload,
    BaseLabel,
  },
  layout: 'AccountSettings',
  data() {
    return {
      FILE: {},
      loading: false,
      form: {
        data: {
          attributes: {
            first_name: this.$auth.user.first_name,
            last_name: this.$auth.user.last_name,
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
    update() {
      this.$axios
        .put(`users/${this.$auth.user.id}`, { ...this.form.data.attributes })
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Information updated successfully.',
          })
          this.$auth.setUser(
            Object.assign({ ...this.$auth.user }, response.data.data)
          )
        })
        .catch((err) => {
          this.$toast.error(err.message)
        })
    },
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
            this.$auth.setUser(
              Object.assign(this.$auth.user, response.data.data)
            )
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
