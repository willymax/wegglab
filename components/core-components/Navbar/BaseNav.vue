<template>
  <header class="text-gray-600 body-font">
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
                class="
                  text-2xl
                  font-bold
                  text-gray-800
                  dark:text-white
                  lg:text-3xl
                  hover:text-gray-700
                  dark:hover:text-gray-300
                "
                href="#"
                >Brand</a
              >
            </div>

            <!-- Mobile menu button -->
            <div
              class="flex md:hidden"
              @click="showMobileMenu = !showMobileMenu"
            >
              <button
                type="button"
                class="
                  text-gray-500
                  dark:text-gray-200
                  hover:text-gray-600
                  dark:hover:text-gray-400
                  focus:outline-none focus:text-gray-600
                  dark:focus:text-gray-400
                "
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
          </div>

          <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
          <div class="flex-1 md:flex md:items-center md:justify-between">
            <div
              class="-mx-4 md:flex-row md:items-center md:mx-8 hidden md:flex"
            >
              <Nuxt-Link
                v-for="item in menuItems"
                :key="item.key"
                :to="item.to"
                class="
                  px-2
                  py-1
                  mx-2
                  mt-2
                  text-sm
                  font-medium
                  text-gray-700
                  transition-colors
                  duration-200
                  transform
                  rounded-md
                  md:mt-0
                  dark:text-gray-200
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                "
                >{{ item.label }}</Nuxt-Link
              >
            </div>
            <div
              v-if="showMobileMenu"
              class="
                flex flex-col
                -mx-4
                md:flex-row md:items-center md:mx-8 md:hidden
              "
            >
              <Nuxt-Link
                v-for="item in menuItems"
                :key="item.key"
                :to="item.to"
                class="
                  px-2
                  py-1
                  mx-2
                  mt-2
                  text-sm
                  font-medium
                  text-gray-700
                  transition-colors
                  duration-200
                  transform
                  rounded-md
                  md:mt-0
                  dark:text-gray-200
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                "
                >{{ item.label }}</Nuxt-Link
              >
            </div>

            <div class="flex mt-4 md:mt-0 relative justify-between">
              <base-nuxt-button-link to="/questions/ask"
                >Post A Question</base-nuxt-button-link
              >
              <button
                class="
                  hidden
                  mx-4
                  text-gray-600
                  md:block
                  dark:text-gray-200
                  hover:text-gray-700
                  dark:hover:text-gray-400
                  focus:text-gray-700
                  dark:focus:text-gray-400
                  focus:outline-none
                "
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
    </nav>
  </header>
  <!-- <nav :class="classes" class="navbar">
    <div :class="containerClasses">
      <slot name="brand"></slot>
      <slot name="toggle-button">
        <button
          v-if="hasMenu"
          class="navbar-toggler collapsed"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
      </slot>

      <button class="navbar-toggler" @click.stop="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        v-show="show"
        v-click-outside="closeMenu"
        class="navbar-collapse navbar-custom-collapse collapse show"
        :class="menuClasses"
      >
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav> -->
</template>
<script>
import BaseButton from '../BaseButton.vue'
import BaseNuxtButtonLink from '../BaseNuxtButtonLink.vue'
import UserWithMenu from '~/components/widgets/UserWithMenu.vue'
export default {
  name: 'BaseNav',
  components: { BaseButton, BaseNuxtButtonLink, UserWithMenu },
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
  watch: {},
  methods: {
    toggleMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMenu() {
      this.$emit('change', false)
    },
  },
}
</script>
<style></style>
