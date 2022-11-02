<!-- 练习vue组件  -->
<template>
    <Header name="组件传值测试"></Header>
    <div class="content">{{ msg }}</div>
    <button @click="(e) => handleClick(e, 'hh')">点击</button>
    <input :value="inputValue" @input="handleInput" />
    <div>
        <input v-model="navtiveInputValue" />
        {{ navtiveInputValue }}
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
interface Props {
    msg: string
    inputValue: any
}

const props = defineProps<Props>()

const navtiveInputValue = ref("")

interface Emits {
    (e: "buttonClick"): void
    (e: "handleInput", event: any): void
}
const emit = defineEmits<Emits>()

const handleInput = (e: any) => {
    emit("handleInput", e.target.value)
}

const handleClick = (e: MouseEvent, msg: string) => {
    console.log(e, msg, props.msg)
    emit("buttonClick")
}
</script>

<style scoped></style>
