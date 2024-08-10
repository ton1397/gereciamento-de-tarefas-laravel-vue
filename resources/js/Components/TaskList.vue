<template>
    <div :class="classes"  @drop.prevent="onDrop" @dragenter.prevent @dragover.prevent>
        <div class="box-header rounded-md">
            <div class="flex items-center bg-slate-700 p-3 rounded-t-md">
                <div class="text-white text-2xl font-bold">
                    <slot name="task-title"></slot>
                    ({{ total }})
                </div>
                <div>
                    <slot name="task-icon"></slot>
                </div>
            </div>
        </div>
        <div class="lista-tarefas" :data-type="listType" @scroll="scrollList">
            <div draggable="true" @dragstart="onDragStart(task)"
                class="relative flex flex-col text-gray-700 bg-white/85 bg-clip-border" v-for="task in tasks"
                :key="task">
                <nav class="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 border-b">
                    <div role="button"
                        class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <div class="w-3/4" @click="$emit('showModalTask', task)">
                            <span class="font-medium">
                                {{ task.titulo }}
                            </span>
                        </div>
                        <div class="ml-auto w-1/4" @click="$emit('showModalAlert', task.id)">
                            <div class="grid place-items-center justify-self-end">
                                <button
                                    class="relative h-5 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-red-700 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="w-5 h-5">
                                            <path fill-rule="evenodd"
                                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div v-if="processing" class="text-center py-5">
                <svg aria-hidden="true" class="inline w-8 h-8 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        emits: ['setTempDragProps', 'clearTempDragProps', 'showModalAlert', 'showModalTask', 'refreshTasks'],
        props: {
            classes: {
                type: String,
                required: true
            },
            listType: {
                type: String,
                required: true
            },
            tempDragProps: {
                type: Object,
                default: {}
            },

        },
        data() {
            return {
                tasks: [],
                processing: false,
                page: 1,
                total: 0
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
            scrollList(e){
                if(this.processing || this.total <= this.tasks.length) return
                let el = e.target
                if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
                    this.page += 1
                    this.loadData(false)
                }
            },
            loadData(initialLoad = true) {
                if(initialLoad) {
                    this.page = 1
                    this.tasks = []
                }
                this.processing = true
                this.$http.httpRequest(
                    'GET',
                    `/api/tasks?page=${this.page}&status=${this.listType}`,
                    {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    {},
                    true
                ).then(response => {
                    if(initialLoad) this.tasks = response.data
                    else this.tasks = this.tasks.concat(response.data)
                    this.total = response.total

                }).catch(error => {
                    console.log(error);
                    this.$root.$refs.toast.addMessage('Erro ao obter tarefas. Tente novamente', 'error', 3000)
                }).finally(() => {
                    this.processing = false
                })
            },
            onDragStart(task){
                this.$emit('setTempDragProps', task)
            },
            onDrop() {
                if(JSON.stringify(this.tempDragProps) == '{}' || this.tempDragProps.status == this.listType) {
                    return
                }
                this.$http.httpRequest(
                    'PUT',
                    '/api/tasks/' + this.tempDragProps.id,
                    {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    {
                        ...this.tempDragProps,
                        status: this.listType
                    },
                    true
                ).then(() => {
                    this.$emit('refreshTasks', this.tempDragProps.status)
                    this.$emit('refreshTasks', this.listType)
                }).catch(error => {
                    console.log(error);
                    this.$root.$refs.toast.addMessage('Erro ao atualizar status da tarefa. Tente novamente', 'error', 3000)
                })
            }
        }
    }
</script>

<style scoped>

.lista-tarefas {
    max-height: 380px;
    overflow-y: auto;
}

</style>
