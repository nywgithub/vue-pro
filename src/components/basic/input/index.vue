<!--  -->
<template>
    <div class="input-wrap">
        <input
            :value="inputValue"
            @input="handleInput"
            v-bind="$attrs"
            ref="inputRef"
        />
    </div>
</template>

<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
    inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref } from "vue"

defineProps<{
    inputValue?: any
}>()

const emit = defineEmits<{
    (e: "update:inputValue", event: any): void
}>()

const handleInput = (e: any) => {
    emit("update:inputValue", e?.target?.value)
}

const inputRef = ref()
defineExpose({
    inputRef,
})
</script>

<style scoped></style>
