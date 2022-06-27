<template>
  <questions v-bind="currentProperties"></questions>
</template>

<script>
import Questions from '~/components/questions/Questions.vue'
export default {
  components: { Questions },
  computed: {
    currentProperties() {
      return { userId: this.$auth.user.id }
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
