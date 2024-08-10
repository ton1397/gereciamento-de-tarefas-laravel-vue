<template>
    <div class="toast">
        <div :id="message_id"
            :class="{
                'fixed flex items-center justify-between w-full max-w-xs p-4 space-x-4 bg-gray-800 rounded-lg shadow right-5 bottom-5 animate__animated': true,
                'text-red-500': message_type === 'error',
                'text-green-500': message_type === 'success',
            }"
            :style="{bottom: `${index * 80 + 20}px`}"
            role="alert">
            <div>
                <svg v-if="message_type === 'error'" class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                        clip-rule="evenodd" />
                </svg>
                <svg v-else-if="message_type === 'success'" class="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                </svg>
            </div>
            <div class="font-normal">{{ message }}</div>
            <div>
                <button type="button"
                    :class="{
                        'ms-auto -mx-1.5 -my-1.5 items-center self-end justify-center flex-shrink-0 text-white rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8': true,
                    }"
                    @click="close"
                    aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        message_id: {
            type: String,
            required: true
        },
        message_type: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
        };
    },
    mounted() {
        this.autoClose();
    },
    methods: {
        autoClose() {
            document.getElementById(this.message_id).classList.add('animate__fadeInRightBig')
            setTimeout(() => {
                this.close()
            }, this.duration);
        },
        close() {
            document.getElementById(this.message_id).classList.add('animate__fadeOutRightBig')
            setTimeout(() => {
                this.$emit('closeToast', this.message_id)
            }, 700);
        }
    }
};
</script>
