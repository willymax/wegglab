<template>
  <!-- Sidebar links -->
  <nav
    aria-label="Sidebar"
    class="flex-1 px-2 py-6 space-y-2 overflow-y-hidden hover:overflow-y-auto text-base-content"
  >
    <div>
      <template v-if="$auth.loggedIn">
        <side-bar-menu-link v-if="$auth.user.role === 'admin'">
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
        <side-bar-menu-link v-if="$auth.user.role === 'admin'">
          <template #link-icon>
            <img class="w-5 h-5" src="~assets/wallet.svg" />
          </template>
          Orders
          <template #menus>
            <menu-item to="/orders">Orders</menu-item>
            <menu-item to="/products">List Products</menu-item>
            <menu-item to="/plans/create">Create Plan</menu-item>
            <menu-item to="/products/create">Create Product</menu-item>
            <menu-item to="/subscriptions/plans">Subscribe</menu-item>
            <menu-item to="/subscriptions">Subscriptions</menu-item>
          </template>
        </side-bar-menu-link>
        <side-bar-menu-link v-if="$auth.user.role === 'admin'">
          <template #link-icon>
            <img class="w-5 h-5" src="~assets/users.svg" />
          </template>
          Users
          <template #menus>
            <menu-item to="/users">Users (All for now)</menu-item>
            <menu-item to="/users?type=expert">Experts</menu-item>
            <menu-item to="/users?type=student">Students</menu-item>
          </template>
        </side-bar-menu-link>
      </template>
      <menu-item to="/">
        <template #link-icon>
          <img class="w-5 h-5 fill-color inline" src="~assets/wallet.svg" />
        </template>
        Questions</menu-item
      >
      <side-bar-menu-link :menu-disabled="true" :is-open="true">
        <template #link-icon>
          <img class="w-5 h-5 inline" src="~assets/book.svg" />
        </template>
        Subjects
        <template #menus>
          <menu-item
            v-for="subject in subjects"
            :key="subject._id"
            :to="`/questions/tagged/${subject.name}`"
          >
            {{ subject.name }}</menu-item
          >
          <menu-item v-if="$auth.loggedIn" to="/subjects"
            >Manage Subjects</menu-item
          >
        </template>
      </side-bar-menu-link>
    </div>
    <!-- Test Sidebar Menu links -->
    <slot></slot>
  </nav>
</template>

<script>
import MenuItem from './MenuItem.vue'
import SideBarMenuLink from './SideBarMenuLink.vue'
import QuestionMark from '@/assets/question-mark.svg?inline'
export default {
  components: { MenuItem, SideBarMenuLink, QuestionMark },
  data() {
    return {
      isActive: false,
      open: false,
      subjects: [],
    }
  },
  mounted() {
    this.getSubjects()
  },
  methods: {
    getSubjects() {
      this.$axios
        .get('/subjects')
        .then((response) => {
          this.subjects = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
