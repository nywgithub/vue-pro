<!--  -->
<template>
    <Header name="组件prop校验测试"></Header>
    <div class="check">{{ title }}</div>
    <div class="check">{{ number }}</div>
    <div class="check">{{ age }}</div>
    <div class="check">{{ data.message }}</div>
    <div class="check">{{ prods }}</div>

    <Header name="插槽"></Header>
    <div>
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
    <Header name="ref引用和attrs透传"></Header>
    <div>
        <input v-bind="$attrs" ref="inputRef" />
        <button @click="inputFocus">input聚焦</button>
    </div>
    <Header name="获取ref的dom"></Header>
    <input :ref="getRefDom" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Header from "./global/Header.vue"

const props = defineProps({
    title: String,
    number: Number,
    age: {
        type: Number,
        //必传
        required: true,
        default: 99,
    },
    //对象或者数组的default值必须是一个工厂函数返回的
    data: {
        type: Object,
        //rawProps是原始 prop
        default(rawProps: any) {
            console.log(rawProps)
            return { message: "hello" }
        },
    },
    //自定义校验函数
    prods: {
        validator(value) {
            //返回为false，控制台会警告
            return value === "gam"
        },
    },
})

defineEmits(["handleClick"])

const inputRefDom = ref(null)
const getRefDom = (el: any) => {
    console.log(el)
    inputRefDom.value = el
    console.log(inputRefDom.value)
}

const inputRef = ref()

const inputFocus = () => {
    console.log(inputRef)
    //inputRef.value就是input
    inputRef.value.focus()
}
//把input的ref引用暴露给外部
defineExpose({
    inputRef,
    data: "test",
})
</script>

<style scoped></style>
