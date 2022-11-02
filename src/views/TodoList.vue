<!--  -->
<template>
    <todo-list
        :defaultTodo="defaultTodo"
        :value="todoValue"
        @itemClick="itemClick"
        @onChange="onChange"
        ref="todoRef"
    />
    <button @click="focus">focus</button>
    <div>
        <span v-for="item in todoValue">{{ item }}</span>
    </div>
    <Modal
        :visible="visible"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit"
    >
        <input v-model="editValue" />
    </Modal>
</template>

<script setup lang="ts">
import { ref, unref, onMounted } from "vue"
import TodoList from "../components/TodoList.vue"
import Modal from "../components/modal.vue"
const DEFAULT = ["今天是星期一", "今天是星期二", "今天是星期三"]
const itemClick = (item: string, index: number) => {
    // todoRef.value.updateTodo("1", index)
    editValue.value = item
    currentIndex.value = index
    visible.value = true
}
type todo = Array<string>
//异步获取默认值
const defaultTodo = ref<todo>([])

const todoValue = ref<todo>([])

const visible = ref<boolean>(false)

const currentIndex = ref<number>()

const handleClose = () => {
    visible.value = false
}

const handleSubmit = () => {
    todoRef.value.updateTodo(editValue.value, currentIndex.value!)
    handleClose()
}

const editValue = ref<string>()

const onChange = (list: todo) => {
    todoValue.value = list
}

const fetch = async () => {
    let promise = new Promise((resolve, reject) => {
        console.log(DEFAULT)
        resolve(DEFAULT)
    })

    const arr = await promise
    console.log(arr)
    defaultTodo.value = arr as todo
    console.log(defaultTodo)
}

const todoRef = ref()

const focus = () => {
    const { inputRef } = todoRef.value
    inputRef.focus()
}

onMounted(() => {
    fetch()
})
</script>

<style lang="less" scoped>

</style>
