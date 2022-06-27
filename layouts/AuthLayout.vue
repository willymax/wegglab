<template>
  <!-- <body class="antialiased h-screen"> -->
  <div class="main-container relative">
    <notifications></notifications>
    <div class="flex flex-col bg-background font-roboto">
      <base-header></base-header>
      <div class="main-content bg-gray-100 dark:bg-gray-800">
        <nuxt></nuxt>
      </div>
    </div>
  </div>
</template>
<script>
import BaseHeader from '~/components/header/BaseHeader.vue'

export default {
  components: {
    BaseHeader,
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      showMenu: true,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
    }
  },
  computed: {
    title() {
      return `${this.$route.name} Page`
    },
    layoutClass() {
      const exceptions = ['index', 'home']
      if (!exceptions.includes(this.$route.name)) {
        return 'bg-default'
      } else {
        return ''
      }
    },
  },
  watch: {
    '$route.path'() {
      if (this.showMenu) {
        this.closeMenu()
      }
    },
  },
  mounted() {},
  methods: {
    closeMenu() {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
    toggleMenu() {
      this.$el.querySelector('.mobile-menu').classList.toggle('hidden')
    },
  },
}
</script>
<style>
.auth-layout {
  min-height: 100vh;
}
</style>
