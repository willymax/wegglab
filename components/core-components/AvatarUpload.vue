<template>
  <div>
    <input
      ref="hiddenInput"
      type="file"
      class="hidden"
      @change="fileSelection"
    />
    <base-button @click="uploadAFile">Upload New Avatar</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  data() {
    return {
      FILES: {},
    }
  },
  methods: {
    uploadAFile(event) {
      const hiddenInput = this.$refs.hiddenInput
      hiddenInput.click()
    },
    fileSelection(e) {
      for (const file of e.target.files) {
        this.addFile(this.gallery, file)
      }
    },
    addFile(target, file) {
      const isImage = file.type.match('image.*')
      const objectURL = URL.createObjectURL(file)

      const fileDetails = {
        fileName: file.name,
        objectURL,
        isImage,
        size:
          file.size > 1024
            ? file.size > 1048576
              ? Math.round(file.size / 1048576) + 'mb'
              : Math.round(file.size / 1024) + 'kb'
            : file.size + 'b',
      }
      this.$emit('input', file)
    },
  },
}
</script>

<style lang="scss" scoped></style>
