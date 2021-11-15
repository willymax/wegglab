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
      bg-base-100
      text-base-content
    "
  >
    <!-- Test Sidebar Menu links -->
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
        <menu-item to="/subscriptions/create">Subscribe</menu-item>
        <menu-item to="/subscriptions">Subscriptions</menu-item>
      </template>
    </side-bar-menu-link>
    <menu-item to="/subscriptions">Subscriptions</menu-item>
    <menu-item to="/questions">Questions</menu-item>
    <side-bar-menu-link :has-sub-menus="false">
      <template #link-icon>
        <img class="w-5 h-5" src="~assets/wallet.svg" />
      </template>
      Items
      <template #menus> </template>
    </side-bar-menu-link>
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
