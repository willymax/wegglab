<template>
  <!-- Container -->
  <div class="container p-10">
    <div
      class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl"
      style="min-height: 595px"
    >
      <!-- Col -->
      <div
        class="w-full h-auto bg-white hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
        :style="{
          backgroundImage: 'url(' + require('@/assets/login.svg') + ')',
        }"
      >
        <!-- <img src="~assets/login.svg" class="inline" /> -->
      </div>
      <!-- Col -->
      <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
        <div class="flex justify-center items-center h-full">
          <div v-if="!$route.params.type">
            <register-as v-model="userType" :user-type="userType"></register-as>
            <div class="text-center py-5">
              <base-nuxt-button-link :to="`/register/${userType}`" class="w-2/3"
                >Create Account</base-nuxt-button-link
              >
            </div>
          </div>
          <NuxtChild />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import RegisterAs from '~/components/registration/RegisterAs.vue'
import BaseNuxtButtonLink from '~/components/core-components/BaseNuxtButtonLink.vue'
export default {
  auth: false,
  components: {
    RegisterAs,
    BaseNuxtButtonLink,
  },
  mixins: [formMixin],
  layout: 'AuthLayout',
  data() {
    return {
      userType: 'student',
    }
  },
}
</script>

<style lang="scss" scoped></style>
