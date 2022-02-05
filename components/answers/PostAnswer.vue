<template>
  <div>
    <textarea
      v-model="input.body"
      class="form-textarea mt-1 block w-full p-2"
      rows="3"
      placeholder="Enter the description of your question."
    ></textarea>
    <validation-error :errors="apiValidationErrors.body" />
    <base-file-upload v-model="FILES"></base-file-upload>
    <validation-error :errors="apiValidationErrors.email" />
    <base-button @click="postAnswer()">Submit</base-button>
  </div>
</template>

<script>
import BaseButton from '../core-components/BaseButton.vue'
import BaseFileUpload from '../core-components/BaseFileUpload.vue'
import ValidationError from '../ValidationError.vue'
import formMixin from '@/mixins/form-mixin'
export default {
  components: { BaseFileUpload, ValidationError, BaseButton },
  mixins: [formMixin],
  data() {
    return {
      FILES: {},
      input: {
        body: '',
      },
    }
  },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  methods: {
    postAnswer() {
      const formData = new FormData()
      const answerFiles = []
      let counter = 0
      for (const [index, file] of Object.entries(this.FILES)) {
        formData.append(`answerFiles[${counter}]`, file)
        counter++
      }
      formData.append('title', this.input.title)
      formData.append('body', this.input.body)
      formData.append('question_id', this.question.id)
      delete this.$axios.defaults.headers.common['content-type']
      delete this.$axios.defaults.headers.post['content-type']
      this.$axios({
        method: 'POST',
        url: 'answers',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Answer created successfully.',
          })
          this.$store.dispatch('answers/updateAddingAnswer', false)
          this.$store.commit(
            'questions/ADD_QUESTION_ANSWERS',
            response.data.data
          )
        })
        .catch((error) => {
          this.setApiValidation(error.response.data.errors)
        })
        .then(function () {
          // always executed
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
