<script setup lang="ts">

import { useWebSocket } from '@vueuse/core'
import {useAuthStore} from "@/stores/authStore";
const authStore = useAuthStore()
if (!authStore.userDetail) {
  navigateTo('/Login')
}

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

  history.value.push(`${authStore.userDetail?.name}: ${message.value}`)
  send(message.value);

  clearMessage();
}

function clearMessage() {
  message.value = ''
}

</script>

<template>
  <div>
    <h1>WebSocket - let's go</h1>
    <div>
      <p v-for="entry in history">{{ entry }}</p>
    </div>
      <v-form @submit.prevent="sendMessage">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="message"
                  append-icon="mdi-send"
                  clear-icon="mdi-close-circle"
                  label="Message"
                  type="text"
                  variant="filled"
                  clearable
                  @click:append="sendMessage"
                  @click:clear="clearMessage"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
  </div>
</template>