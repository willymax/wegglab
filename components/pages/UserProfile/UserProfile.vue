<template>
  <div class="card card-profile">
    <!-- User card-->
    <div>
      <div
        class="w-full bg-cover bg-no-repeat bg-center"
        style="height: 100px; background-image: url()"
      >
        <!-- <img class="opacity-0 w-full h-full" src="" alt="" /> -->
        <div class="bg-black w-full h-full"></div>
      </div>
      <div class="p-4 w-3/4 m-auto">
        <div class="relative w-full">
          <div class="flex w-full">
            <!-- Avatar -->
            <div class="flex flex-1 justify-center">
              <div style="margin-top: -6rem">
                <div
                  style="height: 9rem; width: 9rem"
                  class="md rounded-full relative avatar"
                >
                  <img
                    style="height: 9rem; width: 9rem"
                    class="md rounded-full relative border-4 border-gray-900"
                    :src="userAvatar || require('~/assets/img/avatar.png')"
                    alt=""
                    @error="errorLoadingAvatar == true"
                  />
                  <div class="absolute"></div>
                </div>
              </div>
            </div>
            <!-- Follow Button -->
            <div class="flex flex-row flex-wrap text-right"></div>
          </div>
          <button
            class="
              py-2
              px-4
              bg-green-500
              text-white
              font-semibold
              rounded-lg
              shadow-md
              hover:bg-green-700
              focus:outline-none
              focus:ring-2
              focus:ring-green-400
              focus:ring-opacity-75
              absolute
              right-0
              top-0
            "
          >
            Follow
          </button>
        </div>

        <!-- Profile info -->
        <div class="space-y-1 justify-center w-full mt-3 ml-3">
          <!-- User basic-->
          <div class="text-center">
            <h2 class="text-xl leading-6 font-bold">
              <span>{{ user.first_name }} {{ user.last_name }}</span>
            </h2>
            <p class="text-sm leading-5 font-medium text-gray-600">
              Student/Expert
            </p>
          </div>
          <!-- Description and others -->
          <div class="mt-3 text-center">
            <p class="text-black leading-tight mb-2">Your Tagline</p>
          </div>
          <div
            class="
              pt-3
              flex
              justify-center
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
export default {
  data() {
    return {
      key: '',
      errorLoadingAvatar: false,
    }
  },
  computed: {
    userAvatar() {
      return this.user.avatar
      // return this.user.avatar
      //   ? this.$getImageUrl(this.user.avatar)
      //   : '~/assets/img/avatar.png'
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    changePasswoordClicked() {
      this.$router.push('/settings/password')
    },
  },
}
</script>
<style></style>
