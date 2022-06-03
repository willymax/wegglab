<template>
  <span>
    <article
      tabindex="0"
      class="group hasImage w-full h-full min-w-full rounded-md focus:outline-none bg-gray-100 cursor-pointer relative text-transparent hover:text-black hover:bg-blend-darken shadow-sm"
    >
      <img
        :alt="objectDetails.fileName"
        class="img-preview sticky rounded-md bg-fixed object-cover h-full w-full"
        :src="objectDetails.objectURL"
      />

      <section
        class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3"
      >
        <h1 class="flex-1">{{ objectDetails.fileName }}</h1>
        <div class="flex">
          <span class="p-1">
            <i>
              <svg
                class="fill-current w-4 h-4 ml-auto pt-"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"
                />
              </svg>
            </i>
          </span>

          <p class="p-1 size text-xs">{{ objectDetails.size }}</p>
          <button
            class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
            :data-target="objectDetails.objectURL"
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
    <h6 class="text-sm break-all">{{ objectDetails.fileName }}</h6>
  </span>
</template>

<script>
export default {
  props: {
    objectDetails: {
      type: Object,
      default() {
        return {}
      },
    },
    fileName: {
      type: String,
      default: 'File name',
    },
    objectURL: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
