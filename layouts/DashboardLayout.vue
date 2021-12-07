<template>
  <div class="h-screen">
    <notifications></notifications>
    <base-nav></base-nav>
    <div class="main-content h-screen">
      <div class="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <main role="main" class="flex flex-col drawer-content">
          <!-- keep-alive -->
          <nuxt></nuxt>
        </main>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <side-bar-menu class="z-0">
            <side-bar-menu-link>
              <template #link-icon>
                <img class="w-5 h-5" src="~assets/wallet.svg" />
              </template>
              Subscriptions
              <template #menus>
                <menu-item to="/plans">List Plans</menu-item>
                <menu-item to="/products">List Products</menu-item>
                <menu-item to="/plans/create">Create Plan</menu-item>
                <menu-item to="/products/create">Create Product</menu-item>
                <menu-item to="/subscription/plans">Subscribe</menu-item>
                <menu-item to="/subscriptions">Subscriptions</menu-item>
              </template>
            </side-bar-menu-link>
            <menu-item to="/subscriptions">Subscriptions</menu-item>
            <menu-item to="/questions">Questions</menu-item>
            <side-bar-menu-link>
              <template #link-icon>
                <img class="w-5 h-5" src="~assets/img/user.png" />
              </template>
              Users
              <template #menus>
                <menu-item to="/users">Admins</menu-item>
                <menu-item to="/experts">Experts</menu-item>
                <menu-item to="/students">Students</menu-item>
              </template>
            </side-bar-menu-link>
            <nuxt-link to="/">Hello 2</nuxt-link>
          </side-bar-menu>
          <nuxt-link to="/">Hello</nuxt-link>
        </div>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import Vuex from 'vuex'
import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue'
import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'
import DashboardContent from '~/components/layouts/argon/Content.vue'
import Logout from '~/components/widgets/Logout.vue'
import SideBarMenu from '~/components/layouts/argon/SideBarMenu.vue'
import MenuItem from '~/components/layouts/argon/MenuItem.vue'
import SideBarMenuLink from '~/components/layouts/argon/SideBarMenuLink.vue'
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    Logout,
    SideBarMenu,
    MenuItem,
    SideBarMenuLink,
  },
  mounted() {
    this.initScrollbar(), this.$store.dispatch('profile/me')
  },
  methods: {
    initScrollbar() {
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        initScrollbar('scrollbar-inner')
      }
    },
  },
}
</script>
<style></style>
