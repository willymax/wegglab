import Vue from 'vue'
import filter from './filters/truncate'
/**
 * You can register global filters here and use them as a plugin in your main Vue instance
 */
Vue.filter('truncate', filter)
