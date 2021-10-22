<template>
  <div>
    <div class="">
      <!-- file upload modal -->
      <article
        aria-label="File Upload Modal"
        class="relative h-full flex flex-col bg-white shadow-xl rounded-md"
        ondrop="dropHandler(event);"
        ondragover="dragOverHandler(event);"
        ondragleave="dragLeaveHandler(event);"
        ondragenter="dragEnterHandler(event);"
      >
        <!-- overlay -->
        <div
          ref="overlay"
          class="
            w-full
            h-full
            absolute
            top-0
            left-0
            pointer-events-none
            z-50
            flex flex-col
            items-center
            justify-center
            rounded-md
          "
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
            class="
              border-dashed border-2 border-gray-400
              py-12
              flex flex-col
              justify-center
              items-center
            "
          >
            <p
              class="
                mb-3
                font-semibold
                text-gray-900
                flex flex-wrap
                justify-center
              "
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
              class="
                mt-2
                rounded-sm
                px-3
                py-1
                bg-gray-200
                hover:bg-gray-300
                focus:shadow-outline focus:outline-none
              "
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
              class="
                h-full
                w-full
                text-center
                flex flex-col
                items-center
                justify-center
              "
            >
              <img
                class="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span class="text-small text-gray-500">No files selected</span>
            </li>
            <li v-for="item in objectList" :key="item.objectURL">
              <ImagePreview v-if="item.isImage" :object-details="item"></ImagePreview>
              {{ item.message }}
            </li>
          </ul>
        </section>

        <!-- sticky footer -->
        <footer class="flex justify-end px-8 pb-8 pt-4">
          <button
            ref="submit"
            class="
              rounded-sm
              px-3
              py-1
              bg-blue-700
              hover:bg-blue-500
              text-white
              focus:shadow-outline focus:outline-none
            "
          >
            Upload now
          </button>
          <button
            ref="cancel"
            class="
              ml-3
              rounded-sm
              px-3
              py-1
              hover:bg-gray-300
              focus:shadow-outline focus:outline-none
            "
            @click="cancelClick"
          >
            Cancel
          </button>
        </footer>
      </article>
    </div>

    <!-- using two similar templates for simplicity in js code -->
    <div ref="fileTemplate">
      <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
        <article
          tabindex="0"
          class="
            group
            w-full
            h-full
            rounded-md
            focus:outline-none focus:shadow-outline
            elative
            bg-gray-100
            cursor-pointer
            relative
            shadow-sm
          "
        >
          <img
            alt="upload preview"
            class="
              img-preview
              hidden
              w-full
              h-full
              sticky
              object-cover
              rounded-md
              bg-fixed
            "
          />

          <section
            class="
              flex flex-col
              rounded-md
              text-xs
              break-words
              w-full
              h-full
              z-20
              absolute
              top-0
              py-2
              px-3
            "
          >
            <h1 class="flex-1 group-hover:text-blue-800"></h1>
            <div class="flex">
              <span class="p-1 text-blue-800">
                <i>
                  <svg
                    class="fill-current w-4 h-4 ml-auto pt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z"
                    />
                  </svg>
                </i>
              </span>
              <p class="p-1 size text-xs text-gray-700"></p>
              <button
                class="
                  delete
                  ml-auto
                  focus:outline-none
                  hover:bg-gray-300
                  p-1
                  rounded-md
                  text-gray-800
                "
              >
                <svg
                  class="pointer-events-none fill-current w-4 h-4 ml-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="pointer-events-none"
                    d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                  />
                </svg>
              </button>
            </div>
          </section>
        </article>
      </li>
    </div>
  </div>
</template>

<script>
import ImagePreview from '~/components/core-components/Uploads/ImagePreview.vue'
export default {
  components: {
    ImagePreview,
  },
  data() {
    return {
      empty: this.$refs.empty,
      gallery: this.$refs.gallery,
      FILES: [],
      objectList: [],
      counter: 0,
    }
  },
  methods: {
    addFile(target, file) {
      const imageTemplate = this.$refs.imageTemplate
      const fileTemplate = this.$refs.fileTemplate
      const isImage = file.type.match('image.*')
      const objectURL = URL.createObjectURL(file)

      console.log(`The element is ${fileTemplate}`)
      const clone = isImage
        ? imageTemplate.content.cloneNode(true)
        : fileTemplate.content.cloneNode(true)

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
      clone.querySelector('h1').textContent = file.name
      clone.querySelector('li').id = objectURL
      clone.querySelector('.delete').dataset.target = objectURL
      clone.querySelector('.size').textContent =
        file.size > 1024
          ? file.size > 1048576
            ? Math.round(file.size / 1048576) + 'mb'
            : Math.round(file.size / 1024) + 'kb'
          : file.size + 'b'

      isImage &&
        Object.assign(clone.querySelector('img'), {
          src: objectURL,
          alt: file.name,
        })

      this.empty.classList.add('hidden')
      target.prepend(clone)

      this.FILES[objectURL] = file
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
    hasFiles({ dataTransfer: { types = [] } }) {
      types.includes('Files')
    },
    // reset counter and append file to gallery when file is dropped
    dropHandler(ev) {
      ev.preventDefault()
      for (const file of ev.dataTransfer.files) {
        this.addFile(this.gallery, file)
        this.overlay.classList.remove('draggedover')
        this.counter = 0
      }
    },
    // only react to actual files being dragged
    dragEnterHandler(e) {
      e.preventDefault()
      if (!this.hasFiles(e)) {
        return
      }
      ++this.counter && this.overlay.classList.add('draggedover')
    },
    dragLeaveHandler(e) {
      --this.counter < 1 && this.overlay.classList.remove('draggedover')
    },
    dragOverHandler(e) {
      if (this.hasFiles(e)) {
        e.preventDefault()
      }
    },
    // event delegation to caputre delete events
    // fron the waste buckets in the file preview cards
    galleryClick(target) {
      if (target.classList.contains('delete')) {
        const ou = target.dataset.target
        document.getElementById(ou).remove(ou)
        this.gallery.children.length === 1 &&
          this.empty.classList.remove('hidden')
        delete this.FILES[ou]
      }
    },
    submit() {
      alert(`Submitted Files:\n${JSON.stringify(this.FILES)}`)
      console.log(this.FILES)
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
