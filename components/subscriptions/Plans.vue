<template>
  <div>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      <plan :price="10" plan-id="P-65544420LN928152WMGSJ5ZQ" name="Basic"
        >Basic</plan
      >
      <plan :price="25" plan-id="P-3M2534737G635851KMGHHR2A" name="Standard"
        >Standard</plan
      >
      <plan :price="50" plan-id="P-24517945X9691760EMGSJ3DQ" name="Premium"
        >Premium</plan
      >
    </div>
  </div>
</template>

<script>
import Plan from './Plan.vue'
export default {
  components: { Plan },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
