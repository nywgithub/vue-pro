<!-- tree -->
<template>
    <div class="tree-wrap">
        <el-tree
            :data="dataSource"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
const props = defineProps<{
    dataSource: any[]
    renderContent?: any
}>()
</script>

<style scoped></style>
