<template>
  <div
    class="card rounded overflow-hidden p-2"
    :class="[
      { 'card-lift--hover': hover },
      { shadow: shadow },
      { [`shadow-${shadowSize}`]: shadowSize },
      { [`bg-gradient-${gradient}`]: gradient },
      { [`bg-${type}`]: type },
    ]"
  >
    <slot name="image"></slot>
    <div v-if="$slots.header" class="card-header" :class="headerClasses">
      <slot name="header"> </slot>
    </div>

    <div v-if="!noBody" class="card-body" :class="bodyClasses">
      <slot></slot>
    </div>

    <slot v-if="noBody"></slot>

    <div v-if="$slots.footer" class="card-footer" :class="footerClasses">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    type: {
      type: String,
      default: '',
      description: 'Card type',
    },
    gradient: {
      type: String,
      default: '',
      description: 'Card background gradient type (warning,danger etc)',
    },
    hover: {
      type: Boolean,
      description: 'Whether card should move on hover',
    },
    shadow: {
      type: Boolean,
      description: 'Whether card has shadow',
    },
    shadowSize: {
      type: String,
      default: 'lg',
      description: 'Card shadow size',
    },
    noBody: {
      type: Boolean,
      default: false,
      description: 'Whether card should have wrapper body class',
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: 'Card body css classes',
      default: '',
    },
    headerClasses: {
      type: [String, Object, Array],
      description: 'Card header css classes',
      default: '',
    },
    footerClasses: {
      type: [String, Object, Array],
      description: 'Card footer css classes',
      default: '',
    },
  },
}
</script>
<style></style>
