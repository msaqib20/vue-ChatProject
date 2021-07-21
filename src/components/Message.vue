<template>
  <div class="message  ">
    <span class="flex mb-1" :class="sender ? 'flex-row-reverse mr-11'  : ''">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <Avatar class="mt-1" :src="photoUrl" />
      <div class="text w-3/4" :class="sender ? 'bg-gray-100' : 'bg-gray-100'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './icons/Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>
