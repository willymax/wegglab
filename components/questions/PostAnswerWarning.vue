<template>
  <div>
    <h1>By continuing you confirm that you can answer the question the best</h1>
    <h1 class="font-semibold">Deadline: 2hrs</h1>
  </div>
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
