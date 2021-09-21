<template>
  <div class="h-screen">
    <notifications></notifications>
    <base-nav></base-nav>
    <div class="main-content h-screen">
      <div class="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <main role="main" class="flex flex-col drawer-content">
          <div class="flex">
            <section class="w-full md:w-4/5 border border-y-0 border-gray-800">
              <label
                for="my-drawer-2"
                class="mb-4 btn btn-primary drawer-button lg:hidden"
                >open menu</label
              >
              <nuxt></nuxt>
            </section>
            <aside class="md:w-1/5 h-12 position-relative hidden md:block">
              <p>Hello sidebar</p>
            </aside>
          </div>
        </main>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <side-bar
            class="p-4 overflow-y-auto w-80 bg-base-100 text-base-content"
          >
            <template slot="links" slot-scope="props">
              <sidebar-item
                :link="{
                  name: 'Dashboard',
                  icon: 'ni ni-shop text-primary',
                  path: '/dashboard',
                }"
              >
              </sidebar-item>

              <sidebar-item
                opened
                :link="{
                  name: 'Examples (API)',
                  icon: 'fab fa-vuejs',
                }"
              >
                <sidebar-item
                  opened
                  :link="{
                    name: 'User Profile',
                    path: '/examples/user-profile',
                  }"
                />
                <!-- <sidebar-item
                opened
                :link="{
                  name: 'User Management',
                  path: '/examples/user-management',
                }"
              /> -->
              </sidebar-item>
              <sidebar-item
                :link="{
                  name: 'Icons',
                  path: '/components/icons',
                  icon: 'ni ni-planet',
                }"
              />
              <sidebar-item
                :link="{
                  name: 'Tables',
                  icon: 'ni ni-align-left-2 text-default',
                  path: '/tables/regular',
                }"
              >
              </sidebar-item>

              <sidebar-item
                :link="{
                  name: 'Google',
                  icon: 'ni ni-pin-3',
                  path: '/maps/google',
                }"
              >
              </sidebar-item>
            </template>
          </side-bar>
        </div>
      </div>
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
