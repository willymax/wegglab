export const actions = {
  getAccessToken(context, data) {
    return new Promise((resolve, reject) => {
      console.log('getAccessToken')
      fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
        auth: {
          username: process.env.paypalClient,
          password: process.env.paypalSecret,
        },
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.paypalClient + ':' + process.env.paypalSecret
            ).toString('base64'),
        },
      })
        .then((res) => res.json())
        .then(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
}

export const state = () => ({
  accessToken: '',
})

export const mutations = {
  getAccessToken: (state, accessToken) => {
    state.accessToken = accessToken
  },
}

export const getters = {
  getAccessToken: (state) => state.accessToken,
}
