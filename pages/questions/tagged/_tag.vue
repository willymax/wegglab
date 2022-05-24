<template>
  <questions v-bind="currentProperties"></questions>
</template>

<script>
import Questions from '~/components/questions/Questions.vue'
export default {
  components: { Questions },
  auth: false,
  layout: 'ResponsiveDashboard',
  computed: {
    currentProperties() {
      return { tag: this.$route.params.tag }
    },
  },
}
</script>

<style lang="scss" scoped></style>
