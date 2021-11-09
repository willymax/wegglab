<template>
  <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <div class="mb-4">
      <base-input
        v-model="form.data.attributes.name"
        alternative
        class="mb-3"
        placeholder="Enter name of the plan"
        name="Name"
        label="Plan Name"
        type="text"
      ></base-input>
      <validation-error :errors="apiValidationErrors.name" />
    </div>
    <div class="mb-4 md:flex md:justify-between">
      <div class="mb-4 md:mr-2 md:mb-0">
        <label for="">Status</label>
        <select
          v-model="form.data.attributes.status"
          class="select select-bordered w-full max-w-xs"
        >
          <option disabled="disabled" selected="selected">Choose Status</option>
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <div class="mb-4 md:mr-2 md:mb-0">
        <base-input
          v-model="form.data.attributes.firstName"
          alternative
          class="mb-3"
          placeholder="First Name"
          name="First Name"
          label="First Name"
        ></base-input>
        <validation-error :errors="apiValidationErrors.firstName" />
      </div>
      <div class="mb-4 md:mr-2 md:mb-0">
        <base-input
          v-model="form.data.attributes.firstName"
          alternative
          class="mb-3"
          placeholder="First Name"
          name="First Name"
          label="First Name"
        ></base-input>
        <validation-error :errors="apiValidationErrors.firstName" />
      </div>
      <div class="md:ml-2">
        <base-input
          v-model="form.data.attributes.lastName"
          alternative
          class="mb-3"
          placeholder="Last Name"
          name="Last Name"
          label="Last Name"
        ></base-input>
        <validation-error :errors="apiValidationErrors.lastName" />
      </div>
    </div>
    <div class="mb-4">
      <base-text-area
        v-model="form.data.attributes.description"
        alternative
        class="mb-3"
        rows="3"
        placeholder="Enter the description of your question."
        name="Description"
        label="Description"
      ></base-text-area>
      <validation-error :errors="apiValidationErrors.description" />
    </div>
    <div>
      <textarea
        class="form-textarea mt-1 block w-full p-2"
        rows="3"
        placeholder="Enter the description of your question."
      ></textarea>
    </div>
    <div class="mb-4">
      <base-input
        v-model="form.data.attributes.email"
        alternative
        class="mb-3"
        placeholder="Email"
        name="Email"
        label="Email"
        type="email"
      ></base-input>
      <validation-error :errors="apiValidationErrors.email" />
    </div>
    <div class="mb-4 md:flex md:justify-between">
      <div class="mb-4 md:mr-2 md:mb-0">
        <base-input
          v-model="form.data.attributes.password"
          alternative
          class="mb-3"
          placeholder="******************"
          name="Password"
          type="password"
          label="Password"
        ></base-input>
        <validation-error :errors="apiValidationErrors.password" />
      </div>
      <div class="md:ml-2">
        <base-input
          v-model="form.data.attributes.password_confirmation"
          alternative
          class="mb-3"
          placeholder="******************"
          name="password_confirmation"
          type="password"
          label="Confirm Password"
        ></base-input>
        <validation-error :errors="apiValidationErrors.password" />
      </div>
    </div>
  </form>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
export default {
  components: {},
  mixins: [formMixin],
  layout: 'DashboardLayout',
  data() {
    return {
      statuses: ['CREATED', 'INACTIVE', 'ACTIVE'],
      form: {
        data: {
          attributes: {
            // it will be rare to create plans at the same time
            product_id: Date.now(),
            name: '',
            email: '',
            description: '',
          },
        },
      },
    }
  },
  methods: {
    createPlan() {
      this.$axios
        .post('https://api-m.sandbox.paypal.com/v1/billing/plans', {
          data: {},
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
