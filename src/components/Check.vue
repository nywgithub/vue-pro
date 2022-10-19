<!--  -->
<template>
    <Header name="组件prop校验测试"></Header>
    <div class="check">{{ title }}</div>
    <div class="check">{{ number }}</div>
    <div class="check">{{ age }}</div>
    <div class="check">{{ data.message }}</div>
    <div class="check">{{ prods }}</div>
</template>

<script setup lang="ts">
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
</script>

<style scoped></style>
