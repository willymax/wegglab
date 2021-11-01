<template>
  <card class="ma-5">
    <div class="text-center">
      <h2>No Answers Yet</h2>
      <button
        class="
          py-2
          px-4
          bg-green-500
          text-white
          font-semibold
          rounded-lg
          shadow-md
          hover:bg-green-700
          focus:outline-none
          focus:ring-2
          focus:ring-green-400
          focus:ring-opacity-75
        "
      >
        Be The First To Answer
      </button>
    </div>
  </card>
</template>

<script>
import Card from '../core-components/Cards/Card.vue'
export default {
  components: { Card },
}
</script>

<style lang="scss" scoped></style>
