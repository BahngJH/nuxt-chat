<script setup lang="ts">

import { useWebSocket } from '@vueuse/core'

const localUrl = 'ws://localhost:3000/api/websocket';
const { status, data, send, open, close } = useWebSocket(localUrl)

const message = ref('')
const history = ref<string[]>([])

watch(data, (receiveMsg: string) => {
  history.value.push(`server: ${receiveMsg}`)
})

function sendMessage() {
  if (message.value == null || message.value === '') {
    return false
  }

  history.value.push(`client : ${message.value}`)
  send(message.value);
  message.value = '';
}

</script>

<template>
  <div>
    <h1>WebSocket - let's go</h1>
    <form @submit.prevent="sendMessage">
      <input v-model="message"/>
      <button type="submit">Send</button>
    </form>
    <div>
      <p v-for="entry in history">{{ entry }}</p>
    </div>
  </div>
</template>


<style scoped>

</style>