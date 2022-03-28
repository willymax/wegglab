<template>
  <card>
    <answer-user
      :user="answer.user"
      :timestamp="answer.createdAt"
    ></answer-user>
    <div>
      <span v-html="answer.body"></span>
      <!-- {{ $sanitizeHtml(answer.body) }} -->
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <ul class="list-none">
          <li v-for="file in answer.files" :key="file._id">
            <a
              :href="$getImageUrl(file.path)"
              @click.prevent="$downloadAnswerImage(file.path)"
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
  computed: {},
  methods: {},
}
</script>

<style scoped></style>
