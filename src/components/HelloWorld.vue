<script setup lang="ts">
import { ref, unref } from "vue"
interface Props {
    msg: string
}

//设定默认值
const props = withDefaults(defineProps<Props>(), {
    msg: "Hello",
})

const count = ref(0)

const obj = ref({
    name: "",
    age: 0,
})

const vFocus = {
    mounted: (el: any) => el.focus(),
}
const handleClick = () => {
    const conj = unref(obj)
    conj.age++
    console.log(conj, obj)
}
</script>

<template>
    <h1>{{ msg }}</h1>
    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <button type="button" @click="handleClick">点击后 {{ obj.age }}</button>
    </div>
    <input v-focus />
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
