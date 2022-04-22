<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      id="my-modal"
      style="z-index: 9998"
      class="fixed inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!show"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          v-click-outside="closeModal"
          class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>
<script>
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'BaseModal',
  components: {
    SlideYUpTransition,
  },
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        const acceptedValues = ['', 'notice', 'mini']
        return acceptedValues.includes(value)
      },
      description: 'Modal type (notice|mini|"") ',
    },
    modalClasses: {
      type: [Object, String],
      default: () => {
        return {}
      },
      description: 'Modal dialog css classes',
    },
    size: {
      type: String,
      description: 'Modal size',
      default: '',
      validator(value) {
        const acceptedValues = ['', 'sm', 'lg']
        return acceptedValues.includes(value)
      },
    },
    modalContentClasses: {
      type: [Object, String],
      default: () => {
        return {}
      },
      description: 'Modal dialog content css classes',
    },
    gradient: {
      type: String,
      default: '',
      description: 'Modal gradient type (danger, primary etc)',
    },
    headerClasses: {
      type: [Object, String],
      default: () => {
        return {}
      },
      description: 'Modal Header css classes',
    },
    bodyClasses: {
      type: [Object, String],
      default: () => {
        return {}
      },
      description: 'Modal Body css classes',
    },
    footerClasses: {
      type: [Object, String],
      default: () => {
        return {}
      },
      description: 'Modal Footer css classes',
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: 'Modal transition duration',
    },
  },
  watch: {
    show(val) {
      const modal = document.getElementById('my-modal')
      if (val) {
        modal.style.display = 'block'
      } else {
        modal.style.display = 'none'
      }
    },
  },
  methods: {
    closeModal() {
      console.log("this.$emit('close')")
      this.$emit('update:show', false)
      // this.$emit('close')
    },
  },
}
</script>
<style>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
