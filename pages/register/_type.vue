<template>
  <div>
    <form class="pt-6 pb-8 mb-4 bg-white rounded">
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
      <div v-if="$route.params.type === 'expert'" class="mb-4">
        <base-select
          v-model="form.data.attributes.levelOfEducation"
          label="What is your highest level of education?"
          :options="educationLevels"
        ></base-select>
        <validation-error :errors="apiValidationErrors.levelOfEducation" />
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
          class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
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
          class="inline-block text-sm text-green-500 align-baseline hover:text-green-800"
        >
          Forgot password?
        </nuxt-link>
      </div>
      <div class="text-center">
        <nuxt-link
          class="inline-block text-sm text-green-500 align-baseline hover:text-green-800"
          to="login"
        >
          Already have an account? Login!
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import ValidationError from '~/components/ValidationError.vue'
import FacebookButton from '~/components/buttons/FacebookButton.vue'
import GoogleButton from '~/components/buttons/GoogleButton.vue'
import TwitterButton from '~/components/buttons/TwitterButton.vue'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import formMixin from '@/mixins/form-mixin'
import RegisterAs from '~/components/registration/RegisterAs.vue'
import BaseSelect from '~/components/core-components/Inputs/BaseSelect.vue'
export default {
  components: {
    BaseInput,
    GoogleButton,
    FacebookButton,
    TwitterButton,
    ValidationError,
    RegisterAs,
    BaseSelect,
  },
  mixins: [formMixin],
  layout: 'AuthLayout',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.$auth.loggedIn) {
      return redirect('/dashboard')
    }
  },
  validate({ params }) {
    if (params.type !== 'student' && params.type !== 'expert') {
      return false
    }
    return true
  },
  auth: false,
  data() {
    return {
      userType: 'student',
      educationLevels: ['University', 'College'],
      form: {
        data: {
          type: 'token',
          attributes: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            levelOfEducation: '',
            role: this.$route.params.type,
          },
        },
      },
    }
  },
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.apiBaseUrl}/auth/login/${service}`
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
        this.setApiValidation(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
