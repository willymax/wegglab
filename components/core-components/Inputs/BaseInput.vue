<template>
  <validation-provider
    v-slot="{ errors, valid, invalid, validated }"
    :rules="rules"
    :name="name"
    v-bind="$attrs"
  >
    <div :class="{ 'is-invalid': validated && invalid }">
      <slot name="label">
        <label
          v-if="label"
          :for="id"
          :class="labelClasses"
          class="text-gray-600 dark:text-gray-200 block mb-2 text-sm font-medium"
        >
          {{ label }}
        </label>
      </slot>
      <div
        class="flex w-full mb-4 relative h-15 items-center rounded"
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
          <span class="w-15 p-4 bg-transparent">
            <slot name="prepend">
              <i :class="prependIcon"></i>
            </slot>
          </span>
        </div>
        <slot v-bind="slotData">
          <input
            :id="id"
            :type="show ? 'text' : type === 'password' ? 'password' : type"
            v-bind="$attrs"
            :valid="valid"
            :required="required"
            class="text-base flex-shrink flex-grow flex-auto leading-normal block px-3 py-1.5 rounded rounded-l-none text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
            :class="[
              { 'is-valid': valid && validated && successMessage },
              { 'is-invalid': invalid && validated },
              inputClasses,
            ]"
            v-on="listeners"
          />
        </slot>
        <div v-if="appendIcon || $slots.append" class="input-group-append">
          <span class="input-group-text bg-transparent">
            <slot name="append">
              <i :class="appendIcon"></i>
            </slot>
          </span>
        </div>
        <img
          v-if="type === 'password'"
          class="w-5 h-5"
          src="~assets/svgs/visibility_fill.svg"
          :class="{ hidden: !show, block: show }"
          @click="show = !show"
        />
        <img
          v-if="type === 'password'"
          class="w-5 h-5"
          src="~assets/svgs/visibility_off.svg"
          :class="{ block: !show, hidden: show }"
          @click="show = !show"
        />
        <slot name="infoBlock"></slot>
      </div>
      <slot name="success">
        <div v-if="valid && validated" class="text-success">
          {{ successMessage }}
        </div>
      </slot>
      <slot name="error">
        <span v-if="errors[0]">
          <small class="text-error" style="display: block" v-text="errors[0]" />
        </span>
      </slot>
    </div>
  </validation-provider>
</template>
<script>
export default {
  name: 'BaseInput',
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
      default: '',
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
    id: {
      type: String,
      default: null,
      description: 'The id of the input',
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
  },
  data() {
    return {
      focused: false,
      show: false,
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
