<template>
  <div>
    <v-sheet class="bg-deep-purple pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
            @submit.prevent="login"
        >
          <v-text-field
              v-model="id"
              class="mb-2"
              label="id"
              clearable
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              clearable
          ></v-text-field>

          <br>

          <v-btn
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore()
const id = ref<string>('');
const password = ref<string>('');
const idInput = ref<HTMLInputElement | null>(null);

async function login() {
  if (id.value && password.value) {
    await authStore.login(id.value, password.value)

    if (authStore.userDetail) {
      alert("로그인되었습니다. " + authStore.userDetail.name + "님 환영합니다.")
      navigateTo('/')
    } else {
      id.value = ''
      password.value = ''
      alert("사용자 정보가 일치하지 않습니다.")

      // id로 포커스 이동
      idInput.value?.focus();
    }
  }
}

</script>

<style scoped></style>
