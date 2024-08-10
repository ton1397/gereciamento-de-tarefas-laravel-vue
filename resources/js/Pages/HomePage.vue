
<template>
    <div class="home">
        <div class="container mx-auto">
            <NavbarComponent />
            <div class="content">
                <h1 class="text-3xl font-bold text-white mt-5 mb-10 text-center">Gerenciador de tarefas</h1>
                <div class="flex flex-wrap justify-between flex-col lg:flex-row">
                    <div class="lg:w-4/12 px-2 mb-5 w-full">
                        <TaskList
                            classes="relative bg-yellow-400 h-full min-h-96 rounded-md"
                            listType="a_fazer"
                            ref="TodoList"
                            :tempDragProps="tempDragProps"
                            @setTempDragProps="setTempDragProps"
                            @clearTempDragProps="clearTempDragProps"
                            @showModalTask="showModal"
                            @showModalAlert="showModalAlert"
                            @refreshTasks="refreshTasks"
                        >
                            <template #task-icon>
                                <div>
                                    <svg class="w-8 h-8 text-white ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
                                    </svg>
                                </div>
                            </template>
                            <template #task-title>
                                A fazer
                            </template>
                    </TaskList>
                    </div>
                    <div class="lg:w-4/12 px-2 mb-5 w-full">
                        <TaskList
                            classes="relative bg-blue-400 h-full min-h-96 rounded-md"
                            listType="em_andamento"
                            ref="InProgressList"
                            :tempDragProps="tempDragProps"
                            @setTempDragProps="setTempDragProps"
                            @clearTempDragProps="clearTempDragProps"
                            @showModalTask="showModal"
                            @showModalAlert="showModalAlert"
                            @refreshTasks="refreshTasks"
                        >
                            <template #task-icon>
                                <div>
                                    <svg class="w-6 h-6 text-white ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"/>
                                    </svg>
                                </div>
                            </template>
                            <template #task-title>
                                Fazendo
                            </template>
                        </TaskList>
                    </div>
                    <div class="lg:w-4/12 px-2 mb-5 w-full">
                        <TaskList
                            classes="relative bg-green-400 h-full min-h-96 rounded-md"
                            listType="feito"
                            ref="DoneList"
                            :tempDragProps="tempDragProps"
                            @setTempDragProps="setTempDragProps"
                            @clearTempDragProps="clearTempDragProps"
                            @showModalTask="showModal"
                            @showModalAlert="showModalAlert"
                            @refreshTasks="refreshTasks"
                        >
                            <template #task-icon>
                                <div>
                                    <svg class="w-6 h-6 text-white ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </template>
                            <template #task-title>
                                Feito
                            </template>
                        </TaskList>
                    </div>
                </div>
            </div>
            <div class="fixed bottom-10 right-10">
                <button type="button" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" @click="showModal(null)">
                    <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
        </div>
        <ModalTaskComponent @closeModal="closeModal" :modal="modalProps"/>
        <ModalAlert @closeModal="closeModalAlert" :id="task_id"/>
    </div>
</template>

<script>
import NavbarComponent from '../Components/NavbarComponent.vue'
import ModalTaskComponent from '../Components/ModalTaskComponent.vue'
import ModalAlert from '../Components/ModalAlert.vue'
import TaskList from '../Components/TaskList.vue'
import { Modal } from 'flowbite'


export default {
    components: {
        NavbarComponent,
        ModalTaskComponent,
        ModalAlert,
        TaskList
    },

    data() {
        return {
            modalTask: null,
            modalAlert: null,
            modalProps: {},
            tempDragProps:{},
            todoTaks: [],
            inProgressTasks: [],
            doneTaks: [],
            task_id: 0,
        }
    },

    mounted() {
        this.initModalTask()
        this.initModalAlert()
    },

    methods: {
        initModalTask(){
            // set the modal menu element
            const $targetEl = document.getElementById('task-modal');

            // options with default values
            const options = {
                placement: 'bottom-right',
                backdrop: 'static',
                backdropClasses:
                    'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: false,
            };

            // instance options object
            const instanceOptions = {
                id: 'task-modal',
                override: true
            };

            this.modalTask = new Modal($targetEl, options, instanceOptions);
        },
        initModalAlert(){
            // set the modal menu element
            const $targetEl = document.getElementById('modal-alert');

            // options with default values
            const options = {
                placement: 'bottom-right',
                backdrop: 'static',
                backdropClasses:
                    'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
                closable: false,
            };

            // instance options object
            const instanceOptions = {
                id: 'modal-alert',
                override: true
            };

            this.modalAlert = new Modal($targetEl, options, instanceOptions);
        },
        showModalAlert(id) {
            this.task_id = id
            document.getElementById('modal-alert').classList.remove('animate__fadeOutRightBig');
            document.getElementById('modal-alert').classList.add('animate__fadeInRightBig');
            this.modalAlert.show();
        },
        showModal(modal) {
            this.modalProps = modal;
            document.getElementById('task-modal').classList.remove('animate__fadeOutRightBig');
            document.getElementById('task-modal').classList.add('animate__fadeInRightBig');
            this.modalTask.show();
        },

        closeModalAlert(refresh = false) {
            document.getElementById('modal-alert').classList.remove('animate__fadeInRightBig');
            document.getElementById('modal-alert').classList.add('animate__fadeOutRightBig');
            setTimeout(() => {
                this.modalAlert.hide();
                this.modalProps = {};
                if(refresh) {
                    this.$refs.TodoList.loadData();
                    this.$refs.InProgressList.loadData();
                    this.$refs.DoneList.loadData();
                }
            }, 100);
        },

        closeModal(refresh = false) {
            document.getElementById('task-modal').classList.remove('animate__fadeInRightBig');
            document.getElementById('task-modal').classList.add('animate__fadeOutRightBig');
            setTimeout(() => {
                this.modalTask.hide();
                this.modalProps = {};
                if(refresh) {
                    this.$refs.TodoList.loadData();
                    this.$refs.InProgressList.loadData();
                    this.$refs.DoneList.loadData();
                }
            }, 100);
        },

        setTempDragProps(task) {
            this.tempDragProps = task
        },
        clearTempDragProps(){
            this.tempDragProps = {}
        },
        refreshTasks(status) {
            if(status == 'a_fazer') {
                this.$refs.TodoList.loadData();
            }else if(status == 'em_andamento') {
                this.$refs.InProgressList.loadData();
            }else if(status == 'feito') {
                this.$refs.DoneList.loadData();
            }
        },

    }
}
</script>
