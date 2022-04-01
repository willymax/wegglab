<template>
  <div class="flex flex-col space-y-4">
    <!-- <textarea
      v-model=""
      class="form-control mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      rows="3"
      placeholder="Enter the description of your question"
    ></textarea> -->
    <div class="my-2">
      <editor
        v-model="input.body"
        api-key="fwx0vscmsecgg5by0rvm6xbfpbvdruc2nlbxc478ogqam3tk"
        :init="$initializeEditor(config)"
      >
      </editor>
    </div>
    <validation-error :errors="apiValidationErrors.body" />
    <base-file-upload v-model="FILES"></base-file-upload>
    <validation-error :errors="apiValidationErrors.email" />
    <base-button @click="postAnswer()">Submit</base-button>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import BaseButton from '../core-components/BaseButton.vue'
import BaseFileUpload from '../core-components/BaseFileUpload.vue'
import ValidationError from '../ValidationError.vue'
import formMixin from '@/mixins/form-mixin'

export default {
  components: { BaseFileUpload, ValidationError, BaseButton, Editor },
  mixins: [formMixin],
  data() {
    return {
      FILES: {},
      input: {
        body: '',
      },
      config: {
        uploadUrl: 'answers/uploadAnswerImage',
        placeholderText: 'Type your answer here',
        uploadKey: 'answerFile',
        imageStorageUrl: `${process.env.apiBaseUrl}/files`,
      },
      textModel: 'Edit Your Content Here!',
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
      const files = []
      let counter = 0
      for (const [index, file] of Object.entries(this.FILES)) {
        formData.append(`files`, file)
        counter++
      }
      // formData.append('title', this.input.title)
      formData.append('body', this.input.body)
      formData.append('question_id', this.question._id)
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
          this.$store.commit('questions/ADD_QUESTION_ANSWERS', response.data)
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
