<template>
  <div>
    <!-- Header -->
    <div class="header">
      <div class="container"></div>
    </div>
    <base-banner v-if="GUEST_QUESTION">
      <template #message> Login or signup before proceeding </template>
      <template #learn-more>
        <p></p>
      </template>
    </base-banner>
    <!-- Page content -->
    <div class="container p-10">
      <div
        class="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl"
      >
        <div class="flex bg-white dark:bg-gray-600">
          <!-- prettier-ignore -->
          <div
          class="
            w-full
            h-auto
            hidden
            lg:block lg:w-5/12
            bg-cover
            rounded-l-lg
          "
          :style="{
            backgroundImage: 'url(' + require('@/assets/login.svg') + ')',
          }"
        ></div>
          <!-- <img src="~assets/login.svg" class="inline" /> -->

          <!-- prettier-ignore-end -->

          <div
            class="w-full lg:w-7/12 p-5 m-5 shadow-md rounded-lg lg:rounded-l-none"
          >
            <h2
              class="text-2xl font-semibold text-center text-gray-700 dark:text-white"
            >
              Wegglab
            </h2>

            <p class="text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome back!
            </p>

            <div>
              <google-button @click="socialLogin('google')"></google-button>
              <facebook-button
                @click="socialLogin('facebook')"
              ></facebook-button>
              <twitter-button @click="socialLogin('twitter')"></twitter-button>
            </div>

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
              <a
                href="#"
                class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >or login with email</a
              >
              <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <div class="mt-4">
              <base-input
                id="LoggingEmailAddress"
                v-model="form.data.attributes.email"
                alternative
                name="Email"
                prepend-icon="fa fa-envelope"
                placeholder="Email"
                type="email"
                label="Email Address"
                @keyup.enter="setPasswordFocus()"
              >
                <template #slotData> </template>
              </base-input>
              <validation-error :errors="apiValidationErrors.email" />
            </div>

            <div class="mt-4">
              <div class="flex justify-between">
                <NuxtLink
                  to="/password/reset"
                  class="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >Forgot Password?</NuxtLink
                >
              </div>
              <base-input
                id="loggingPassword"
                ref="password"
                v-model="form.data.attributes.password"
                alternative
                name="Password"
                prepend-icon="fa fa-lock"
                placeholder="Password"
                type="password"
                label="Password"
                @keyup.enter="handleSubmit()"
              >
                <template #slotData> </template>
              </base-input>
              <validation-error :errors="apiValidationErrors.password" />
              <validation-error :errors="apiValidationErrors.error" />
            </div>

            <div class="mt-8">
              <button
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                @click="handleSubmit()"
              >
                Login
              </button>
            </div>
            <div class="text-center">
              <p
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              >
                Don't have an account?
              </p>
            </div>
            <div class="flex items-center justify-between mt-4">
              <span class="w-2/5 border-b border-gray-600 md:w-1/4"></span>
              <nuxt-link
                to="register"
                class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >Sign up</nuxt-link
              >
              <span class="w-2/5 border-b border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ValidationError from '~/components/ValidationError.vue'
import AuthLayout from '~/layouts/AuthLayout.vue'
import formMixin from '@/mixins/form-mixin'
import GoogleButton from '~/components/buttons/GoogleButton.vue'
import FacebookButton from '~/components/buttons/FacebookButton.vue'
import TwitterButton from '~/components/buttons/TwitterButton.vue'
import Notification from '~/components/core-components/NotificationPlugin/Notification.vue'
import BaseBanner from '~/components/core-components/BaseBanner.vue'
export default {
  components: {
    ValidationError,
    AuthLayout,
    GoogleButton,
    FacebookButton,
    TwitterButton,
    Notification,
    BaseBanner,
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
            email: '',
            password: '',
          },
        },
      },
    }
  },
  computed: {
    GUEST_QUESTION() {
      return this.$store.getters['questions/GET_GUEST_QUESTION']
    },
  },
  mounted() {
    // use route object
    // directly use params
    const origin = this.$route.query.origin
    const token = this.$route.query.token
    if (origin === 'login' && token) {
      this.$auth
        .setUserToken(token, '')
        .then(() => this.$toast.success('User set!'))
    }
  },
  methods: {
    setPasswordFocus() {
      this.$refs.password.$el.focus()
    },
    loginWithFacebook() {
      this.$auth.loginWith('facebook')
    },
    socialLogin(service) {
      this.$auth
        .loginWith(`${service}`)
        .then((res) => {})
        .catch((err) => {
          alert(JSON.stringify(err.message))
        })
      // window.location.href = `${process.env.apiBaseUrl}/auth/login/${service}`
    },
    handleSubmit() {
      this.$auth
        .loginWith('local', {
          data: this.form.data.attributes,
        })
        .then((response) => {
          console.log('setTimeout')
          this.$notify({
            type: 'success',
            title: "You're in",
            text: 'Login successful.',
          })
          setTimeout(() => {
            if (this.GUEST_QUESTION) {
              this.$router.push('/questions/ask')
            } else {
              this.$router.push(this.$route.query.redirect || '/dashboard')
            }
          }, 2000)
        })
        .catch((error) => {
          // handle error
          this.$notify({
            type: 'error',
            title: 'An error occurred',
            text: 'Invalid credentials!',
          })
          this.setApiValidation(error)
        })
        .then(function () {
          // always executed
        })
      // try {
      //   const response = await
      //   this.$axios.defaults.headers.common.Authorization = `${this.$auth.getToken(
      //     'local'
      //   )}`
      //   console.log(`${this.$auth.getToken('local')}`)
      //   console.log('User is', `${this.$auth.user}`)
      //   this.$router.push('/dashboard')
      // } catch (error) {
      //   await this.$notify({
      //     type: 'danger',
      //     message: 'Invalid credentials!',
      //   })
      //   // this.setApiValidation(error.response.data.errors)
      // }
    },
    mounted() {},
  },
}
</script>
