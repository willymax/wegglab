// thanks to https://github.com/mrichar1/jsonapi-vuex/issues/13
export default function ({ $axios, store, redirect }) {
  // $axios.setHeader('content-type', 'application/vnd.api+json')
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
    // console.log(JSON.stringify(config))
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
  })
  $axios.interceptors.request.use((request) => {
    return request
  })
}
