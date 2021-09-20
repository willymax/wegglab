<template>
  <div class="" :data="backgroundColor">
    <div ref="sidebarScrollArea" class="">
      <div class="flex flex-col items-center mt-6 -mx-2">
        <img
          class="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <h4
          class="
            mx-2
            mt-2
            font-medium
            text-gray-800
            dark:text-gray-200
            hover:underline
          "
        >
          John Doe
        </h4>
        <p
          class="
            mx-2
            mt-1
            text-sm
            font-medium
            text-gray-600
            dark:text-gray-400
            hover:underline
          "
        >
          john@example.com
        </p>
      </div>
      <slot></slot>
      <div class="">
        <ul class="">
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index) in link.children"
                :key="subLink.name + index"
                :link="subLink"
              >
              </sidebar-item>
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  provide() {
    return {
      autoClose: this.autoClose,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
      description: 'Sidebar title',
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title',
    },
    logo: {
      type: String,
      default: '/img/brand/green.png',
      description: 'Sidebar app logo',
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary',
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these.",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  methods: {
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    },
  },
}
</script>
