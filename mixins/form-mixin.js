import { isEmpty, isEqual, omit, pick } from 'lodash'

export default {
  data() {
    return {
      isLoading: false,
      apiValidationErrors: {},
    }
  },
  methods: {
    /* extract API server validation errors and assigns them to local mixin data */
    setApiValidation(errors, refs = null) {
      this.unsetApiValidationErrors()
      if (errors && errors.response && errors.response.data) {
        if (errors.response.data.errors) {
          errors = errors.response.data.errors
        } else {
          this.apiValidationErrors.message = [errors.response.data.message]
        }
      }
      if (errors && errors instanceof Array) {
        this.apiValidationErrors = errors.reduce((accumulator, errorObject) => {
          if (
            typeof errorObject.field === 'undefined' &&
            typeof errorObject.context === 'undefined'
          )
            return false

          // const errorFieldName = errorObject.field.pointer.split('/')[3]
          const errorFieldName = errorObject.field || errorObject.context?.key
          const errorDetail = (accumulator[errorFieldName] || []).concat(
            errorObject.messages || errorObject.message
          )
          return {
            ...accumulator,
            [errorFieldName]: errorDetail,
          }
        }, {})
      }
    },

    unsetApiValidationErrors() {
      this.apiValidationErrors = {}
    },
  },
}
