export default {
  // eslint-disable-next-line object-shorthand
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  // eslint-disable-next-line object-shorthand
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}
