<!-- 禁用弹窗 -->
<template>
    <div class="content"></div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
const props = defineProps<{
    visible: boolean
    row: any
}>()
</script>

<style scoped></style>
