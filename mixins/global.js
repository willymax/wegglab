import { isEmpty, isEqual, omit, pick } from 'lodash'

export const Forms = {
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
          const errorFieldName = refs
            ? errorObject.source.pointer.split('/')[3] + '_' + refs
            : errorObject.source.pointer.split('/')[3]

          const errorDetail = (accumulator[errorFieldName] || []).concat(
            errorObject.detail
          )

          return {
            ...accumulator,
            [errorFieldName]: errorDetail,
          }
        },
        {}
      )
    },

    /* resets form after success */
    resetForm() {
      // Reset attributes
      for (const key in this.form.data.attributes) {
        if (
          Object.prototype.hasOwnProperty.call(this.form.data.attributes, key)
        ) {
          this.form.data.attributes[key] = null
        }
      }

      // Reset relationships if exist
      if (
        Object.prototype.hasOwnProperty.call(this.form.data, 'relationships')
      ) {
        for (const key in this.form.data.relationships) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.form.data.relationships,
              key
            )
          ) {
            this.form.data.relationships[key].data._id = null
          }
        }
      }

      // reset Loading status
      this.isLoading = false
    },

    checkFormIsDirty(oldData, newData) {
      if (isEmpty(oldData)) {
        let relationshipIds = []
        newData = omit(newData, ['id', 'type'])

        if (
          Object.prototype.hasOwnProperty.call(newData, 'relationshipNames')
        ) {
          const relationships = pick(newData, newData.relationshipNames)
          relationshipIds = Object.values(relationships).map((i) => i._id)
          newData = omit(newData, [
            ...Object.keys(relationships),
            'relationshipNames',
          ])
        }

        return (
          Object.values(newData).filter((item) => !isEmpty(item)).length ||
          relationshipIds.filter((item) => !isEmpty(item)).length
        )
      }

      return !isEqual(oldData, newData)
    },
  },
}
