<template>
  <div class="card">
    <div role="tab" class="card-header" :aria-expanded="active">
      <a
        data-toggle="collapse"
        data-parent="#accordion"
        :href="`#${itemId}`"
        :aria-controls="`content-${itemId}`"
        @click.prevent="activate"
      >
        <slot name="title"> {{ title }} </slot>
        <i class="tim-icons icon-minimal-down"></i>
      </a>
    </div>
    <collapse-transition :duration="animationDuration">
      <div
        v-show="active"
        :id="`content-${itemId}`"
        role="tabpanel"
        :aria-labelledby="title"
        class="collapsed"
      >
        <div class="card-body"><slot></slot></div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'CollapseItem',
  components: {
    CollapseTransition,
  },
  inject: {
    animationDuration: {
      default: 250,
    },
    multipleActive: {
      default: false,
    },
    addItem: {
      default: () => {},
    },
    removeItem: {
      default: () => {},
    },
    deactivateAll: {
      default: () => {},
    },
  },
  props: {
    title: {
      type: String,
      default: '',
      description: 'Collapse item title',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: false,
    }
  },
  computed: {
    itemId() {
      return this._id || this.title
    },
  },
  mounted() {
    this.addItem(this)
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.removeItem(this)
  },
  methods: {
    activate() {
      const wasActive = this.active
      if (!this.multipleActive) {
        this.deactivateAll()
      }
      this.active = !wasActive
    },
  },
}
</script>
<style></style>
