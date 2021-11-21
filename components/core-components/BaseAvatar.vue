<template>
  <div :class="marginTop">
    <div
      style="height: 9rem; width: 9rem"
      class="md rounded-full relative avatar"
    >
      <img
        style="height: 9rem; width: 9rem"
        class="md rounded-full relative border-4 border-gray-900"
        :src="userAvatar || require('~/assets/img/avatar.png')"
        alt=""
        @error="errorLoadingAvatar == true"
      />
      <div class="absolute"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userAvatar: {
      type: String,
      default: '',
    },
    marginTop: {
      type: String,
      default: 'margin-top: 0rem',
    },
  },
  data() {
    return {
      errorLoadingAvatar: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
