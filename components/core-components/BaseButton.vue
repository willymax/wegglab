<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    class="bg-color-secondary hover:bg-green-700 text-on-secondary font-bold py-2 px-4 rounded capitalize my-2"
    :class="[
      { 'rounded-full': round },
      { 'bg-transparent': transparent },
      { border: border },
      { block: block },
      { [`${width}`]: width },
      { [`h-${height}`]: height },
      { [`hover:text-${hoverText}`]: hoverText },
      { disabled: disabled && tag !== 'button' },
    ]"
    @click="handleClick"
  >
    <slot name="loading">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </slot>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      default: 'button',
      description: 'Button html tag',
    },
    round: Boolean,
    transparent: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    wide: Boolean,
    disabled: Boolean,
    border: Boolean,
    type: {
      type: String,
      default: 'default',
      description: 'Button type (primary|secondary|danger etc)',
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g button, input etc)',
    },
    size: {
      type: String,
      default: '',
      description: 'Button size (sm|lg)',
    },
    height: {
      type: String,
      default: '',
      description: 'Button size (sm|lg)',
    },
    width: {
      type: String,
      default: '',
      description: 'Button size (sm|md|lg)',
    },
    hoverText: {
      type: String,
      default: 'white',
      description: 'text color on button hover (any valid color)',
    },
    outline: {
      type: Boolean,
      description: 'Whether button is outlined (only border has color)',
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)',
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>
<style scoped></style>
