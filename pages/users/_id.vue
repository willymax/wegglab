<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-6 order-xl-2">
        <user-profile></user-profile>
        <div>
          <div
            class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
          >
            <div class="d-flex justify-content-between">
              <NuxtLink to="/questions/ask" class="btn btn-sm btn-info mr-4"
                >Ask Your First Question</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserEditCard from '~/components/Dashboard/Cards/UserEditCard.vue'
import UserPasswordCard from '~/components/Dashboard/Cards/UserPasswordCard.vue'
import UserCard from '~/components/pages/UserProfile/UserCard.vue'
import UserProfile from '~/components/pages/UserProfile/UserProfile.vue'
import Question from '~/components/questions/Question.vue'
export default {
  components: {
    UserEditCard,
    UserPasswordCard,
    UserCard,
    Question,
    UserProfile,
  },
  layout: 'ResponsiveDashboard',

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
  async fetch() {
    const res = await this.$axios.get(`users/${this.$route.params._id}`)

    this.user = res.data.data
  },
  computed: {
    ...mapState('questions', {
      questions: (state) => state.questions,
    }),
  },
  created() {
    // this.getProfile()
  },

  methods: {
    async getProfile() {
      await this.$store.dispatch('profile/me')
      this.user = await { ...this.$store.getters['profile/me'] }
    },
  },
}
</script>
