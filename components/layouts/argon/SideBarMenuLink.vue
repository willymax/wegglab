<template>
  <div>
    <!-- active & hover classes 'bg-indigo-100 dark:bg-indigo-600' -->
    <a
      v-if="hasSubMenus"
      to="#"
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
        <slot name="link-icon"></slot>
      </span>
      <span class="ml-2 text-sm">
        <slot></slot>
      </span>
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
      <slot name="menus"></slot>
    </div>
  </div>
</template>

<script>
import SidebarItem from '~/components/core-components/SidebarPlugin/SidebarItem.vue'
export default {
  components: { SidebarItem },
  props: {
    hasSubMenus: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: false,
      open: false,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
