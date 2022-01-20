<template>
  <div>
    <!-- Container -->
    <div class="container mx-auto">
      <div class="container">
        <notifications></notifications>
      </div>
      <div class="flex justify-center px-6 my-12">
        <!-- Row -->
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <!-- Col -->
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            :style="{
              backgroundImage: 'url(' + require('@/assets/login.svg') + ')',
            }"
          ></div>
          <!-- Col -->
          <div
            class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none"
          >
            <div class="px-8 mb-4 text-center">
              <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p class="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form
              class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              @submit.prevent="handleSubmit()"
            >
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="form.data.attributes.email"
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Enter Email Address..."
                />
                <div class="">
                  <validation-error :errors="apiValidationErrors.email" />
                </div>
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <nuxt-link
                  to="/register"
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Create an Account!
                </nuxt-link>
                <a href="./register.html"> </a>
              </div>
              <div class="text-center">
                <nuxt-link
                  to="/login"
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Already have an account? Login!
                </nuxt-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValidationError from '~/components/ValidationError.vue'
import formMixin from '@/mixins/form-mixin'
export default {
  components: { ValidationError },
  mixins: [formMixin],
  layout: 'AuthLayout',
  auth: 'guest',
  data() {
    return {
      form: {
        data: {
          type: 'password-forgot',
          attributes: {
            email: '',
            redirect_url: process.env.baseUrl + '/password/email',
          },
        },
      },
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$isDemo === 1) {
        await this.$notify({
          type: 'danger',
          message: 'Password reset is disabled in the demo.',
        })
        return
      }
      try {
        await this.$store.dispatch(
          'reset/forgotPassword',
          this.form.data.attributes
        )
        await this.$notify({
          type: 'success',
          message: 'An email with reset password link was sent.',
        })
      } catch (error) {
        await this.$notify({
          type: 'danger',
          message: "We can't find a user with that e-mail address.",
        })
        this.setApiValidation(error.response.data.errors)
      }
    },
  },
}
</script>
