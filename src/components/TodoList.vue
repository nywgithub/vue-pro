<!-- todolist -->
<template>
    <div class="todolist">
        <div class="input-area">
            <input v-model="inputValueVm" ref="inputRef" />
            <button @click="addTodo">add</button>
            <button @click="searchTodo">search</button>
        </div>
        <div class="todo-lists">
            <ul>
                <li
                    class="todo-item"
                    :class="{ active: currentItem === index }"
                    v-for="(item, index) in todoList"
                    @click="itemClick(item, index)"
                >
                    <div class="todo-content">
                        <div>{{ index + 1 }}</div>
                        <p>{{ item }}</p>
                    </div>
                    <i class="todo-delete" @click="deleteTodo(index)">-</i>
                </li>
            </ul>
        </div>
        <div class="todo-operation">
            <button @click="handleClear">clear</button>

            <button @click="handlePrev">prev</button>
            <button @click="handleNext">next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, unref, watch } from "vue"

interface Props {
    defaultTodo?: Array<string>
    value?: Array<string>
}
const prop = defineProps<Props>()

interface Emit {
    (e: "itemClick", item: string, index: number): void
    (e: "onChange", todoList: Array<string>): void
}
const emit = defineEmits<Emit>()

const inputRef = ref()

//input输入值
const inputValueVm = ref()
//todolist数组
type todoItem = string

//computed计算value defautValue
const todoList = ref<Array<todoItem>>(prop.defaultTodo || [])

//监听prop默认值的变化
watch(
    () => prop.defaultTodo,
    (newlist) => {
        todoList.value = newlist || []
        emit("onChange", todoList.value)
    },
    { deep: true }
)

const updateTodo = (val: string, index: number) => {
    todoList.value[index] = val
    emit("onChange", todoList.value)
}

defineExpose({
    inputRef,
    updateTodo,
})

const currentItem = ref<number>()

//新增todo
function addTodo() {
    inputValueVm.value && todoList.value.push(inputValueVm.value)
    inputValueVm.value = ""
    emit("onChange", todoList.value)
}

//删除todo
function deleteTodo(index: number) {
    todoList.value.splice(index, 1)
    emit("onChange", todoList.value)
}
//搜索todo
function searchTodo() {
    currentItem.value = todoList.value.indexOf(inputValueVm.value)
}
function handleClear() {
    todoList.value = []
}
function handlePrev() {}
function handleNext() {}

function itemClick(item: string, index: number) {
    emit("itemClick", item, index)
}
</script>

<style scoped>
.todo-item.active {
    color: red;
}
</style>
