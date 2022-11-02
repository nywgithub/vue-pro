<script setup lang="ts">
import { ref } from "vue"
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Card from "../components/Card.vue"

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
    <Card
        :msg="cardMsg"
        @buttonClick="buttonClick"
        :inputValue="inputValue"
        @handleInput="handleInput"
    />
    {{ inputValue }}
</template>

<style scoped></style>
