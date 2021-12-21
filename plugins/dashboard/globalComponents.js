import Vue from 'vue'
import { Input, Tooltip, Popover } from 'element-ui'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Badge from '~/components/core-components/Badge.vue'
import BaseAlert from '~/components/core-components/BaseAlert'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseDropdown from '~/components/core-components/BaseDropdown.vue'
import BaseHeader from '~/components/core-components/BaseHeader'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
import BaseNav from '~/components/core-components/Navbar/BaseNav'
import BasePagination from '~/components/core-components/BasePagination'
import BaseProgress from '~/components/core-components/BaseProgress'
import Card from '~/components/core-components/Cards/Card.vue'
import Modal from '~/components/core-components/Modal.vue'
import RouteBreadcrumb from '~/components/core-components/Breadcrumb/RouteBreadcrumb'
import StatsCard from '~/components/core-components/Cards/StatsCard.vue'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(Badge.name, Badge)
Vue.component(BaseAlert.name, BaseAlert)
Vue.component(BaseButton.name, BaseButton)
Vue.component(BaseHeader.name, BaseHeader)
Vue.component(BaseInput.name, BaseInput)
Vue.component(BaseDropdown.name, BaseDropdown)
Vue.component(BaseNav.name, BaseNav)
Vue.component(BasePagination.name, BasePagination)
Vue.component(BaseProgress.name, BaseProgress)
Vue.component(Card.name, Card)
// Vue.component(Modal.name, Modal)
Vue.component(StatsCard.name, StatsCard)
Vue.component(RouteBreadcrumb.name, RouteBreadcrumb)
Vue.component(Input.name, Input)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(Tooltip)
Vue.use(Popover)
