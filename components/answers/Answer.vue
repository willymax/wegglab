<template>
  <card>
    <h2>{{ answer.body }}</h2>
  </card>
</template>

<script>
import Card from '../core-components/Cards/Card.vue'
export default {
  components: { Card },
  props: {
    answer: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
