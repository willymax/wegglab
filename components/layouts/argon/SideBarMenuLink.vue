<template>
  <div>
    <!-- active & hover classes 'bg-green-100 dark:bg-green-600' -->
    <a
      v-if="hasSubMenus"
      to="#"
      class="flex items-center p-2 text-color-secondary transition-colors rounded-md dark:text-light hover:bg-green-100 dark:hover:bg-gray-500"
      :class="{
        'bg-green-100 dark:bg-gray-500': isActive || open,
        'pointer-events-none': menuDisabled,
      }"
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
          class="w-4 h-4 transition-transform transform fill-gray-800 dark:fill-gray-50"
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
    menuDisabled: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      open: false,
    }
  },
  watch: {
    isOpen(newValue, oldValue) {
      this.open = newValue
    },
  },
  mounted() {
    this.open = this.isOpen
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
