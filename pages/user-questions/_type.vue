<template>
  <questions v-bind="currentProperties"></questions>
</template>

<script>
import Questions from '~/components/questions/Questions.vue'
export default {
  components: { Questions },
  computed: {
    currentProperties() {
      if (this.$route.params.type === '1') {
        return { userId: this.$auth.user.id }
      }
      if (this.$route.params.type === '2') {
        return { bookmarked: true }
      }
      if (this.$route.params.type === '3') {
        return { answered: true }
      }
      return {}
    },
  },
  mounted() {
    console.log('params', this.$route.params)
  },
}
</script>

<style lang="scss" scoped></style>
