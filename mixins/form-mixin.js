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
    setApiValidation(serverErrors, refs = null) {
      this.apiValidationErrors = serverErrors.reduce(
        (accumulator, errorObject) => {
          if (typeof errorObject.field === 'undefined') return false

          // const errorFieldName = errorObject.field.pointer.split('/')[3]
          const errorFieldName = errorObject.field
          const errorDetail = (accumulator[errorFieldName] || []).concat(
            errorObject.messages
          )

          return {
            ...accumulator,
            [errorFieldName]: errorDetail,
          }
        },
        {}
      )
    },

    unsetApiValidationErrors() {
      this.apiValidationErrors = {}
    },
  },
}
