<!--  -->
<template>
    <div class="input-wrap">
        <input
            :value="inputValue"
            @input="$emit('update:inputValue', $event?.target?.value)"
            v-bind="$attrs"
            ref="inputRef"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

defineProps<{
    inputValue?: any
}>()

defineEmits<{
    (e: "update:inputValue"): void
}>()

const inputRef = ref()
defineExpose({
    inputRef,
})
</script>

<style scoped></style>
