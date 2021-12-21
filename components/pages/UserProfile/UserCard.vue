<template>
  <div class="card card-profile">
    <!-- User card-->
    <div>
      <div
        class="w-full bg-cover bg-no-repeat bg-center"
        style="height: 200px; background-image: url()"
      >
        <!-- <img class="opacity-0 w-full h-full" src="" alt="" /> -->
        <div class="bg-black w-full h-full"></div>
      </div>
      <div class="p-4">
        <div class="relative flex w-full">
          <!-- Avatar -->
          <base-avatar
            :user-avatar="userAvatar"
            class="flex flex-1"
          ></base-avatar>
          <!-- Follow Button -->
          <div class="flex flex-row flex-wrap text-right">
            <base-nuxt-button-link to="/billing/update"
              >Update Billing</base-nuxt-button-link
            >
            <button
              class="
                flex
                justify-center
                max-h-max
                whitespace-nowrap
                focus:outline-none focus:ring
                max-w-max
                border
                bg-transparent
                border-blue-500
                text-blue-500
                hover:border-blue-800
                items-center
                hover:shadow-lg
                font-bold
                py-2
                px-4
                rounded-full
                mr-0
                ml-auto
              "
            >
              Edit Profile
            </button>
            <button
              class="
                flex
                justify-center
                max-h-max
                whitespace-nowrap
                focus:outline-none focus:ring
                max-w-max
                border
                bg-transparent
                border-blue-500
                text-blue-500
                hover:border-blue-800
                items-center
                hover:shadow-lg
                font-bold
                py-2
                px-4
                rounded-full
                mr-0
                ml-auto
              "
              to="/"
              @click="changePasswoordClicked()"
            >
              Change Password
            </button>
          </div>
        </div>

        <!-- Profile info -->
        <div class="space-y-1 justify-center w-full mt-3 ml-3">
          <!-- User basic-->
          <div>
            <h2 class="text-xl leading-6 font-bold">
              <span>{{ user.first_name }} {{ user.last_name }}</span>
            </h2>
            <p class="text-sm leading-5 font-medium text-gray-600">
              Student/Expert
            </p>
          </div>
          <!-- Description and others -->
          <div class="mt-3">
            <p class="text-black leading-tight mb-2">Some Text Here</p>
          </div>
          <div
            class="
              pt-3
              flex
              justify-start
              items-start
              w-full
              divide-x divide-gray-800 divide-solid
            "
          >
            <div class="text-center pr-3">
              <span class="font-bold text-black">520</span
              ><span class="text-gray-600"> Questions</span>
            </div>
            <div class="text-center px-3">
              <span class="font-bold text-black">23,4m </span
              ><span class="text-gray-600"> Answers</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-gray-800" />
    </div>
  </div>
</template>
<script>
import BaseAvatar from '~/components/core-components/BaseAvatar.vue'
import BaseNuxtButtonLink from '~/components/core-components/BaseNuxtButtonLink.vue'
export default {
  components: { BaseNuxtButtonLink, BaseAvatar },
  data() {
    return {
      key: '',
      errorLoadingAvatar: false,
    }
  },
  computed: {
    userAvatar() {
      return this.user.avatar
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    async goToBilling() {
      try {
        const res = await this.$axios.get('billing/billing-portal')
      } catch (error) {
        console.log(error)
      }
    },
    changePasswoordClicked() {
      this.$router.push('/profile/password')
    },
  },
}
</script>
<style></style>
