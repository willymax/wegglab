<template>
  <SlideYUpTransition :duration="animationDuration">
    <!--Overlay Effect-->
    <div
      id="my-modal"
      style="z-index: 9998"
      class="
        fixed
        inset-0
        h-full
        w-full
        bg-gray-600 bg-opacity-50
        overflow-y-auto overflow-x-auto
        table
      "
      :class="[{ 'modal-mini': type === 'mini' }]"
      role="dialog"
      tabindex="-1"
      :aria-hidden="!show"
      @mousedown.self="closeModal"
    >
      <div class="table-cell align-middle">
        <div
          class="top-20 mx-auto p-5 border w-4/5 shadow-lg rounded-md bg-white"
          :class="[
            { 'modal-notice': type === 'notice', [`modal-${size}`]: size },
            modalClasses,
          ]"
        >
          <div
            class="mt-3 text-center"
            :class="[
              gradient ? `bg-gradient-${gradient}` : '',
              modalContentClasses,
            ]"
          >
            <div
              v-if="$slots.header"
              class="modal-header"
              :class="[headerClasses]"
            >
              <slot name="header"></slot>
              <slot name="close-button">
                <button
                  v-if="showClose"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="closeModal"
                >
                  <span :aria-hidden="!show">×</span>
                </button>
              </slot>
            </div>

            <div class="modal-body" :class="bodyClasses">
              <slot></slot>
            </div>
            <div
              v-if="$slots.footer"
              class="modal-footer"
              :class="footerClasses"
            >
              <slot name="footer"></slot>
            </div>
          </div>
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
