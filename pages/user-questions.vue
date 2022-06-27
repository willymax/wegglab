<template>
  <div
    class="min-h-screen md:flex flex-row flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 w-full mx-auto"
  >
    <div
      class="md:flex flex-col top-0 left-0 md:w-3/12 w-full bg-white h-full border-r hidden"
    >
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li>
            <Nuxt-Link
              to="/user-questions/1"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate"
                >Posted By Me</span
              >
            </Nuxt-Link>
          </li>
          <li>
            <Nuxt-Link
              to="/user-questions/4"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate"
                >Unlocked Questions</span
              >
            </Nuxt-Link>
          </li>
          <li>
            <Nuxt-Link
              to="/user-questions/2"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M19 18l2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate"
                >Bookmarked</span
              >
              <span
                class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full"
                >Bookmarked</span
              >
            </Nuxt-Link>
          </li>
          <li>
            <Nuxt-Link
              to="/user-questions/3"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate"
                >Assigned To Me</span
              >
            </Nuxt-Link>
          </li>
          <li>
            <Nuxt-Link
              to="/user-questions/5"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate"
                >Notifications</span
              >
              <span
                class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full"
                >1.2k</span
              >
            </Nuxt-Link>
          </li>
        </ul>
      </div>
    </div>
    <div class="group block md:hidden w-full p-4">
      <button
        class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32 w-full"
      >
        <span class="pr-1 font-semibold flex-1">Select</span>
        <span>
          <svg
            class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32"
        style="z-index: 100"
      >
        <li class="rounded-sm px-3 py-1 hover:bg-gray-100">
          <Nuxt-Link to="/user-questions/1">My Questions</Nuxt-Link>
        </li>
        <li class="rounded-sm px-3 py-1 hover:bg-gray-100">
          <Nuxt-Link to="/user-questions/2">Watching</Nuxt-Link>
        </li>
        <li class="rounded-sm px-3 py-1 hover:bg-gray-100">
          <Nuxt-Link to="/user-questions/3">My Answers</Nuxt-Link>
        </li>
      </ul>
    </div>
    <div class="md:w-9/12 w-full">
      <NuxtChild />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue'
import ContentFooter from '~/components/layouts/argon/ContentFooter.vue'
import DashboardContent from '~/components/layouts/argon/Content.vue'
import Logout from '~/components/widgets/Logout.vue'
import SideBarMenu from '~/components/layouts/argon/SideBarMenu.vue'
import MenuItem from '~/components/layouts/argon/MenuItem.vue'
import ProfileNavBar from '~/components/settings/ProfileNavBar.vue'
//
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
    ProfileNavBar,
  },
  layout: 'ResponsiveDashboardWithoutSideBar',
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
<style scoped>
/* since nested groupes are not supported we have to use
     regular css for the nested dropdowns
  */
li > ul {
  transform: translatex(100%) scale(0);
}
li:hover > ul {
  transform: translatex(101%) scale(1);
}
li > button svg {
  transform: rotate(-90deg);
}
li:hover > button svg {
  transform: rotate(-270deg);
}

/* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
.group:hover .group-hover\:scale-100 {
  transform: scale(1);
}
.group:hover .group-hover\:-rotate-180 {
  transform: rotate(180deg);
}
.scale-0 {
  transform: scale(0);
}
.min-w-32 {
  min-width: 8rem;
}
</style>
