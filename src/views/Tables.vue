<!-- tables -->
<template>
    <div class="table-wrap">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="age" label="Age" />
            <el-table-column prop="dep" label="Dep" />
            <el-table-column align="right" width="180">
                <template #header>
                    <el-button size="small" @click="handleAdd">新增</el-button>
                </template>
                <template #default="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%">
            <span>是否确定删除</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleDeleteConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
import router from "../routers"
interface ItemInfo {
    name: string
    age: number
    dep: string
}
const props = defineProps<{
    tableData: Array<ItemInfo>
}>()
const dialogVisible = ref(false)
//当前delete选择信息
const current = ref()
//增
const handleAdd = () => {
    router.push("./form")
}
//改
const handleEdit = (index: number, row: ItemInfo) => {
    console.log(row)
}
//删
const handleDelete = (index: number, row: ItemInfo) => {
    console.log(row)
    current.value = row
}
//确认删除
const handleDeleteConfirm = () => {
    dialogVisible.value = false
}
</script>

<style scoped></style>
