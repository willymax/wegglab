<template>
  <div tabindex="0" class="dropdown-wrapper my-auto" @focusout="hideMenu">
    <div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
      <img
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        class="object-cover w-full h-full transition duration-300"
        alt="avatar"
        @click="show = !show"
      />
    </div>
    <transition :name="animation">
      <div
        v-if="show"
        :class="'bg-' + color + '-500'"
        tabindex="0"
        class="
          dropdown-menu
          mt-1
          rounded
          absolute
          z-10
          shadow-lg
          w-40
          max-w-xs
          right-0
        "
      >
        <ul class="list-none overflow-hidden rounded">
          <li v-for="option in options" :key="option.id" class="text-white">
            <nuxt-link
              :to="option.url"
              class="flex py-2 px-4 transition duration-300"
              :class="'theme-' + color"
              >{{ option.name }}</nuxt-link
            >
          </li>
          <li>
            <logout></logout>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Logout from './Logout.vue'
export default {
  components: { Logout },
  props: {
    color: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      options: [{ name: 'Account settings', url: '/profile', id: 1 }],
    }
  },
  methods: {
    hideMenu() {
      if (this.show) {
        // this.show = false
      }
    },
  },
}
</script>

<style>
button {
  cursor: pointer;
}
button:focus {
  outline: none;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Slide-in-up animation*/
.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.5s;
  transform: translateY(0);
}
.slide-in-up-enter,
.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Slide-in-right animation*/
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}
.slide-in-right-enter,
.slide-in-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Slide-in-left animation*/
.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: all 0.5s;
  transform: translateX(0);
}
.slide-in-left-enter,
.slide-in-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Scale animation*/
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
  transform: scale(1);
}
.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* Rotate animation*/
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s;
  transform: scale(1) rotate(-360deg);
}
.rotate-enter,
.rotate-leave-to {
  opacity: 0;
  transform: scale(0) rotate(360deg);
}
</style>
