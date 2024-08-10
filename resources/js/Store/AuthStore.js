import { defineStore } from 'pinia'
import { useHttpStore } from './HttpStore'

export const useAuthStore = defineStore('auth', {
    actions: {
        logout() {
            return new Promise((resolve, reject) => {
                let http = useHttpStore()

                http.httpRequest(
                    'POST',
                    '/api/logout',
                    {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    },
                    {},
                    true
                ).then(() => {
                    resolve()
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
})
