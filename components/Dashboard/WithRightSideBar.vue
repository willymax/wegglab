<template>
  <div class="flex">
    <section class="w-full md:w-4/5 border-y-0 border-gray-800 px-4">
      <slot>
        <p>Page Content</p>
      </slot>
    </section>
    <aside class="md:w-1/5 h-12 position-relative hidden md:block">
      <slot name="sidebar">
        <p>Hello sidebar</p>
      </slot>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'WithRightSideBar',
}
</script>

<style lang="scss" scoped></style>
