<template>
    <router-view>
    </router-view>
    <ToastContainer ref="toast"/>
</template>

<script>
import ToastContainer from './Components/ToastContainerComponent.vue'

export default {
    components: {
        ToastContainer
    }
}
</script>
