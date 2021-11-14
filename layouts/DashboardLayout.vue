<template>
  <div class="h-screen">
    <notifications></notifications>
    <base-nav></base-nav>
    <div class="main-content h-screen">
      <div class="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <main role="main" class="flex flex-col drawer-content">
          <nuxt keep-alive></nuxt>
        </main>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <side-bar-menu></side-bar-menu>
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
