<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      v-if="show"
      id="my-modal"
      class="modal"
      tabindex="-1"
      style="z-index: 9998"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      :aria-hidden="!show"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div class="inset-0 overflow-y-auto no-scrollbar fixed overflow-x-hidden">
        <div class="text-center h-full">
          <div class="flex items-start md:items-center justify-center h-full">
            <div
              tabindex="-1"
              style="z-index: 9998; max-width: 768px"
              class="overflow-hidden shadow-xl transform transition-all py-10 relative bg-white inline-block rounded-lg text-left align-middle md:w-fit w-full"
            >
              <button
                aria-label="Close"
                type="button"
                class="absolute top-5 right-5"
                @click="closeModal()"
              >
                <span class="" aria-hidden="true"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 23 23"
                    width="23"
                    height="23"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="1.2"
                      d="M1 1l21 21m0-21L1 22"
                    ></path></svg
                ></span>
              </button>
              <div class="p-5"><slot></slot></div>
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
    minWidth: {
      type: Number,
      default: 768,
    },
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
  methods: {
    closeModal() {
      this.$emit('update:show', false)
    },
  },
}
</script>
<style lang="postcss" scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
