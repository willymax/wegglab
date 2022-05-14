<template>
  <div>
    <h3 class="pt-4 text-2xl text-center font-semibold">
      How would you like to use Wegglab
    </h3>
    <p class="py-4 text-lg text-center">The #1 tutoring platform</p>
    <div class="flex items-center justify-center">
      <!-- Component Start -->
      <form
        class="grid md:grid-cols-2 grid-cols-1 gap-2 w-full max-w-screen-sm"
      >
        <div class="h-full">
          <input
            id="radio_1"
            v-model="type"
            value="student"
            class="hidden"
            type="radio"
            name="radio"
            checked
          />
          <label
            class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer"
            for="radio_1"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path
                  d="M23.95 42 9.45 34.05V22.05L2 18L23.95 6L46 18V33.85H43V19.75L38.45 22.05V34.05ZM23.95 26.6 39.7 18 23.95 9.55 8.3 18ZM23.95 38.6 35.45 32.25V23.85L23.95 30L12.45 23.75V32.25ZM24 26.6ZM23.95 30.3ZM23.95 30.3Z"
                />
              </svg>
            </div>
            <span class="text-lg font-semibold">Student</span>
            <p>Get answers for your most stressing questions</p>
          </label>
        </div>
        <div class="h-full">
          <input
            id="radio_2"
            v-model="type"
            class="hidden"
            type="radio"
            name="radio"
            value="expert"
          />
          <label
            class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer"
            for="radio_2"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path
                  d="M7.2 46V43H40.8V46ZM7.2 5V2H40.8V5ZM24 25.8Q26.5 25.8 28.2 24.1Q29.9 22.4 29.9 19.9Q29.9 17.4 28.2 15.7Q26.5 14 24 14Q21.5 14 19.8 15.7Q18.1 17.4 18.1 19.9Q18.1 22.4 19.8 24.1Q21.5 25.8 24 25.8ZM6.6 40Q5.4 40 4.5 39.1Q3.6 38.2 3.6 37V11Q3.6 9.7 4.5 8.85Q5.4 8 6.6 8H41.4Q42.6 8 43.5 8.9Q44.4 9.8 44.4 11V37Q44.4 38.2 43.5 39.1Q42.6 40 41.4 40ZM11 37Q13.55 33.85 17.05 32.275Q20.55 30.7 24 30.7Q27.4 30.7 30.975 32.275Q34.55 33.85 37 37H41.4Q41.4 37 41.4 37Q41.4 37 41.4 37V11Q41.4 11 41.4 11Q41.4 11 41.4 11H6.6Q6.6 11 6.6 11Q6.6 11 6.6 11V37Q6.6 37 6.6 37Q6.6 37 6.6 37ZM15.7 37H32.4Q30.85 35.5 28.775 34.6Q26.7 33.7 24 33.7Q21.3 33.7 19.275 34.6Q17.25 35.5 15.7 37ZM24 22.8Q22.8 22.8 21.975 21.95Q21.15 21.1 21.15 19.9Q21.15 18.7 21.975 17.85Q22.8 17 24 17Q25.2 17 26.025 17.85Q26.85 18.7 26.85 19.9Q26.85 21.1 26.025 21.95Q25.2 22.8 24 22.8ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Z"
                />
              </svg>
            </div>
            <span class="text-lg font-semibold">Expert</span>
            <p>Earn money by answering simple questions</p>
          </label>
        </div>
      </form>
      <!-- Component End  -->
    </div>
  </div>
</template>

<script>
import BaseNuxtButtonLink from '../core-components/BaseNuxtButtonLink.vue'
export default {
  components: { BaseNuxtButtonLink },
  props: {
    userType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    type: {
      get() {
        return this.userType
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    userType(newValue, oldValue) {
      this.type = newValue
    },
  },
}
</script>

<style lang="postcss" scoped>
/* The styling below is custom in that we require the :checked Pseudo class, which Tailwind doesn't offer out of the box. However the styling (border color and box shadow) the below applies is native Tailwind. */
input:checked + label {
  @apply border-green-500 !important;
  border-color: black;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
