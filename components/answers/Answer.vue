<template>
  <card>
    <answer-user
      :user="answer.user"
      :timestamp="answer.createdAt"
    ></answer-user>
    <div>
      <h2>{{ answer.body }}</h2>
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <ul class="list-none">
          <li v-for="(file, index) in answer.files" :key="file._id">
            <a
              :href="$getImageUrl(file.path)"
              @click.prevent="downloadItem(file.path)"
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
import Card from '../core-components/Cards/Card.vue'
import AnswerUser from './AnswerUser.vue'
export default {
  components: { Card, AnswerUser },
  props: {
    answer: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
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
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
  },
}
</script>

<style scoped></style>
