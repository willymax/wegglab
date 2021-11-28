<template>
  <with-right-side-bar>
    <div class="p-2">
      <!-- <base-select v-model="input.subject_id"></base-select> -->
      <select class="select select-bordered w-full max-w-xs">
        <option disabled="disabled" selected="selected">Choose Subject</option>
        <option
          v-for="subject in subjects"
          :key="subject.id"
          :value="subject.id"
        >
          {{ subject.name }}
        </option>
      </select>
      <validation-error :errors="apiValidationErrors.subject_id" />
      <base-input
        v-model="input.title"
        label="Title"
        placeholder="Enter Question Title"
      />
      <validation-error :errors="apiValidationErrors.title" />
      <base-text-area
        v-model="input.body"
        placeholder="Enter the description of your question."
      ></base-text-area>
      <validation-error :errors="apiValidationErrors.body" />
      <BaseFileUpload v-model="FILES"></BaseFileUpload>
      <validation-error :errors="apiValidationErrors.email" />
      <base-button @click="postQuestion()">Submit</base-button>
    </div>
  </with-right-side-bar>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
import formMixin from '@/mixins/form-mixin'
import WithRightSideBar from '~/components/Dashboard/WithRightSideBar.vue'
import BaseTextArea from '~/components/core-components/Inputs/BaseTextArea.vue'
import BaseSelect from '~/components/core-components/Inputs/BaseSelect.vue'
export default {
  components: {
    BaseFileUpload,
    BaseButton,
    WithRightSideBar,
    BaseTextArea,
    BaseSelect,
  },
  mixins: [formMixin],
  layout: 'DashboardLayout',
  data() {
    return {
      FILES: {},
      input: {
        title: 'The title',
        body: 'The body',
        subject_id: null,
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
      formData.append('subject_id', this.input.subject_id)
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
