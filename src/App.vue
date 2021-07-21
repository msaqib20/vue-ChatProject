<template>
  <Nav />
  <Chat />
</template>

<script>
import Nav from '@/components/Header.vue'
import Chat from '@/components/Chat.vue'

export default {
  name: 'App',
  components: { Nav, Chat }
}
</script>
