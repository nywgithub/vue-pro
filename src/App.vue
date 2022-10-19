<script setup lang="ts">
import { ref } from "vue"
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue"
import Card from "./components/Card.vue"
import Check from "./components/Check.vue"
const cardMsg = ref("vue")

const inputValue = ref("默认值")

const buttonClick = () => {
    cardMsg.value = "react"
}

const handleInput = (val: any) => {
    inputValue.value = val
}
</script>

<template>
    <HelloWorld msg="hello" />
    <Card
        :msg="cardMsg"
        @buttonClick="buttonClick"
        :inputValue="inputValue"
        @handleInput="handleInput"
    />
    {{ inputValue }}
    <Check title="1" :number="2" :age="99" prods="gam" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
