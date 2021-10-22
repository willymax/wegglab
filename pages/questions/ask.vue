<template>
  <div>
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
    <BaseFileUpload></BaseFileUpload>
    <button
      class="btn btn-primary btn-xs md:btn-sm lg:btn-md xl:btn-lg"
      @click="postQuestion()"
    >
      Post
    </button>
  </div>
</template>

<script>
import BaseFileUpload from '~/components/core-components/BaseFileUpload.vue'
export default {
  components: {
    BaseFileUpload,
  },
  layout: 'DashboardLayout',
  methods: {
    postQuestion() {},
  },
}
</script>

<style lang="scss" scoped></style>
