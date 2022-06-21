<template>
  <div v-if="$auth.loggedIn">
    <div class="relative">
      <div class="flex flex-row justify-center items-center">
        <p>{{ $auth.user.role }}</p>
        <button
          ref="userButton"
          class="flex items-center space-x-2 relative focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <!-- <h2 class="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
          {{ $auth.user.first_name }} {{ $auth.user.last_name }}
        </h2> -->
          <base-avatar :user-avatar="$auth.user.avatar"></base-avatar>
        </button>
      </div>

      <div
        v-show="dropdownOpen"
        v-closable="{
          exclude: ['userButton'],
          handler: 'closeDropDown',
        }"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
        x-transition:enter="transition ease-out duration-100 transform"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75 transform"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
      >
        <nuxt-link
          v-for="option in options"
          :key="option._id"
          :to="option.url"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
          :class="'theme-' + color"
          >{{ option.name }}</nuxt-link
        >
        <a
          href="javascript:;"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
          @click="logout()"
          >Logout</a
        >
      </div>
    </div>
    <app-modal :show.sync="showLogoutDialog">
      <template #default>
        <p>You are about to logout</p>
        <div class="flex flex-row justify-center space-x-4 m-2">
          <button @click="showLogoutDialog = !showLogoutDialog">Close</button>
          <base-button width="md" :loading="loading" round @click="logout"
            >Continue</base-button
          >
        </div>
      </template>
    </app-modal>
  </div>
  <div v-else>
    <base-nuxt-button-link
      :to="{
        name: 'login',
        query: { redirect: $route.path },
      }"
      >Login</base-nuxt-button-link
    >
    <base-nuxt-button-link
      :to="{
        name: 'register',
        query: { redirect: $route.path },
      }"
      >Sign Up</base-nuxt-button-link
    >
  </div>
</template>

<script>
import BaseAvatar from '../core-components/BaseAvatar.vue'
import BaseButton from '../core-components/BaseButton.vue'
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Logout from './Logout.vue'
export default {
  components: { Logout, BaseAvatar, BaseButton, BaseNuxtButtonLink },
  props: {
    color: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      loading: false,
      showLogoutDialog: false,
      dropdownOpen: false,
      options: [
        { name: 'Account settings', url: '/profile/setting', id: 1 },
        { name: 'Questions', url: '/user-questions', id: 1 },
        { name: 'Orders', url: '/orders', id: 1 },
        { name: 'Payments', url: '/payments', id: 1 },
      ],
    }
  },
  methods: {
    hideMenu() {
      if (this.show) {
        // this.show = false
      }
    },
    closeDropDown(event) {
      this.dropdownOpen = false
    },
    async logout() {
      this.loading = true
      try {
        await this.$auth.logout()
        this.$notify({
          type: 'success',
          text: 'You have logged out successfully.',
        })
      } catch (error) {
        this.loading = false
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style>
button {
  cursor: pointer;
}
button:focus {
  outline: none;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide-in-up animation*/
.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.slide-in-up-enter,
.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Slide-in-right animation*/
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}
.slide-in-right-enter,
.slide-in-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Slide-in-left animation*/
.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}
.slide-in-left-enter,
.slide-in-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Scale animation*/
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
  transform: scale(1);
}
.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* Rotate animation*/
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s;
  transform: scale(1) rotate(-360deg);
}
.rotate-enter,
.rotate-leave-to {
  opacity: 0;
  transform: scale(0) rotate(360deg);
}
</style>
