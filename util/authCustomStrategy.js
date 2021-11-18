import Jsona from 'jsona'
import LocalScheme from '~/node_modules/@nuxtjs/auth/lib/schemes/local'

export default class CustomScheme extends LocalScheme {
  // Deserialize user from json:api format
  formatUser(user) {
    const dataFormatter = new Jsona()
    return dataFormatter.deserialize(user)
  }

  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    if (user) {
      this.$auth.setUser(user)
      if (user.subscription_id) {
        const res = await this.$store.dispatch('paypal/getAccessToken')
        const accessToken = res.access_token
        const response = await fetch(
          `https://api-m.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json())
        user.subscribed = response.status === 'ACTIVE'
      } else {
        //
        user.subscribed = false
      }
      this.$auth.setUser(user)
      // Promise.resolve(this.formatUser(user)).then((formattedUser) => {
      //   console.log('user set ' + formattedUser)
      //   this.$auth.setUser(formattedUser)
      // })
    }
  }
}
