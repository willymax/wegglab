<template>
  <div
    class="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out"
  >
    <svg
      :fill="bookmarked ? '#000000' : 'currentColor'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      class="cursor-pointer"
      @click="bookmark()"
    >
      <path
        d="M 6 2 C 5.861875 2 5.7278809 2.0143848 5.5976562 2.0410156 C 4.686084 2.2274316 4 3.033125 4 4 L 4 22 L 12 19 L 20 22 L 20 4 C 20 3.8625 19.985742 3.7275391 19.958984 3.5976562 C 19.799199 2.8163086 19.183691 2.2008008 18.402344 2.0410156 C 18.272119 2.0143848 18.138125 2 18 2 L 6 2 z"
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
        this.$auth.user.bookmarkedQuestions &&
        this.$auth.user.bookmarkedQuestions.includes(this.question._id)
      )
    },
  },
  methods: {
    bookmark() {
      this.$axios
        .post(`questions/bookmarkQuestion/626d8a5152f5bf28209109cf`)
        .then((response) => {
          this.$auth.setUser(
            Object.assign(
              { ...this.$auth.user },
              {
                bookmarkedQuestions: response.bookmarkedQuestions,
              }
            )
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
