<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-6 order-xl-2">
        <user-card />
      </div>
    </div>
  </div>
</template>
<script>
import UserEditCard from '~/components/Dashboard/Cards/UserEditCard.vue'
import UserPasswordCard from '~/components/Dashboard/Cards/UserPasswordCard.vue'
import UserCard from '~/components/pages/UserProfile/UserCard.vue'
export default {
  components: {
    UserEditCard,
    UserPasswordCard,
    UserCard,
  },
  layout: 'DashboardLayout',

  data() {
    return {
      user: {
        type: 'profile',
        name: null,
        email: null,
        profile_image: null,
      },
    }
  },
  created() {
    this.getProfile()
  },

  methods: {
    async getProfile() {
      await this.$store.dispatch('profile/me')
      this.user = await { ...this.$store.getters['profile/me'] }
    },
  },
}
</script>
