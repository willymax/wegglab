<template>
  <div
    v-if="$auth.loggedIn"
    class="flex-1 flex text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out"
  >
    <svg
      v-if="!bookmarked"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      class="cursor-pointer"
      @click="bookmark()"
    >
      <path
        d="M13 37.45 24 32.8 35 37.45V8.75Q35 8.75 35 8.75Q35 8.75 35 8.75H13Q13 8.75 13 8.75Q13 8.75 13 8.75ZM10 42V8.75Q10 7.55 10.9 6.65Q11.8 5.75 13 5.75H35Q36.2 5.75 37.1 6.65Q38 7.55 38 8.75V42L24 36ZM35 8.75H24H13Q13 8.75 13 8.75Q13 8.75 13 8.75H35Q35 8.75 35 8.75Q35 8.75 35 8.75Z"
      />
    </svg>
    <svg
      v-if="bookmarked"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      fill="#22C55E"
      class="cursor-pointer"
      @click="bookmark()"
    >
      <path
        d="M35.8 17.75 30.5 12.45 32.6 10.3 35.8 13.5 43.2 6.05 45.35 8.2ZM10 42V8.75Q10 7.55 10.9 6.65Q11.8 5.75 13 5.75H27.5Q27.5 6.6 27.5 7.25Q27.5 7.9 27.5 8.75H13Q13 8.75 13 8.75Q13 8.75 13 8.75V37.45L24 32.8L35 37.45V20.75Q35.85 20.75 36.5 20.75Q37.15 20.75 38 20.75V42L24 36ZM13 8.75Q13 8.75 13 8.75Q13 8.75 13 8.75H27.5Q27.5 8.75 27.5 8.75Q27.5 8.75 27.5 8.75Q27.5 8.75 27.5 8.75Q27.5 8.75 27.5 8.75H24Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
    bookmarked() {
      return (
        this.$store.state.auth.user &&
        this.$store.state.auth.user.bookmarkedQuestions &&
        this.$store.state.auth.user.bookmarkedQuestions.includes(
          this.question._id
        )
      )
    },
    user() {
      return this.$auth.user || {}
    },
  },
  watch: {
    '$store.state.auth.user'(oldValue, newValue) {
      //
    },
  },
  methods: {
    bookmark() {
      if (this.bookmarked) {
        this.$axios
          .post(`/questions/unBookmarkQuestion/${this.question._id}`)
          .then((response) => {
            this.$auth.setUser(
              Object.assign(
                { ...this.$auth.user },
                {
                  bookmarkedQuestions: response.data.bookmarkedQuestions,
                }
              )
            )
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/questions/bookmarkQuestion/${this.question._id}`)
          .then((response) => {
            this.$auth.setUser(
              Object.assign(
                { ...this.$auth.user },
                {
                  bookmarkedQuestions: response.data.bookmarkedQuestions,
                }
              )
            )
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
