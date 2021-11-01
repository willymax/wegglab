<template>
  <div></div>
</template>

<script>
export default {
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
}
</script>

<style lang="scss" scoped></style>
