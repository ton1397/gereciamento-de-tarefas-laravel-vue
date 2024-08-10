<template>
<div id="task-modal" tabindex="-1" aria-hidden="true" class="hidden animate__animated animate__faster overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-slate-700 rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-white">
                    {{ id == 0 ? 'Criar tarefa' : modal?.titulo }}
                </h3>
                <button type="button" @click="$emit('closeModal')" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="task-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
                <form class="space-y-4" @submit.prevent="submit">
                    <div class="mb-5">
                        <label for="titulo" class="block mb-2 text-sm font-medium text-white">Titulo</label>
                        <input type="text" id="titulo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo" required v-model="titulo" />
                    </div>
                    <div class="mb-5">
                        <label for="descricao" class="block mb-2 text-sm font-medium text-white">Descricao</label>
                        <textarea rows="4" type="text" id="descricao" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descricao" required v-model="descricao">
                        </textarea>
                    </div>
                    <div class="mb-5">
                        <label for="countries" class="block mb-2 text-sm font-medium text-white">Select an option</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required v-model="status">
                            <option value="" selected>Selecione</option>
                            <option value="a_fazer">A fazer</option>
                            <option value="em_andamento">Fazendo</option>
                            <option value="feito">Feito</option>
                        </select>
                    </div>
                    <div class="text-center mb-5" role="status" v-if="processing">
                        <svg aria-hidden="true" class="inline w-8 h-8 bg-slate-700 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="text-center mb-5" v-else>
                        <button type="submit" class="bg-gradient-to-b from-red-500 to-red-600 py-2 px-12 text-white font-bold text-lg rounded">{{ id == 0 ? 'Cadastrar' : 'Atualizar' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    emits: ['closeModal'],
    props: {
        modal: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            id: 0,
            titulo: '',
            descricao: '',
            status: '',
            processing: false
        }
    },
    watch: {
        modal: {
            handler: function (newValue) {
                this.id = newValue?.id || 0
                this.titulo = newValue?.titulo || ''
                this.descricao = newValue?.descricao || ''
                this.status = newValue?.status || ''
            },
            deep: true
        }
    },
    methods: {
        submit() {
            this.processing = true
            this.$http.httpRequest(
                this.id == 0 ? 'POST' : 'PUT',
                this.id == 0 ? '/api/task' : '/api/tasks/' + this.id,
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                {
                    'titulo': this.titulo,
                    'descricao': this.descricao,
                    'status': this.status
                }
            ).then(response => {
                this.$emit('closeModal', true)
            }).catch(error => {
                console.log(error)
                this.$emit('closeModal', false)
                this.$root.$refs.toast.addMessage('Erro ao salvar dados da tarefa. Tente novamente', 'error', 3000)
            }).finally(() => {
                this.processing = false
            })
        },
        closeModal() {
            this.$emit('closeModal')
        }
    }
}

</script>


