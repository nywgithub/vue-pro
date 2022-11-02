<!--  -->
<template>
    <div class="department-box">
        <div class="user-info-area">
            <div class="search-area">
                <!-- <Input
                    :inputValue="inputValue"
                    @update:input-value="update"
                    placeholder="请输入"
                /> -->
                <Input
                    v-model:input-value="inputValue"
                    placeholder="请输入名字"
                />
                <Select
                    :list="list"
                    @onSelect="onSelect"
                    v-model:value="value"
                    placeholder="选择一个部门"
                ></Select>
                <button @click="search">search</button>
            </div>
        </div>
        <div class="user-dep-tree"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Input from "../components/basic/input/index.vue"
import Select from "../components/basic/select/index.vue"

const inputValue = ref()

const value = ref()

function search() {
    const data = {
        name: inputValue.value,
        dep: value.value,
    }
    console.log(data)
}

/* function update(e: any) {
    inputValue.value = e
} */

const list = ref(["1", "2", "3"])

function onSelect(item: any) {
    console.log("选择:", item)
}
</script>

<style lang="less" scoped>
.department-box {
    background-color: aliceblue;
}
</style>
