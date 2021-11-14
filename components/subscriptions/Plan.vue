<template>
  <div class="w-full p-4 md:w-1/2 lg:w-1/3">
    <div
      class="
        flex flex-col
        rounded-lg
        border-2
        shadow-lg
        relative
        cursor-pointer
        hover:shadow-2xl
      "
    >
      <div class="w-full px-4 py-6 rounded-t-lg card-section-1">
        <p class="text-3xl font-bold group-hover:text-white text-blue-500">
          ${{ price }}<span class="text-lg">/Month</span>
        </p>
        <h3 class="mx-auto text-base font-semibold group-hover:text-white py-2">
          <slot></slot>
        </h3>
        <p class="text-xs group-hover:text-white py-3">
          Description of the plan
        </p>
      </div>
      <hr class="w-1" />
      <div
        class="
          flex flex-col
          items-center
          justify-center
          w-full
          h-full
          py-4
          rounded-b-lg
        "
      >
        <div class="w-5/6">
          <ul>
            <li>
              <a
                class="
                  block
                  px-5
                  py-3
                  rounded-lg
                  text-gray-900
                  hover:bg-gray-200
                  focus:bg-indigo-500 focus:text-white
                  outline-none
                  cursor-pointer
                "
                ><span><i class="fas fa-check-circle"></i></span> Menu Item</a
              >
            </li>
          </ul>
        </div>
        <div
          class="
            w-5/6
            py-2
            mt-2
            font-semibold
            text-center
            uppercase
            border border-transparent
            rounded
            text-blue-500
          "
        >
          <paypal-button :plan-id="planId"></paypal-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaypalButton from './PaypalButton.vue'
export default {
  components: { PaypalButton },
  props: {
    price: {
      type: Number,
      default: 0,
    },
    planId: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped></style>
