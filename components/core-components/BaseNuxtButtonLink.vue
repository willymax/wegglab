<template>
  <NuxtLink
    :to="to"
    class="btn font-semibold btn-primary py-2 px-4 hover:border-transparent"
  >
    <slot></slot
  ></NuxtLink>
</template>

<script>
export default {
  name: 'BaseNuxtButtonLink',
  props: {
    to: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: 'Link',
    },
  },
}
</script>

<style lang="scss" scoped></style>
