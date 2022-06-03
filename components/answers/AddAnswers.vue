<template>
  <div class="text-center ma-5">
    <button
      class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      @click="handleClick"
    >
      <slot></slot>
    </button>
    <app-modal :show.sync="show">
      <PostAnswerWarning></PostAnswerWarning>
      <template #footer>
        <base-button width="md:w-64 w-full" @click="showPostAnswerForm()"
          >Continue</base-button
        >
      </template>
    </app-modal>
  </div>
</template>
<script>
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Card from '../core-components/Cards/Card.vue'
import PostAnswerWarning from '../questions/PostAnswerWarning.vue'
export default {
  components: {
    Card,
    BaseNuxtButtonLink,
    PostAnswerWarning,
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    addingAnswer() {
      return this.$store.getters['answers/addingAnswer']
    },
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  methods: {
    handleClick(evt) {
      this.show = true
    },
    async showPostAnswerForm() {
      const response = await this.$axios.post(
        `/questions/assignQuestion/?questionId=${this.question._id}`
      )
      await this.$store.dispatch('questions/SET_CURRENT_QUESTION', {
        ...this.question,
        ...response.data,
      })

      if (!this.$auth.loggedIn) {
        // If not authenticated, add a path where to redirect after login.
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.path },
        })
      }
      this.show = !this.show
      // this.$store.dispatch('answers/updateAddingAnswer', !this.addingAnswer)
    },
  },
}
</script>

<style lang="scss" scoped></style>
