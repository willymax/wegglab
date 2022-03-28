<template>
  <div class="flex flex-col space-y-4">
    <!-- <textarea
      v-model=""
      class="form-control mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      rows="3"
      placeholder="Enter the description of your question"
    ></textarea> -->
    <froala
      id="edit"
      v-model="input.body"
      :tag="'textarea'"
      :config="getFroalaConfig()"
    ></froala>
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
      textModel: 'Edit Your Content Here!',
    }
  },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  methods: {
    getFroalaConfig() {
      const that = this
      return {
        charCounterCount: true,
        placeholderText: 'Edit Your Content Here!',
        imageUpload: true,
        imageDefaultAlign: 'left',
        imageDefaultDisplay: 'inline-block',
        // Set the image upload parameter.
        imageUploadParam: 'image_param',

        // Set the image upload URL.
        imageUploadURL:
          'http://localhost:3003/v1/questions/uploadQuestionImages',

        // Additional upload params.
        imageUploadParams: { id: 'my_editor' },

        // Set request type.
        imageUploadMethod: 'POST',

        // Set max image size to 5MB.
        imageMaxSize: 5 * 1024 * 1024,

        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
          'image.beforeUpload'(images) {
            // Before image is uploaded
            const data = new FormData()
            data.append('files', images[0])
            that.$axios
              .post('questions/uploadQuestionImages', data, {
                headers: {
                  accept: 'application/json',
                  // Authorization: 'your_imgur_client_id/api_key',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },
              })
              .then((res) => {
                console.log(`${process.env.baseStorageUrl}/${res.data.link}`)
                this.image.insert(
                  `${process.env.baseStorageUrl}/${res.data.link}`,
                  null,
                  null,
                  this.image.get()
                )
              })
              .catch((err) => {
                console.log(err)
              })
            return false
          },
          initialized() {
            console.log('initialized')
          },
        },
      }
    },
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
