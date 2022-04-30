<template>
  <div
    class=""
    :class="[
      { disabled: disabled },
      { [`custom-checkbox-${type}`]: type },
      inlineClass,
    ]"
  >
    <label :for="cbId" class="custom-control-label">
      <input
        :id="cbId"
        v-model="model"
        class="text-indigo-500 w-6 h-6 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded"
        :aria-label="ariaLabel"
        :class="inputClasses"
        type="checkbox"
        :disabled="disabled"
      />
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: 'Whether checkbox is checked',
      default: false,
    },
    disabled: {
      type: Boolean,
      description: 'Whether checkbox is disabled',
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      description: 'Whether checkbox is inline',
    },
    inputClasses: {
      type: [String, Object, Array],
      description: 'Checkbox input classes',
      default: '',
    },
    type: {
      type: String,
      description: 'Checkbox type (e.g info, danger etc)',
      default: '',
    },
  },
  data() {
    return {
      cbId: '',
      touched: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(check) {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      },
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`
      } else {
        return ''
      }
    },
  },
  mounted() {
    this.cbId = Math.random().toString(16).slice(2)
  },
}
</script>
