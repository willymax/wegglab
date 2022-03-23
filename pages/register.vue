<template>
  <!-- Container -->
  <div class="container p-10">
    <div
      class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl"
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
        <div>
          <google-button @click="socialLogin('google')"></google-button>
          <facebook-button @click="socialLogin('facebook')"></facebook-button>
          <twitter-button @click="socialLogin('twitter')"></twitter-button>
        </div>
        <hr class="mb-6 border-t" />
        <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
        <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <base-input
                v-model="form.data.attributes.first_name"
                alternative
                class="mb-3"
                placeholder="First Name"
                name="First Name"
                label="First Name"
              ></base-input>
              <validation-error :errors="apiValidationErrors.first_name" />
            </div>
            <div class="md:ml-2">
              <base-input
                v-model="form.data.attributes.last_name"
                alternative
                class="mb-3"
                placeholder="Last Name"
                name="Last Name"
                label="Last Name"
              ></base-input>
              <validation-error :errors="apiValidationErrors.last_name" />
            </div>
          </div>
          <div class="mb-4">
            <base-input
              v-model="form.data.attributes.email"
              alternative
              class="mb-3"
              placeholder="email"
              name="email"
              label="Email"
              type="email"
            ></base-input>
            <validation-error :errors="apiValidationErrors.email" />
          </div>
          <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
              <base-input
                v-model="form.data.attributes.password"
                alternative
                class="mb-3"
                placeholder="******************"
                name="password"
                type="password"
                label="Password"
              ></base-input>
              <validation-error :errors="apiValidationErrors.password" />
            </div>
            <div class="md:ml-2">
              <base-input
                v-model="form.data.attributes.password_confirmation"
                alternative
                class="mb-3"
                placeholder="******************"
                name="password_confirmation"
                type="password"
                label="Confirm password"
              ></base-input>
              <validation-error
                :errors="apiValidationErrors.password_confirmation"
              />
            </div>
          </div>
          <div class="mb-6 text-center">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              @click="register"
            >
              Register Account
            </button>
          </div>
          <hr class="mb-6 border-t" />
          <div class="text-center">
            <nuxt-link
              to="/password/reset"
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            >
              Forgot password?
            </nuxt-link>
          </div>
          <div class="text-center">
            <nuxt-link
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              to="login"
            >
              Already have an account? Login!
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationError from '~/components/ValidationError.vue'
import FacebookButton from '~/components/buttons/FacebookButton.vue'
import GoogleButton from '~/components/buttons/GoogleButton.vue'
import TwitterButton from '~/components/buttons/TwitterButton.vue'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import formMixin from '@/mixins/form-mixin'
export default {
  auth: false,
  components: {
    BaseInput,
    GoogleButton,
    FacebookButton,
    TwitterButton,
    ValidationError,
  },
  mixins: [formMixin],
  layout: 'AuthLayout',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect('/dashboard')
    }
  },
  data() {
    return {
      form: {
        data: {
          type: 'token',
          attributes: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            agree: false,
            scors: '',
          },
        },
      },
    }
  },
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.apiUrl}/auth/login/${service}`
    },
    async register() {
      // this.$store.dispatch('register/create', this.form.data.attributes)
      try {
        await this.$axios.post('auth/register', this.form.data.attributes)
        await this.$auth.loginWith('local', {
          data: {
            password: this.form.data.attributes.password,
            email: this.form.data.attributes.email,
          },
        })
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e.response.data.message
        // handle error
        this.$notify({
          type: 'danger',
          message: 'An error has occurred!',
        })
        this.setApiValidation(e.response.data.errors)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
