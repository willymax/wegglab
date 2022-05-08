<template>
  <span v-if="errors && errors.length">
    <small class="argon-error" v-text="errorMessage(errors[0])" />
  </span>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    errorMessage(message) {
      message = message ? message.replace(/['"]+/g, '').toLowerCase() : ''
      message = `${message[0].toUpperCase()}${message.slice(1)}`
      return message
    },
  },
}
</script>

<style>
.argon-error {
  position: relative;
  bottom: 20px;
  color: #fb6340;
}
</style>
