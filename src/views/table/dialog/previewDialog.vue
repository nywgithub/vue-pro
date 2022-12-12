<!-- 预览弹窗  -->
<template>
    <el-dialog v-model="visible" title="预览">
        <el-form :model="form">
            <el-form-item label="应用时间">
                <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="请选择"
                />
            </el-form-item>
            <el-form-item label="查阅对象">
                <el-select
                    v-model="form.targetCountry"
                    placeholder="Please select a zone"
                >
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('cancel')">取消</el-button>
                <el-button type="primary" @click="emit('confirm')">
                    确认预览
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
const props = defineProps<{
    visible: boolean
}>()

const emit = defineEmits<{
    (e: "cancel"): void
    (e: "confirm"): void
}>()

const form = reactive({
    date: "",
    targetCountry: "",
})
</script>

<style scoped></style>
