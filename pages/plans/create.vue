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
    <div class="mb-4 md:flex">
      <div class="mb-4 md:mr-2 md:mb-0">
        <base-select
          v-model="form.data.attributes.status"
          label="Plan Status"
          :options="statuses"
        ></base-select>
      </div>
      <div class="mb-4 md:mr-2 md:mb-0">
        <base-input
          v-model="
            form.data.attributes.billing_cycle[0].pricing_scheme.fixed_price
              .value
          "
          alternative
          class="mb-3"
          placeholder="Price"
          name="price"
          label="Plan Price"
        ></base-input>
        <validation-error :errors="apiValidationErrors.firstName" />
      </div>
    </div>
    <div class="mb-4">
      <base-text-area
        v-model="form.data.attributes.description"
        alternative
        placeholder="Plan Description."
        name="Description"
        label="Description"
      ></base-text-area>
      <validation-error :errors="apiValidationErrors.description" />
    </div>
    <fieldset class="border border-solid border-gray-300 p-3">
      <legend class="text-sm">Taxes</legend>
      <div class="mb-4 md:flex md:justify-between">
        <div class="md:ml-2">
          <base-input
            v-model="form.data.attributes.taxes.percentage"
            alternative
            class="mb-3"
            name="percentage"
            type="number"
            label="Percentage"
          ></base-input>
          <validation-error :errors="apiValidationErrors.password" />
        </div>
        <div class="md:ml-2">
          <label class="inline-flex items-center">
            <input
              v-model="form.data.attributes.taxes.inclusive"
              class="
                text-indigo-500
                w-8
                h-8
                mr-2
                focus:ring-indigo-400 focus:ring-opacity-25
                border border-gray-300
                rounded
              "
              type="checkbox"
            />
            Inclusive
          </label>
        </div>
      </div>
    </fieldset>
    <base-button @click="createPlan">Submit</base-button>
  </form>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import BaseTextArea from '~/components/core-components/Inputs/BaseTextArea.vue'
import BaseSelect from '~/components/core-components/Inputs/BaseSelect.vue'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'
export default {
  components: { BaseTextArea, BaseSelect, BaseInput, BaseButton },
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
            description: '',
            billing_cycle: [
              {
                frequency: {
                  interval_unit: 'MONTH',
                  interval_count: 1,
                },
                tenure_type: 'REGULAR',
                sequence: 3,
                total_cycles: 0,
                pricing_scheme: {
                  fixed_price: {
                    value: '10',
                    currency_code: 'USD',
                  },
                },
              },
            ],
            payment_preferences: {
              //
              auto_bill_outstanding: true,
              setup_fee: {
                value: '0',
                currency_code: 'USD',
              },
              // The action to take on the subscription if the initial payment for the setup fails.
              // CONTINUE, CANCEL
              setup_fee_failure_action: 'CONTINUE',
              // The maximum number of payment failures before a subscription is suspended
              payment_failure_threshold: 3,
            },
            taxes: {
              percentage: '10',
              inclusive: false,
            },
          },
        },
      },
    }
  },
  methods: {
    createPlan() {
      this.$axios
        .post('https://api-m.sandbox.paypal.com/v1/billing/plans', {
          data: this.form.data.attributes,
          headers: {
            Authorization: 'Bearer ' + '',
            'Content-Type': 'application/json',
            'PayPal-Request-Id': `PLAN-${this.form.data.attributes.product_id}`,
          },
        })
        .then((response) => {
          this.$router.push('/plans')
        })
        .catch((error) => {
          // handle error
          this.$notify({
            type: 'danger',
            message: 'An error occurred: !' + JSON.stringify(error.error),
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
