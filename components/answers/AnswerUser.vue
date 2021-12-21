<template>
  <div class="flex flex-shrink-0 p-4 pb-0 pl-0">
    <nuxt-link :to="`/users/${user.id}`" class="flex-shrink-0 group block">
      <div class="flex items-center">
        <div class="h-10 w-10">
          <base-avatar
            :user-avatar="user.avatar"
            dimensions-classes="h-10 w-10"
            img-classes="rounded-full"
          ></base-avatar>
        </div>
        <div class="ml-3">
          <p class="text-base leading-6 font-medium">
            <span>{{ user.first_name }} {{ user.last_name }}</span>
          </p>
          <p>
            <span
              class="
                text-sm
                leading-5
                font-medium
                text-gray-400
                group-hover:text-gray-300
                transition
                ease-in-out
                duration-150
              "
            >
              {{ $processTime(timestamp) }}
            </span>
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import BaseAvatar from '../core-components/BaseAvatar.vue'
export default {
  components: { BaseAvatar },
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
    timestamp: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
