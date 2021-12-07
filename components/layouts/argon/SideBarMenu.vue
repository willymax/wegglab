<template>
  <!-- Sidebar links -->
  <nav
    aria-label="Main"
    class="
      flex-1
      px-2
      py-4
      space-y-2
      overflow-y-hidden
      hover:overflow-y-auto
      w-80
      text-base-content
    "
  >
    <!-- Test Sidebar Menu links -->
    <slot></slot>
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
