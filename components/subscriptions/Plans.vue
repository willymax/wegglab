<template>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
    <plan :price="10" plan-id="P-3M2534737G635851KMGHHR2A">Basic</plan>
    <plan :price="25" plan-id="P-3M2534737G635851KMGHHR2A">Standard</plan>
    <plan :price="50" plan-id="P-3M2534737G635851KMGHHR2A">Premium</plan>
  </div>
</template>

<script>
import Plan from './Plan.vue'
export default {
  components: { Plan },
}
</script>

<style lang="scss" scoped></style>
