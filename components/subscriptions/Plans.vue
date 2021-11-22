<template>
  <div class="flex flex-wrap items-center justify-center py-4 pt-0">
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
