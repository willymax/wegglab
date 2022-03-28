<template>
  <card>
    <answer-user
      :user="question.user"
      :timestamp="question.createdAt"
      :resource-link="`/questions/${question.slug}`"
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
          <li v-for="file in question.files" :key="file._id">
            {{ file.mimetype }} {{ file.path }}
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
  },
}
</script>

<style lang="scss" scoped></style>
