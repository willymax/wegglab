import Vue from 'vue'
import GoogleAuth from '@/config/google.js'
export default ({ app }) => {
  const gauthOption = {
    clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account',
  }
  Vue.use(GoogleAuth, gauthOption)
}
