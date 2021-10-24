<template>
  <div class="p-2">
    <select class="select select-bordered w-full max-w-xs">
      <option disabled="disabled" selected="selected">Choose Category</option>
      <option>Mathematics</option>
      <option>Physcis</option>
      <option>Science</option>
    </select>
    <textarea
      class="form-textarea mt-1 block w-full p-2"
      rows="3"
      placeholder="Enter the description of your question."
    ></textarea>
    <BaseFileUpload v-model="FILES"></BaseFileUpload>
    <base-button @click="postQuestion()">Submit</base-button>
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
export default {
  components: {
    BaseFileUpload,
    BaseButton,
  },
  layout: 'DashboardLayout',
  data() {
    return {
      FILES: {},
    }
  },
  watch: {
    FILES(newValue, oldValue) {},
  },
  methods: {
    postQuestion() {
      const formData = new FormData()
      for (const key in this.FILES) {
        const file = this.FILES[key]
        formData.append(file.name, file)
      }
      this.$axios.post('questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
