<template>
  <div class="p-10">
    <div class="md:flex flex-row">
      <div class="flex-grow">
        <base-input v-model="subject" label="Enter subject"></base-input>
        <base-button @click="addSubject()">Add</base-button>
      </div>
      <div class="md:px-10 flex-grow">
        <base-label>Added Subjects</base-label>
        <p v-for="(item, index) in subjects" :key="item._id">
          {{ index + 1 }}. {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/core-components/BaseButton.vue'
import BaseInput from '~/components/core-components/Inputs/BaseInput.vue'
export default {
  components: { BaseInput, BaseButton },
  layout: 'ResponsiveDashboard',
  data() {
    return {
      subject: null,
      subjects: [],
    }
  },
  mounted() {
    this.getSubjects()
  },
  methods: {
    addSubject() {
      if (this.subject && this.subject.trim().length > 0) {
        this.$axios
          .post('/subjects', {
            name: this.subject,
          })
          .then((response) => {
            this.subjects.push(response.data)
            this.subject = null
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getSubjects() {
      this.$axios
        .get('/subjects')
        .then((response) => {
          this.subjects = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
