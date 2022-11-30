<!-- 列表区域 -->
<template>
    <div class="oss-table-content">
        <el-table
            class="oss-table"
            max-height="400"
            :data="tableData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            default-expand-all
            v-loading="loading"
            :row-class-name="tableRowClassName"
        >
            <el-table-column prop="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="data1" label="层级" />
            <el-table-column prop="data2" label="入口名称" />
            <el-table-column prop="data3" label="查阅对象" />
            <el-table-column prop="data4" label="链接">
                <template #default="scope">
                    <a :href="scope.row.data4"></a>
                </template>
            </el-table-column>
            <!-- 时间默认给时间戳 -->
            <el-table-column prop="data5" label="开始时间">
                <template #default="scope">
                    {{ $moment(scope.row.data5).format("YYYY.MM.DD HH:mm") }}
                </template>
            </el-table-column>
            <el-table-column prop="data6" label="结束时间">
                <template #default="scope">
                    {{ $moment(scope.row.data6).format("YYYY.MM.DD HH:mm") }}
                </template>
            </el-table-column>
            <el-table-column prop="data7" label="编辑人" />
            <el-table-column prop="data8" label="编辑时间">
                <template #default="scope">
                    {{ $moment(scope.row.data8).format("YYYY.MM.DD HH:mm") }}
                </template>
            </el-table-column>
            <el-table-column prop="data9" label="状态">
                <template #default="scope">
                    <span v-if="scope.row.data9 === 0">
                        <div class="point-enable"></div>
                        已启用
                    </span>
                    <span v-else-if="scope.row.data9 === 1">
                        <div class="point-disable"></div>
                        已禁用
                    </span>
                    <span v-else-if="scope.row.data9 === 2">
                        <div class="point-draft"></div>
                        草稿
                    </span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="editEntrance(scope.$index, scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="delEntrance(scope.$index, scope.row)"
                    >
                        删除
                    </el-button>
                    <el-button
                        v-if="scope.row.data9 === false"
                        link
                        type="primary"
                        size="small"
                        @click.prevent="enableEntrance(scope.$index, scope.row)"
                    >
                        启用
                    </el-button>
                    <el-button
                        v-else
                        link
                        type="primary"
                        size="small"
                        @click.prevent="
                            disableEntrance(scope.$index, scope.row)
                        "
                    >
                        禁用
                    </el-button>
                </template>
            </el-table-column>
            <template #append>
                <el-pagination
                    class="oss-pagination"
                    v-model:current-page="currentPage"
                    :page-size="10"
                    :background="true"
                    layout="prev, pager, next,total, jumper"
                    :total="totalPage"
                    @current-change="handleCurrentChange"
                />
            </template>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    watch,
    computed,
    h,
    shallowRef,
    nextTick,
    getCurrentInstance,
} from "vue"

//获取全局对象
const { proxy }: any = getCurrentInstance()

const { $moment } = proxy

const props = defineProps<{
    tableData: Array<any>
}>()

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: any
    rowIndex: number
}) => {
    if (!row.index) {
        return "table-row-subentry"
    }
    return ""
}

const loading = ref(false)

const currentPage = ref(1)
const totalPage = ref(100)

function handleCurrentChange(val: any) {}

function editEntrance(index: number, row: any) {}
function delEntrance(index: number, row: any) {}
function enableEntrance(index: number, row: any) {}
function disableEntrance(index: number, row: any) {}
</script>

<style lang="less">
.oss-table {
    .el-table__append-wrapper {
        display: flex;
        justify-content: center;
    }

    &.el-table tr {
        &.table-row-subentry {
            &,
            .el-table-fixed-column--right {
                background-color: #dae0e6;
            }
        }
        &.hover-row {
            .el-table__cell {
                background-color: unset;
            }
        }
    }
}
</style>
