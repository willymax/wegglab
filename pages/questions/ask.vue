<template>
  <with-right-side-bar>
    <div class="p-2">
      <base-select
        v-model="input.subject"
        :options="subjects"
        value-key="name"
        key-key="_id"
        text-key="name"
        label="Select Subject"
      ></base-select>
      <!-- <multiselect
        v-model="selected"
        :options="options"
        :close-on-select="true"
        :clear-on-select="false"
        placeholder="Select one"
        lable="name"
        track-by="name"
      >
      </multiselect> -->
      <validation-error :errors="apiValidationErrors.subject" />
      <base-input
        v-model="input.title"
        label="Title"
        placeholder="Enter Question Title"
      />
      <validation-error :errors="apiValidationErrors.title" />
      <base-label>Add Question Tags</base-label>
      <multiselect
        v-model="input.tags"
        :options="taggingOptions"
        :multiple="true"
        :taggable="true"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search or add tag"
        label="name"
        track-by="code"
        @tag="addTag"
      >
      </multiselect>
      <div class="my-2">
        <editor
          v-model="input.body"
          api-key="fwx0vscmsecgg5by0rvm6xbfpbvdruc2nlbxc478ogqam3tk"
          :init="$initializeEditor(config)"
        >
        </editor>
      </div>
      <validation-error :errors="apiValidationErrors.body" />
      <BaseFileUpload v-model="FILES"></BaseFileUpload>
      <validation-error :errors="apiValidationErrors.email" />
      <base-button @click="postQuestion()">Submit</base-button>
    </div>
  </with-right-side-bar>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Multiselect from 'vue-multiselect'
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import formMixin from '@/mixins/form-mixin'
import WithRightSideBar from '~/components/Dashboard/WithRightSideBar.vue'
import BaseTextArea from '~/components/core-components/Inputs/BaseTextArea.vue'
import BaseSelect from '~/components/core-components/Inputs/BaseSelect.vue'
import BaseLabel from '~/components/core-components/BaseLabel.vue'
export default {
  components: {
    BaseFileUpload,
    BaseButton,
    WithRightSideBar,
    BaseTextArea,
    BaseSelect,
    Multiselect,
    Editor,
    BaseLabel,
  },
  mixins: [formMixin],
  layout: 'ResponsiveDashboard',
  data() {
    return {
      selected: null,
      options: ['list', 'of', 'options'],
      FILES: {},
      taggingOptions: [],
      input: {
        title: '',
        body: '',
        subject: null,
        tags: [],
      },
      config: {
        uploadUrl: 'questions/uploadQuestionImage',
        placeholderText: 'Type your question here',
        uploadKey: 'questionFile',
        imageStorageUrl: process.env.baseStorageUrl,
      },
    }
  },
  async fetch() {
    const res = await this.$axios.get(`subjects`)
    const subjects = res.data.data

    await this.$store.dispatch('questions/SET_SUBJECTS', subjects)
  },
  computed: {
    subjects() {
      return this.$store.getters['questions/GET_SUBJECTS']
    },
  },
  watch: {
    FILES(newValue, oldValue) {},
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.taggingOptions.push(tag)
      this.input.tags.push(tag)
    },
    postQuestion() {
      const formData = new FormData()
      const questionFiles = []
      let counter = 0
      for (const [index, file] of Object.entries(this.FILES)) {
        formData.append(`questionFiles[${counter}]`, file)
        counter++
      }
      formData.append('title', this.input.title)
      formData.append('subject', this.input.subject)
      formData.append('body', this.input.body)
      formData.append(
        'tags',
        JSON.stringify(
          this.input.tags.map((item) => {
            return item.name
          })
        )
      )
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
          this.$router.push('/questions')
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
