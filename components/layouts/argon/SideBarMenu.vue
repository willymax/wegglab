<template>
  <!-- Sidebar links -->
  <nav
    aria-label="Main"
    class="
      flex-1
      w-64
      px-2
      py-4
      space-y-2
      overflow-y-hidden
      hover:overflow-y-auto
    "
  >
    <!-- Dashboards links -->
    <div x-data="{ isActive: false, open: false}">
      <!-- active & hover classes 'bg-indigo-100 dark:bg-indigo-600' -->
      <a
        href="#"
        class="
          flex
          items-center
          p-2
          text-gray-500
          transition-colors
          rounded-md
          dark:text-light
          hover:bg-indigo-100
          dark:hover:bg-indigo-600
        "
        :class="{ 'bg-indigo-100 dark:bg-indigo-600': isActive || open }"
        role="button"
        aria-haspopup="true"
        :aria-expanded="open || isActive ? 'true' : 'false'"
        @click="
          $event.preventDefault()
          open = !open
        "
      >
        <span aria-hidden="true">
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
        <span class="ml-2 text-sm"> Dashboards </span>
        <span class="ml-auto" aria-hidden="true">
          <!-- active class 'rotate-180' -->
          <svg
            class="w-4 h-4 transition-transform transform"
            :class="{ 'rotate-180': open }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </a>
      <div
        v-if="open"
        role="menu"
        class="mt-2 space-y-2 px-7"
        aria-label="Dashboards"
      >
        <menu-item to="/home">Default</menu-item>
        <menu-item to="/home">Default2</menu-item>
      </div>
    </div>

    <!-- Test Sidebar Menu links -->
    <side-bar-menu-link>
      <template #link-icon>
        <img class="w-5 h-5" src="~assets/wallet.svg" />
      </template>
      Subscriptions
      <template #menus>
        <menu-item to="/plans">List Plans</menu-item>
        <menu-item to="/plans/create">Create Plan</menu-item>
      </template>
    </side-bar-menu-link>

    <!-- Components links -->
    <div x-data="{ isActive: false, open: false }">
      <!-- active classes 'bg-indigo-100 dark:bg-indigo-600' -->
      <a
        href="#"
        class="
          flex
          items-center
          p-2
          text-gray-500
          transition-colors
          rounded-md
          dark:text-light
          hover:bg-indigo-100
          dark:hover:bg-indigo-600
        "
        :class="{ 'bg-indigo-100 dark:bg-indigo-600': isActive || open }"
        role="button"
        aria-haspopup="true"
        :aria-expanded="open || isActive ? 'true' : 'false'"
        @click="
          $event.preventDefault()
          open = !open
        "
      >
        <span aria-hidden="true">
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </span>
        <span class="ml-2 text-sm"> Components </span>
        <span aria-hidden="true" class="ml-auto">
          <!-- active class 'rotate-180' -->
          <svg
            class="w-4 h-4 transition-transform transform"
            :class="{ 'rotate-180': open }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </a>
      <div
        x-show="open"
        class="mt-2 space-y-2 px-7"
        role="menu"
        arial-label="Components"
      >
        <!-- active & hover classes 'text-gray-700 dark:text-light' -->
        <!-- inActive classes 'text-gray-400 dark:text-gray-400' -->
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:text-gray-400 dark:hover:text-light
            hover:text-gray-700
          "
        >
          Alerts
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:text-gray-400 dark:hover:text-light
            hover:text-gray-700
          "
        >
          Buttons
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:hover:text-light
            hover:text-gray-700
          "
        >
          Cards
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:hover:text-light
            hover:text-gray-700
          "
        >
          Dropdowns
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:hover:text-light
            hover:text-gray-700
          "
        >
          Forms
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:hover:text-light
            hover:text-gray-700
          "
        >
          Lists
        </a>
        <a
          href="#"
          role="menuitem"
          class="
            block
            p-2
            text-sm text-gray-400
            transition-colors
            duration-200
            rounded-md
            dark:hover:text-light
            hover:text-gray-700
          "
        >
          Modals
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import MenuItem from './MenuItem.vue'
import SideBarMenuLink from './SideBarMenuLink.vue'
export default {
  components: { MenuItem, SideBarMenuLink },
  data() {
    return {
      isActive: false,
      open: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
