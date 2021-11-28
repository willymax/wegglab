export const actions = {
  getAccessToken({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      const token = getters.getAccessToken
      if (token) {
        return resolve(token)
      }
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
            commit('setAccessToken', response)
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
  accessToken: null,
})

export const mutations = {
  setAccessToken: (state, payload) => {
    // expires_in in seconds, change to milliseconds
    state.accessToken = {
      ...payload,
      expires_on: Date.now() + payload.expires_in * 1000,
    }
  },
}

export const getters = {
  getAccessToken: (state) => {
    if (state.accessToken) {
      if (Date.now() > state.accessToken.expires_on) {
        return null
      } else {
        return state.accessToken
      }
    }
  },
}
