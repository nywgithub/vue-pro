<!-- todolist -->
<template>
    <div class="todolist">
        <div class="input-area">
            <input v-model="inputValueVm" />
            <button @click="addTodo">add</button>
            <button @click="searchTodo">search</button>
        </div>
        <div class="todo-lists">
            <ul>
                <li
                    class="todo-item"
                    :class="{ active: currentItem === index }"
                    v-for="(item, index) in todoList"
                >
                    <div class="todo-content">
                        <div>{{ index + 1 }}</div>
                        <p>{{ item }}</p>
                    </div>
                    <i class="todo-delete" @click="deleteTodo">-</i>
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
import { ref } from "vue"
//input输入值
const inputValueVm = ref()
//todolist数组
type todoItem = string
const todoList = ref<Array<todoItem>>([])

const currentItem = ref<number>()

//新增todo
function addTodo() {
    inputValueVm.value && todoList.value.push(inputValueVm.value)
}

//删除todo
function deleteTodo() {
    todoList.value.splice(todoList.value.indexOf(inputValueVm.value), 1)
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
</script>

<style scoped>
.todo-item.active {
    color: red;
}
</style>
