<template>
  <header class="flex justify-between items-center p-6 flex-wrap bg-surface">
    <div class="flex items-center space-x-4 lg:space-x-0">
      <button
        class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden"
        @click="$emit('update:sidebarOpen', true)"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="h-15 w-52 self-center mr-2">
        <a href="/">
          <img class="h-15 w-52 self-center" src="~/assets/img/wegglab.png"
        /></a>
      </div>
    </div>
    <!-- w-full block flex-grow lg:flex lg:items-center lg:w-auto -->
    <div class="flex items-center space-x-4">
      <base-nuxt-button-link to="/questions/ask"
        >Post A Question</base-nuxt-button-link
      >
      <button
        class="flex text-gray-600 dark:text-gray-300 focus:outline-none"
        aria-label="Color Mode"
        @click="changeDarkMode()"
      >
        <svg
          v-show="darkMode"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-show="!darkMode"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </button>
      <button class="flex text-gray-600 dark:text-gray-300 focus:outline-none">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button class="flex text-gray-600 dark:text-gray-300 focus:outline-none">
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <user-with-menu></user-with-menu>
    </div>
  </header>
  <!-- <header class="text-gray-600 body-font">
    <nav class="bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-4 mx-auto">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex items-center justify-between">
            <div class="text-xl font-semibold text-gray-700">
              <label
                for="my-drawer-2"
                class="mb-4 btn btn-primary drawer-button lg:hidden"
                ><span><i class="fas fa-bars"></i></span
              ></label>
              <a
                class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="/"
                >Wegglab</a
              >
            </div>

            Mobile menu button
       <div
              class="flex md:hidden"
              @click="showMobileMenu = !showMobileMenu"
            >
              <button
                type="button"
                class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div> -->

  <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
  <!-- <div class="flex-1 md:flex md:items-center md:justify-between">
            <div
              class="-mx-4 md:flex-row md:items-center md:mx-8 hidden md:flex"
            >
              <Nuxt-Link
                v-for="item in menuItems"
                :key="item.key"
                :to="item.to"
                class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                >{{ item.label }}</Nuxt-Link
              >
            </div>
            <div
              v-if="showMobileMenu"
              class="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8 md:hidden"
            >
              <Nuxt-Link
                v-for="item in menuItems"
                :key="item.key"
                :to="item.to"
                class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                >{{ item.label }}</Nuxt-Link
              >
            </div>

            <div class="flex mt-4 md:mt-0 relative justify-between">
              <base-nuxt-button-link to="/questions/ask"
                >Post A Question</base-nuxt-button-link
              >
              <button
                class="hidden mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                aria-label="show notifications"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <user-with-menu color="blue"></user-with-menu>
            </div>
          </div>
        </div>
      </div>
    </nav> -->
  <!-- </header> -->
</template>
<script>
import BaseButton from '../core-components/BaseButton.vue'
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import UserWithMenu from '~/components/widgets/UserWithMenu.vue'
import SideBarMenu from '~/components/layouts/argon/SideBarMenu.vue'

export default {
  name: 'BaseHeader',
  components: { BaseButton, BaseNuxtButtonLink, UserWithMenu, SideBarMenu },
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      description:
        'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)',
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent',
    },
    sidebarOpen: {
      type: Boolean,
      default: false,
      description: 'Whether open or not',
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand',
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description:
        'Navbar menu (items) classes. Can be used to align menu items to the right/left',
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description:
        'Container classes. Can be used to control container classes (contains both navbar brand and menu items)',
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'dark',
          'success',
          'danger',
          'warning',
          'white',
          'primary',
          'light',
          'info',
          'vue',
        ].includes(value)
      },
      description: 'Navbar color type',
    },
  },
  data() {
    return {
      notificationOpen: false,
      dropdownOpen: false,
      darkMode: this.$colorMode.preference === 'dark',
      showLogoutDialog: false,
      currentYear: new Date().getFullYear(),
      showMobileMenu: false,
      menuItems: [
        {
          label: 'Home',
          to: '/',
          key: 1,
        },
        {
          label: 'About Us',
          to: 'about-us',
          key: 2,
        },
        {
          label: 'Contact Us',
          to: 'contact-us',
          key: 3,
        },
      ],
    }
  },
  computed: {
    classes() {
      const color = `bg-${this.type}`
      const classes = [
        { 'navbar-transparent': this.transparent },
        { [`navbar-expand-${this.expand}`]: this.expand },
      ]
      if (this.position) {
        classes.push(`navbar-${this.position}`)
      }
      if (!this.transparent) {
        classes.push(color)
      }
      return classes
    },
    hasMenu() {
      return this.$slots.default
    },
  },
  methods: {
    toggleMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMenu() {
      this.$emit('change', false)
    },
    closeDropDown(event) {
      this.dropdownOpen = false
    },
    changeDarkMode() {
      //
      if (this.$colorMode.preference === 'white') {
        this.$colorMode.preference = 'dark'
      } else {
        this.$colorMode.preference = 'white'
      }
      this.darkMode = this.$colorMode.preference === 'dark'
    },
  },
}
</script>
<style></style>
