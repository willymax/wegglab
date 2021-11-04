<template>
  <card>
    <answer-user
      :user="answer.user"
      :timestamp="answer.created_at"
    ></answer-user>
    <div>
      <h2>{{ answer.body }}</h2>
    </div>
    <div class="md:flex-shrink pr-6 pt-3">
      <div>
        <ul class="list-none">
          <li v-for="(file, index) in answer.files" :key="file.id">
            <a
              :href="$getImageUrl(file.file_url)"
              @click.prevent="downloadItem(file.file_url)"
            >
              <span class="text-xl"
                ><img src="~assets/document.svg" class="inline" />
                {{ file.name }}</span
              >

              <!-- <img
                class="object-contain h-48"
                :src="$getImageUrl(file.file_url)"
            /> -->
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
}
</script>

<style lang="scss" scoped></style>
