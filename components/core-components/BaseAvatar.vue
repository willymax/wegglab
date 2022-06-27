<template>
  <client-only :class="marginTop">
    <div class="relative" :class="dimensionsClasses">
      <img
        ref="avatar"
        :class="[imgClasses, dimensionsClasses]"
        class="rounded-full border border-gray-100 shadow-sm"
        :src="$getImageUrl(userAvatar) || require('~/assets/img/avatar.png')"
        alt=""
        @load="imageLoaded"
        @error="errorLoadingAvatar()"
      />
      <span
        v-if="!loaded"
        class="text-green-500 opacity-75 block absolute h-5 w-5 inset-0 m-auto"
      >
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
    </div>
  </client-only>
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
    imgClasses: {
      type: String,
      default: '',
      description: 'Input css classes',
    },
    dimensionsClasses: {
      type: String,
      default: 'w-16 h-16',
      description: 'Input css classes',
    },
  },
  data() {
    return {
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
    errorLoadingAvatar() {
      if (this.$refs.avatar) {
        this.$refs.avatar.src = require('~/assets/img/avatar.png')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
