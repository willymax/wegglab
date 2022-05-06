<template>
  <!-- Sidebar links -->
  <nav
    aria-label="Sidebar"
    class="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto text-base-content"
  >
    <div v-if="$auth.loggedIn">
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
          <menu-item to="/subscriptions/plans">Subscribe</menu-item>
          <menu-item to="/subscriptions">Subscriptions</menu-item>
        </template>
      </side-bar-menu-link>
      <menu-item to="/questions">
        <template #link-icon>
          <img class="w-5 h-5 inline" src="~assets/question-mark.svg" />
        </template>
        Questions</menu-item
      >
      <menu-item to="/subjects">
        <template #link-icon>
          <img class="w-5 h-5 inline" src="~assets/book.svg" />
        </template>
        Subjects</menu-item
      >
      <side-bar-menu-link>
        <template #link-icon>
          <img class="w-5 h-5" src="~assets/img/user.png" />
        </template>
        Users
        <template #menus>
          <menu-item to="/users">Users (All for now)</menu-item>
          <menu-item to="/experts">Experts</menu-item>
          <menu-item to="/students">Students</menu-item>
        </template>
      </side-bar-menu-link>
    </div>
    <div>
      <menu-item to="/subjects">
        <template #link-icon>
          <img class="w-5 h-5 inline" src="~assets/book.svg" />
        </template>
        Physics</menu-item
      >
      <menu-item to="/subjects">
        <template #link-icon>
          <img class="w-5 h-5 inline" src="~assets/book.svg" />
        </template>
        Chemistry</menu-item
      >
    </div>
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
