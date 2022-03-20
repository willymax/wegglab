<template>
  <card>
    <answer-user
      :user="question.user"
      :timestamp="question.createdAt"
    ></answer-user>
    <h1 class="text-2xl font-bold">{{ question.title }}</h1>
    <p class="">{{ question.body }}</p>
    <div class="tags">
      <nuxt-link
        v-for="tag in question.tag_list"
        :key="tag"
        :to="{ name: 't-tag', params: { tag } }"
        class="tag"
      >
        #{{ tag }}
      </nuxt-link>
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <ul class="list-none">
          <li v-for="(file, index) in question.files" :key="file._id">
            <a
              v-if="attachmentISImage(file.file_type)"
              :href="$getImageUrl(file.file_url)"
              @click.prevent="downloadItem(file.file_url)"
            >
              <span class="text-xl"
                ><img src="~assets/document.svg" class="inline" />
                {{ file.name }}</span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </card>
</template>

<script>
import AnswerUser from '../answers/AnswerUser.vue'
import Card from '../core-components/Cards/Card.vue'
export default {
  components: { Card, AnswerUser },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
  },
  methods: {
    attachmentISImage(fileType) {
      return fileType != null
    },
    downloadItem(fileUrl) {
      this.$axios(`files/download/?fileUrl=${fileUrl}`, {
        responseType: 'blob',
      })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: response.headers['content-type'],
          })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileUrl
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch(console.error)
    },
  },
}
</script>

<style lang="scss" scoped></style>
