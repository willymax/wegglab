<template>
  <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <div class="mb-4">
      <base-input
        v-model="form.data.product._id"
        alternative
        class="mb-3"
        placeholder="Enter id"
        name="id"
        label="Product Id"
        type="text"
        disabled
      ></base-input>
      <validation-error :errors="apiValidationErrors._id" />
    </div>
    <div class="mb-4">
      <base-input
        v-model="form.data.product.name"
        alternative
        class="mb-3"
        placeholder="Enter name"
        name="name"
        label="Product Name"
        type="text"
      ></base-input>
      <validation-error :errors="apiValidationErrors.name" />
    </div>
    <div class="mb-4">
      <base-text-area
        v-model="form.data.product.description"
        placeholder="The description of the product"
        name="description"
        label="Product Description"
      ></base-text-area>
      <validation-error :errors="apiValidationErrors.description" />
    </div>
    <div class="mb-4">
      <base-select
        v-model="form.data.product.type"
        :options="types"
        label="Product Type"
        disabled
      ></base-select>
    </div>
    <div class="mb-4">
      <base-input
        v-model="form.data.product.category"
        alternative
        class="mb-3"
        placeholder="Enter category"
        name="category"
        label="Product Category"
        type="text"
        disabled
      ></base-input>
      <validation-error :errors="apiValidationErrors.category" />
    </div>
    <div class="mb-4">
      <base-button @click="postData()">Create</base-button>
    </div>
  </form>
</template>

<script>
import formMixin from '@/mixins/form-mixin'
import BaseTextArea from '~/components/core-components/Inputs/BaseTextArea.vue'
import BaseSelect from '~/components/core-components/Inputs/BaseSelect.vue'
import BaseButton from '~/components/core-components/BaseButton.vue'

export default {
  components: { BaseTextArea, BaseSelect, BaseButton },
  mixins: [formMixin],
  layout: 'ResponsiveDashboard',
  data() {
    return {
      types: ['PHYSICAL', 'DIGITAL', 'SERVICE'],
      form: {
        data: {
          product: {
            // id: `PROD-${Date.now()}`,
            name: null,
            description: null,
            type: 'SERVICE',
            // image_url: '',
            category: 'EDUCATIONAL_AND_TEXTBOOKS',
          },
        },
      },
    }
  },
  methods: {
    async createProduct(url = '', data = {}) {
      const res = await this.$store.dispatch('paypal/getAccessToken')
      const accessToken = res.access_token
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      return response.json() // parses JSON response into native JavaScript objects
    },
    postData() {
      const theData = this.form.data.product
      this.createProduct(
        'https://api-m.sandbox.paypal.com/v1/catalogs/products',
        theData
      ).then((data) => {})
    },
  },
}
</script>

<style lang="scss" scoped></style>
