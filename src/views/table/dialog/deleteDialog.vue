<!-- 删除弹窗 -->
<template>
    <el-dialog
        v-model="visible"
        title="Info"
        width="30%"
        align-center
        append-to-body
    >
        <template v-if="status === 2">
            <p v-if="entranceType === 1">
                删除后该主入口及其子入口将不在前台展示，是否确认？
            </p>
            <p v-else>删除后该子入口将不在前台展示，是否确认？</p>
        </template>
        <template v-else>
            <p v-if="entranceType === 1">是否确认删除该主入口及其子入口？</p>
            <p v-else>是否确认删除该子入口？</p>
        </template>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('cancel')">取消</el-button>
                <el-button type="primary" @click="emit('confirm')">
                    删除
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
const props = defineProps<{
    visible: boolean
    row: any
}>()

const { status, entranceType, recId } = props.row

const emit = defineEmits<{
    (e: "cancel"): void
    (e: "confirm"): void
}>()
</script>

<style scoped></style>
