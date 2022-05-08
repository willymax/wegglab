<template>
  <validation-provider
    v-slot="{ errors, valid, invalid, validated }"
    :rules="rules"
    :name="name"
    v-bind="$attrs"
  >
    <div :class="{ 'is-invalid': validated && invalid }">
      <slot name="label">
        <label v-if="label" :class="labelClasses">
          {{ label }}
        </label>
      </slot>
      <div
        class="flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded"
        :class="[
          { 'input-group': hasIcon },
          { focused: focused },
          { 'input-group-alternative': alternative },
          { 'has-label': label || $slots.label },
          inputGroupClasses,
        ]"
      >
        <div
          v-if="prependIcon || $slots.prepend"
          class="flex -mr-px justify-center"
        >
          <span class="w-15 p-4">
            <slot name="prepend">
              <i :class="prependIcon"></i>
            </slot>
          </span>
        </div>
        <slot v-bind="slotData">
          <select
            :valid="valid"
            :required="required"
            v-bind="$attrs"
            :class="[
              { 'is-valid': valid && validated && successMessage },
              { 'is-invalid': invalid && validated },
              inputClasses,
            ]"
            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            v-on="listeners"
          >
            <option disabled="disabled" selected="selected">
              Choose Option
            </option>
            <option
              v-for="option in options"
              :key="getKey(option)"
              :value="getValue(option)"
            >
              {{ getText(option) }}
            </option>
          </select>
        </slot>
        <div v-if="appendIcon || $slots.append" class="input-group-append">
          <span class="input-group-text">
            <slot name="append">
              <i :class="appendIcon"></i>
            </slot>
          </span>
        </div>
        <slot name="infoBlock"></slot>
      </div>
      <slot name="success">
        <div v-if="valid && validated" class="text-success">
          {{ successMessage }}
        </div>
      </slot>
      <slot name="error">
        <div v-if="errors[0]" class="text-error" style="display: block">
          {{ errors[0] }}
        </div>
      </slot>
    </div>
  </validation-provider>
</template>
<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      description: 'Whether input is required (adds an asterix *)',
    },
    group: {
      type: Boolean,
      description:
        'Whether input is an input group (manual override in special cases)',
    },
    alternative: {
      type: Boolean,
      description: 'Whether input is of alternative layout',
    },
    label: {
      type: String,
      default: '',
      description: 'Input label (text before input)',
    },
    error: {
      type: String,
      default: '',
      description: 'Input error (below input)',
    },
    successMessage: {
      type: String,
      description: 'Input success message',
      default: '',
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes',
      default: 'block mb-2 text-sm font-bold text-gray-700',
    },
    inputClasses: {
      type: String,
      default: '',
      description: 'Input css classes',
    },
    inputGroupClasses: {
      type: String,
      default: '',
      description: 'Input group css classes',
    },
    type: {
      type: String,
      description: 'Input type',
      default: 'text',
    },
    appendIcon: {
      type: String,
      default: '',
      description: 'Append icon (right)',
    },
    prependIcon: {
      type: String,
      default: '',
      description: 'Prepend icon (left)',
    },
    rules: {
      type: [String, Array, Object],
      description: 'Vee validate validation rules',
      default: '',
    },
    name: {
      type: String,
      description: 'Input name (used for validation)',
      default: '',
    },
    valueKey: {
      type: String,
      description: 'key containing value incase of an object',
      default: '_id',
    },
    keyKey: {
      type: String,
      description: 'key containing key incase of an object',
      default: '_id',
    },
    textKey: {
      type: String,
      description: 'key containing text incase of a object',
      default: 'name',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      }
    },
    slotData() {
      return {
        focused: this.focused,
        error: this.error,
        ...this.listeners,
      }
    },
    hasIcon() {
      const { append, prepend } = this.$slots
      return (
        append !== undefined ||
        prepend !== undefined ||
        this.appendIcon !== undefined ||
        this.prependIcon !== undefined ||
        this.group
      )
    },
  },
  methods: {
    getValue(option) {
      return typeof option === 'object' && option != null
        ? option[this.valueKey]
        : option
    },
    getKey(option) {
      return typeof option === 'object' && option != null
        ? option[this.keyKey]
        : option
    },
    getText(option) {
      return typeof option === 'object' && option != null
        ? option[this.textKey]
        : option
    },
    updateValue(evt) {
      const value = evt.target.value
      this.$emit('input', value)
    },
    onFocus(evt) {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur(evt) {
      this.focused = false
      this.$emit('blur', evt)
    },
  },
}
</script>
<style></style>
