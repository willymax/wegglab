import DOMPurify from 'dompurify'
export default ({ app }, inject) => {
  inject('sanitizeHtml', (html) => {
    return DOMPurify.sanitize(html)
  })
}
