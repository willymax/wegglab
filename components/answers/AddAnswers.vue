<template>
  <card v-if="!addingAnswer" class="ma-5">
    <div class="text-center">
      <button
        class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        @click="handleClick"
      >
        <slot></slot>
      </button>
    </div>
  </card>
</template>
<script>
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
import Card from '../core-components/Cards/Card.vue'
export default {
  components: { Card, BaseNuxtButtonLink },
  computed: {
    addingAnswer() {
      return this.$store.getters['answers/addingAnswer']
    },
  },
  methods: {
    handleClick(evt) {
      this.$store.dispatch('answers/updateAddingAnswer', !this.addingAnswer)
    },
  },
}
</script>

<style lang="scss" scoped></style>
