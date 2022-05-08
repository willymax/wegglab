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
      if (errors && errors.response && errors.response.data) {
        errors = errors.response.data.errors
      }
      if (errors && `${typeof errors}` === 'object') {
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
