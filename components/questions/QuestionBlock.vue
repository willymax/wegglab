<template>
  <card>
    <div class="flex">
      <answer-user
        class="flex-1"
        :user="question.user"
        :timestamp="question.createdAt"
        :resource-link="`/questions/${question.slug}`"
      ></answer-user>
      <div>
        <BookmarkQuestion></BookmarkQuestion>
      </div>
    </div>
    <h1 class="text-2xl font-bold">{{ question.title }}</h1>
    <client-only>
      <span v-html="question.body"></span>
    </client-only>
    <div class="tags">
      <nuxt-link
        v-for="tag in question.tags"
        :key="tag.code"
        :to="{ name: 'questions-tagged-tag', params: { tag: tag.name } }"
        class="tag"
      >
        #{{ tag.name }}
      </nuxt-link>
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <ul class="list-none">
          <li v-for="file in question.files" :key="file._id">
            <a
              v-if="attachmentISImage(file.mimetype)"
              :href="$getImageUrl(file.path)"
              @click.prevent="$downloadItem(file.path)"
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
import BookmarkQuestion from './BookmarkQuestion.vue'
export default {
  components: { Card, AnswerUser, BookmarkQuestion },
  computed: {
    question() {
      return this.$store.getters['questions/GET_CURRENT_QUESTION']
    },
    getQuestionBody() {
      return this.$sanitizeHtml(this.question.body)
    },
  },
  methods: {
    attachmentISImage(fileType) {
      return fileType != null
    },
  },
}
</script>

<style lang="scss" scoped></style>
