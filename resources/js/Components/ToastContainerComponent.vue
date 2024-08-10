<template>
    <div v-show="messages.length > 0">
        <Toast v-for="(message, index) in messages" :key="message.id" :index="index" :message_id="message.id" :message="message.message" :message_type="message.message_type" :duration="message.duration" @closeToast="closeToast" />
    </div>
</template>

<script>
import Toast from './ToastComponent.vue'
export default {
    components: {
        Toast
    },
    data() {
        return {
            messages: [],
        }
    },
    methods: {
        addMessage(message, message_type, duration = 3000) {
            this.messages.push({
                id: (Date.now() + Math.random()).toString(),
                message,
                message_type,
                duration
            })
        },
        closeToast(message_id) {
            this.messages = this.messages.filter(message => message.id != message_id)
        }
    }
}
</script>
