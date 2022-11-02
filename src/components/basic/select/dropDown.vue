<!--  -->
<template>
    <Teleport to="body">
        <div class="dropDown-wrap" ref="dropDownRef" style="style">
            <ul>
                <li v-for="item in list" @click="emit('onSelect', item)">
                    {{ item }}
                </li>
            </ul>
        </div>
    </Teleport>
</template>
<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { ref } from "vue"
const dropDownRef = ref()

defineProps<{
    style?: any
    list?: Array<any>
}>()

const emit = defineEmits<{
    (e: "onSelect", item: any): void
}>()

defineExpose({
    dropDownRef,
})
</script>

<style lang="less" scoped>
.dropDown-wrap {
    padding: 20px 10px;
    min-width: 150px;
    position: absolute;
    color: #000000;
    top: -9999px;
    left: -9999px;
    background-color: #fff;
    overflow: hidden;
    font-size: 14px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
        0 9px 28px 8px #0000000d;
}
</style>
