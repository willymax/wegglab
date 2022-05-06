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
      console.log('tag', this.$route.params.tag)
      return { tag: this.$route.params.tag }
    },
  },
  mounted() {
    console.log('this.$route', this.$route)
  },
}
</script>

<style lang="scss" scoped></style>
