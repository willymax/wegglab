<template>
  <div class="flex flex-shrink-0 p-4 pb-0 pl-0">
    <nuxt-link :to="`/users/${user.id}`" class="flex-shrink-0 group block">
      <div class="flex items-center">
        <div>
          <img
            class="inline-block h-10 w-10 rounded-full"
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
            alt=""
          />
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
export default {
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
