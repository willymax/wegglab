// thanks to https://github.com/mrichar1/jsonapi-vuex/issues/13
export default function ({ $axios, store }) {
  $axios.setHeader('content-type', 'application/vnd.api+json')
}
