<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, shallowRef, h } from "vue"
import HelloWorld from "../components/HelloWorld.vue"
const vnode = h("span", { id: "1" }, ["hello", h("p", { id: "2" }, "nyw")])

const noder = shallowRef({
    render() {
        return vnode
    },
})

const tester = shallowRef({
    obj: {
        value: 1,
    },
})

function testShallow() {
    tester.value = {
        obj: {
            value: 11,
        },
    }
}
</script>

<template>
    <HelloWorld msg="hello" />
    <div><component :is="noder" /></div>
    {{ tester }}
    <button @click="testShallow">test shallowRef</button>
</template>

<style scoped></style>
