<template>
  <!-- active & hover classes 'text-gray-700 dark:text-light' -->
  <!-- inActive classes 'text-gray-400 dark:text-gray-400' -->
  <nuxt-link
    :to="to"
    role="menuitem"
    class="
      block
      p-2
      text-sm text-gray-400
      transition-colors
      duration-200
      rounded-md
      dark:text-gray-400 dark:hover:text-light
      hover:text-gray-700
    "
  >
    <slot>Link</slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style lang="scss" scoped></style>
