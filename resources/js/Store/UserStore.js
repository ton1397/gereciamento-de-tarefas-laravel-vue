import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        nome: '',
        email: ''
    }),
    actions: {
        setNome(nome) {
            this.nome = nome
        },

        setEmail(email) {
            this.email = email
        }
    }
})
