<!--  -->
<template>
    <Teleport to="body">
        <div class="modal" v-show="props.visible">
            <p style="margin-bottom: 20px">Hello from the modal!</p>
            <slot></slot>
            <button @click="handleClose">Close</button>
            <button @click="handleSubmit">Submit</button>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
const props = withDefaults(
    defineProps<{
        visible: boolean
    }>(),
    {
        visible: false,
    }
)

const emit = defineEmits<{
    (e: "handleClose"): void
    (e: "handleSubmit"): void
}>()

const handleClose = () => {
    emit("handleClose")
}
const handleSubmit = () => {
    emit("handleSubmit")
}
</script>

<style lang="less" scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 16px #00000026;
    background-color: #fff;
}
</style>
