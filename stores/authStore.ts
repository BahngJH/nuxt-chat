import { defineStore } from 'pinia'
import { useFetch } from "@vueuse/core";

export const useAuthStore = defineStore('authStore', () => {
    interface User {
        id: string,
        name: string,
    }

    const userDetail = ref<User | null>()

    function clear() {
        userDetail.value = null;
    }

    async function login(id: string, password: string) {
        const {data, error} = await useFetch("/api/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, password})
        })

        if (typeof data.value === "string") {
            const result = JSON.parse(data.value)

            if (result.data != null) {
                userDetail.value = {
                    id: result.data.id,
                    name: result.data.name
                }
            } else {
                clear();
            }
        }
    }

    return { userDetail, clear, login}
})

