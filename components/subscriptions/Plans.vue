<template>
  <div>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      <plan :price="10" plan-id="P-3M2534737G635851KMGHHR2A">Basic</plan>
      <plan :price="25" plan-id="P-3M2534737G635851KMGHHR2A">Standard</plan>
      <plan :price="50" plan-id="P-3M2534737G635851KMGHHR2A">Premium</plan>
    </div>
    <button @click="show = !show">Open Dialog</button>
    <modal :show="show" class="z-30">
      <Checkout></Checkout>
      <template #footer>
        <button @click="show = !show">Close Dialog</button>
      </template>
    </modal>
    <br />
    <nuxt-link to="/">Hello 2</nuxt-link>
  </div>
</template>

<script>
import Modal from '../core-components/Modal.vue'
import Plan from './Plan.vue'
import Checkout from '~/components/subscriptions/Checkout.vue'
export default {
  components: { Plan, Checkout, Modal },
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
