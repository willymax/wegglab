<template>
  <div>
    <input id="card-holder-name" type="text" />

    <!-- Stripe Elements Placeholder -->
    <div id="card-element"></div>

    <button id="card-button" :data-secret="client_secret">
      Update Payment Method
    </button>
    {{ client_secret }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      client_secret: '',
      stripeAPIToken: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      stripe: '',
      elements: '',
      card: '',
    }
  },
  async fetch() {
    const res = await this.$axios.get('billing/setup-intent')

    this.client_secret = res.data.data.client_secret
  },
  fetchOnServer: false,
  // multiple components can return the same `fetchKey` and Nuxt will track them both separately
  fetchKey: 'billing-update',
  computed: {
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    this.includeStripe(
      'https://js.stripe.com/v3/',
      function () {
        this.configureStripe()
      }.bind(this)
    )
  },
  methods: {
    configureStripe() {
      // eslint-disable-next-line no-undef
      this.stripe = Stripe(this.stripeAPIToken)
      this.elements = this.stripe.elements()
      this.card = this.elements.create('card')

      this.card.mount('#card-element')
    },
    includeStripe(URL, callback) {
      const documentTag = document
      const tag = 'script'
      const object = documentTag.createElement(tag)
      const scriptTag = documentTag.getElementsByTagName(tag)[0]
      object.src = URL
      if (callback) {
        object.addEventListener(
          'load',
          function (e) {
            callback(null, e)
          },
          false
        )
      }
      scriptTag.parentNode.insertBefore(object, scriptTag)
    },
  },
}
</script>

<style lang="scss" scoped></style>
