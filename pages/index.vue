<template>
  <div>
    <questions></questions>
  </div>
</template>
<script>
import { Tooltip } from 'element-ui'
import Questions from '~/components/questions/Questions.vue'
export default {
  name: 'HomePage',
  auth: false,
  components: {
    Questions,
    [Tooltip.name]: Tooltip,
  },
  layout: 'ResponsiveDashboard',
  // redirect
  // middleware: 'redirect',
}
</script>
