<template>
  <div>
    <div class="">
      <!-- file upload modal -->
      <article
        aria-label="File Upload Modal"
        class="relative h-full flex flex-col bg-white shadow-xl rounded-md"
        @drop="dropHandler"
        @dragover="dragOverHandler"
        @dragleave="dragLeaveHandler"
        @dragenter="dragEnterHandler"
      >
        <!-- overlay -->
        <div
          id="overlay"
          ref="overlay"
          class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
          :class="{ draggedover: draggedover }"
        >
          <i>
            <svg
              class="fill-current w-12 h-12 mb-3 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"
              />
            </svg>
          </i>
          <p class="text-lg text-blue-700">Drop files to upload</p>
        </div>

        <!-- scroll area -->
        <section class="h-full overflow-auto p-8 w-full flex flex-col">
          <header
            class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
          >
            <p
              class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center"
            >
              <span>Drag and drop your</span>&nbsp;<span
                >files anywhere or</span
              >
            </p>
            <input
              ref="hiddenInput"
              type="file"
              multiple
              class="hidden"
              @change="fileSelection"
            />
            <button
              ref="button"
              class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              @click="uploadAFile"
            >
              Upload a file
            </button>
          </header>
          <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>
          <ul
            ref="gallery"
            class="flex flex-1 flex-wrap -m-1"
            @click="galleryClick"
          >
            <li
              ref="empty"
              class="h-full w-full text-center flex flex-col items-center justify-center"
              :class="{ hidden: objectList.length > 0 }"
            >
              <img
                class="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span class="text-small text-gray-500">No files selected</span>
            </li>
            <span
              v-for="item in objectList"
              :key="item.objectURL"
              class="inline"
            >
              <ImagePreview
                v-if="item.isImage"
                :object-details="item"
              ></ImagePreview>
              <FilePreview v-else :object-details="item"></FilePreview>
              {{ item.fileName }}
            </span>
          </ul>
        </section>

        <!-- sticky footer -->
        <footer class="flex justify-end px-8 pb-8 pt-4"></footer>
      </article>
    </div>
  </div>
</template>

<script>
import ImagePreview from '~/components/core-components/Uploads/ImagePreview.vue'
import FilePreview from '~/components/core-components/Uploads/FilePreview.vue'
export default {
  components: {
    ImagePreview,
    FilePreview,
  },
  data() {
    return {
      empty: this.$refs.empty,
      gallery: this.$refs.gallery,
      FILES: {},
      objectList: [],
      counter: 0,
      draggedover: false,
    }
  },
  computed: {
    GUEST_QUESTION() {
      return this.$store.getters['questions/GET_GUEST_QUESTION'] || {}
    },
  },
  watch: {
    FILES: {
      handler(val, oldVal) {},
      deep: true,
    },
  },
  created() {
    this.FILES = this.GUEST_QUESTION?.fileUploadDetails?.FILES || {}
    this.objectList = this.GUEST_QUESTION?.fileUploadDetails?.objectList || []
  },
  methods: {
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
      this.objectList.push(fileDetails)
      // this.empty.classList.add('hidden')
      // target.prepend(clone)

      this.FILES[objectURL] = file

      this.$emit('input', { FILES: this.FILES, objectList: this.objectList })
    },
    uploadAFile(event) {
      const hiddenInput = this.$refs.hiddenInput
      hiddenInput.click()
    },
    fileSelection(e) {
      for (const file of e.target.files) {
        this.addFile(this.gallery, file)
      }
    },
    hasFiles(e) {
      const dt = e.dataTransfer
      if (
        dt.types &&
        (dt.types.indexOf
          ? dt.types.includes('Files')
          : dt.types.contains('Files'))
      ) {
        return true
      }
      return false
    },
    // reset counter and append file to gallery when file is dropped
    dropHandler(ev) {
      ev.preventDefault()
      for (const file of ev.dataTransfer.files) {
        this.addFile(this.gallery, file)
        this.draggedover = false
        this.counter = 0
      }
    },
    // only react to actual files being dragged
    dragEnterHandler(e) {
      e.preventDefault()
      if (!this.hasFiles(e)) {
        return
      }
      if (++this.counter) {
        this.draggedover = true
      }
    },
    dragLeaveHandler(e) {
      if (--this.counter < 1) {
        this.draggedover = false
      }
    },
    dragOverHandler(e) {
      if (this.hasFiles(e)) {
        e.preventDefault()
      }
    },
    // event delegation to caputre delete events
    // fron the waste buckets in the file preview cards
    galleryClick(event) {
      if (event.target.classList.contains('delete')) {
        const ou = event.target.dataset.target
        this.objectList = this.objectList.filter(function (el) {
          return el.objectURL !== ou
        })
        delete this.FILES[ou]
        this.$emit('input', { FILES: this.FILES, objectList: this.objectList })
      }
    },
    submit() {
      alert(`Submitted Files:\n${JSON.stringify(this.FILES)}`)
    },
    // clear entire selection
    cancelClick() {
      while (this.gallery.children.length > 0) {
        this.gallery.lastChild.remove()
      }
      this.FILES = {}
      this.empty.classList.remove('hidden')
      this.gallery.append(this.empty)
    },
  },
}
</script>

<style scoped>
.hasImage:hover section {
  background-color: rgba(5, 5, 5, 0.4);
}
.hasImage:hover button:hover {
  background: rgba(5, 5, 5, 0.45);
}

#overlay p,
i {
  opacity: 0;
}

#overlay.draggedover {
  background-color: rgba(255, 255, 255, 0.7);
}
#overlay.draggedover p,
#overlay.draggedover i {
  opacity: 1;
}

.group:hover .group-hover\:text-blue-800 {
  color: #2b6cb0;
}
</style>
