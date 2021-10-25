<template>
  <div class="p-2">
    <select class="select select-bordered w-full max-w-xs">
      <option disabled="disabled" selected="selected">Choose Category</option>
      <option>Mathematics</option>
      <option>Physcis</option>
      <option>Science</option>
    </select>
    <base-input
      v-model="input.title"
      label="Title"
      placeholder="Enter Question Title"
    />
    <validation-error :errors="apiValidationErrors.title" />
    <textarea
      v-model="input.body"
      class="form-textarea mt-1 block w-full p-2"
      rows="3"
      placeholder="Enter the description of your question."
    ></textarea>
    <validation-error :errors="apiValidationErrors.body" />
    <BaseFileUpload v-model="FILES"></BaseFileUpload>
    <validation-error :errors="apiValidationErrors.email" />
    <base-button @click="postQuestion()">Submit</base-button>
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import formMixin from '@/mixins/form-mixin'
export default {
  components: {
    BaseFileUpload,
    BaseButton,
  },
  mixins: [formMixin],
  layout: 'DashboardLayout',
  data() {
    return {
      FILES: {},
      input: {
        title: 'The title',
        body: 'The body',
      },
    }
  },
  watch: {
    FILES(newValue, oldValue) {},
  },
  methods: {
    postQuestion() {
      const formData = new FormData()
      const questionFiles = []
      let counter = 0
      for (const [index, file] of Object.entries(this.FILES)) {
        formData.append(`questionFiles[${counter}]`, file)
        counter++
      }
      formData.append('title', this.input.title)
      formData.append('body', this.input.body)
      delete this.$axios.defaults.headers.common['content-type']
      delete this.$axios.defaults.headers.post['content-type']
      this.$axios({
        method: 'POST',
        url: 'questions',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Question created successfully.',
          })
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data))
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
