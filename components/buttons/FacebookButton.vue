<template>
  <button
    class="
      flex
      items-center
      justify-center
      mt-4
      text-gray-600
      rounded-lg
      shadow-md
      w-full
      dark:bg-gray-700 dark:text-gray-200
      hover:bg-gray-100
      dark:hover:bg-gray-600
    "
    @click="handleClick"
  >
    <div class="px-4 py-3">
      <img
        class="w-6 h-6"
        src="https://img.icons8.com/color/48/000000/facebook-new.png"
      />
    </div>

    <span class="w-5/6 px-4 py-3 font-bold text-center"
      >Sign in with Facebook</span
    >
  </button>
</template>

<script>
export default {
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
