<template>
  <div class="flex flex-shrink-0">
    <div class="flex items-center">
      <div class="h-10 w-10">
        <nuxt-link :to="`/users/${user.id}`" class="flex-shrink-0 group block">
          <base-avatar
            :user-avatar="user.avatar"
            dimensions-classes="h-10 w-10"
            img-classes="rounded-full"
          ></base-avatar>
        </nuxt-link>
      </div>
      <div class="ml-3">
        <p class="text-base leading-6 font-medium">
          <nuxt-link
            :to="`/users/${user.id}`"
            class="flex-shrink-0 group block"
          >
            <span>{{ user.first_name }} {{ user.last_name }}</span>
          </nuxt-link>
        </p>
        <p>
          <span
            class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150"
          >
            <nuxt-link :to="resourceLink" class="flex-shrink-0 group block">
              <span>{{ $processTime(timestamp) }}</span>
            </nuxt-link>
          </span>
        </p>
      </div>
    </div>
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
    resourceLink: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
