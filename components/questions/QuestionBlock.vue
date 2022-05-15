<template>
  <card class="">
    <div class="flex">
      <answer-user
        class="flex-1"
        :user="question.user"
        :timestamp="question.createdAt"
        :resource-link="`/questions/${question.slug}`"
      ></answer-user>
      <div>
        <div class="flex items-center">
          <BookmarkQuestion></BookmarkQuestion>
        </div>
      </div>
    </div>
    <h1 class="text-2xl font-bold">{{ question.title }}</h1>
    <client-only>
      <span v-html="question.body"></span>
    </client-only>
    <div class="tags">
      <nuxt-link
        v-for="tag in question.tags"
        :key="tag"
        :to="{ name: 'questions-tagged-tag', params: { tag: tag } }"
        class="tag"
      >
        #{{ tag }}
      </nuxt-link>
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <span>
          <a
            v-for="file in question.files"
            :key="file._id"
            :href="$getImageUrl(file.path)"
            @click.prevent="$downloadItem(file.path)"
          >
            <span class="text-xl"
              ><img src="~assets/document.svg" class="inline" />
              {{ file.originalname }}</span
            >
          </a>
        </span>
        <ul class="list-none">
          <li></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-row-reverse">
      <question-share></question-share>
    </div>
  </card>
</template>

<script>
import AnswerUser from '../answers/AnswerUser.vue'
import Card from '../core-components/Cards/Card.vue'
import BookmarkQuestion from './BookmarkQuestion.vue'
import QuestionShare from './QuestionShare.vue'
export default {
  components: { Card, AnswerUser, BookmarkQuestion, QuestionShare },
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
