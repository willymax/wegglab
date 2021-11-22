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
        @load="imageLoaded"
        @error="errorLoadingAvatar == true"
      />
      <span
        v-if="imageLoading"
        class="text-green-500 opacity-75 block absolute h-5 w-5 inset-0 m-auto"
      >
        <i class="fas fa-circle-notch fa-spin fa-2x"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
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
      loaded: false,
    }
  },
  computed: {
    imageLoading() {
      return this.loading || !this.loaded
    },
  },
  methods: {
    imageLoaded() {
      this.loaded = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
