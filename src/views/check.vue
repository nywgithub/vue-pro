<script setup lang="ts">
import { ref } from "vue"

import Check from "./components/Check.vue"

const handleInput2 = (e: any) => {
    console.log(e)
    console.log("输入中")
}

const checkRef = ref()
const getCheckRef = () => {
    const { inputRef, data } = checkRef.value
    console.log("checkRef", inputRef, data)
    inputRef.focus()
}
</script>

<template>
    <Check
        title="1"
        :number="2"
        :age="99"
        prods="gam"
        placeholder="请输入数字"
        type="number"
        @input="handleInput2"
        ref="checkRef"
    >
        <template #header>
            <div>此处是header区域</div>
        </template>
        main区域
        <template #footer>
            <div>此处是footer区域</div>
        </template>
    </Check>
    <button @click="getCheckRef">获取子元素的实例</button>
</template>

<style scoped>

</style>
