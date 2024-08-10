<template>
    <div class="pt-10 px-10 pb-5">
        <div style="text-align: -webkit-right;">
            <button id="dropdownPerfilButton" data-dropdown-toggle="dropdownPerfil"
                class="flex items-center pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500"
                type="button">
                <span class="sr-only">Open user menu</span>
                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                        clip-rule="evenodd" />
                </svg>

                <span class="ms-2 text-white">{{ getUsername }}</span>
                <svg class="w-2.5 h-2.5 ms-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </button>
        </div>

        <!-- Dropdown menu -->
        <div id="dropdownPerfil"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div class="px-4 py-3 text-gray-900 dark:text-white">
                <div class="font-medium ">{{ getUsername }}</div>
                <div class="truncate">{{ getEmail }}</div>
            </div>
            <div class="py-2">
                <a href="#" @click="logout"
                    class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                    </svg>

                    Sair
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { Dropdown } from 'flowbite';
import { useUserStore } from '../Store/UserStore';
import { useAuthStore } from '../Store/AuthStore';
export default {
    data(){
        return{
            user: useUserStore(),
            auth: useAuthStore()
        }
    },
    computed: {
        getUsername() {
            return this.user.$state.nome
        },
        getEmail() {
            return this.user.$state.email
        }
    },
    mounted() {
        const $targetEl = document.getElementById('dropdownPerfil');

        const $triggerEl = document.getElementById('dropdownPerfilButton');

        const options = {
            placement: 'bottom',
            triggerType: 'click',
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300,
            ignoreClickOutsideClass: false
        };

        // instance options object
        const instanceOptions = {
            id: 'dropdownMenu',
            override: true
        };
        const dropdown = new Dropdown($targetEl, $triggerEl, options, instanceOptions);
    },
    methods: {
        logout() {
            this.auth.logout().then(() => {
                localStorage.clear()
                this.user.setNome('')
                this.user.setEmail('')
                this.$router.replace({ name: 'login' })
            }).catch(error => {
                this.$root.$refs.toast.addMessage(error.response.data.message, 'error', 3000)
            })
        }
    }
}
</script>
