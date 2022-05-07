<template>
  <div class="p-10">
    <div class="md:flex flex-row">
      <div class="flex-grow">
        <base-input
          v-model="subject"
          label="Enter subject"
          @keydown.enter="addSubject()"
        ></base-input>
        <base-button @click="addSubject()">Add Subject</base-button>
      </div>
      <div class="md:px-10 flex-grow">
        <div>
          <base-label>Added Subjects</base-label>
          <div v-for="(item, index) in subjects" :key="item._id" class="flex">
            <p class="flex-1">{{ index + 1 }}. {{ item.name }}</p>
            <a
              type="text"
              class="table-action table-action-delete flex-1"
              data-toggle="tooltip"
              style="cursor: pointer"
              @click="deleteSubject(index, item._id)"
            >
              <i class="fas fa-trash"></i>
            </a>
          </div>
        </div>
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
    async deleteSubject(index, id) {
      try {
        await this.$axios.delete(`/subjects/${id}`)
        this.subjects.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
