<!-- 列表区域 -->
<template>
    <div class="oss-table-content">
        <el-empty v-if="tableData.length === 0" :image-size="200" />
        <el-table
            v-else
            class="oss-table"
            max-height="400"
            :data="tableData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            default-expand-all
            v-loading="loading"
            :row-class-name="tableRowClassName"
            @cell-mouse-enter="cellmouseenter"
            @cell-mouse-leave="cellmouseleave"
        >
            <el-table-column prop="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="data1" label="层级" />
            <el-table-column prop="data2" label="入口名称" />
            <el-table-column prop="data3" label="查阅对象" />
            <el-table-column prop="data4" label="链接">
                <template #default="scope">
                    <a :href="scope.row.data4">{{ scope.row.data4 }}</a>
                </template>
            </el-table-column>
            <!-- 时间默认给时间戳 -->
            <el-table-column prop="data5" label="开始时间">
                <template #default="scope">
                    <span class="format-time">
                        {{
                            $moment(scope.row.data5).format("YYYY.MM.DD HH:mm")
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="data6" label="结束时间">
                <template #default="scope">
                    <span class="format-time">
                        {{
                            $moment(scope.row.data6).format("YYYY.MM.DD HH:mm")
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="data7" label="编辑人" />
            <el-table-column prop="data8" label="编辑时间">
                <template #default="scope">
                    <span class="format-time">
                        {{
                            $moment(scope.row.data8).format("YYYY.MM.DD HH:mm")
                        }}
                    </span>
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
            <el-table-column
                fixed="right"
                label="操作"
                className="oss-table-column-options"
            >
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
        <DeleteDialog
            :visible="deleteDialogVisible"
            :row="currentRow"
            @cancel="deleteDialogVisible = false"
            @confirm="deleteConfirm"
        />
    </div>
    <Teleport to="body">
        <div
            class="mainEntry-empty-warning"
            ref="warningRef"
            v-show="showWarning"
            @mouseenter="showWarning = true"
            @mouseleave="showWarning = false"
        >
            该主入口未添加链接或子入口，请尽快添加
            <span class="arrow"></span>
        </div>
    </Teleport>
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
import domAlign from "dom-align"
import DeleteDialog from "./dialog/deleteDialog.vue"
import { ListItem } from "../../model/table"
//获取全局对象
const { proxy }: any = getCurrentInstance()

const { $moment, $message } = proxy

const props = defineProps<{
    tableData: Array<any>
}>()

//点击的row
const currentRow = ref<ListItem>({
    recId: 64,
    entranceType: 2,
    entranceName: "test",
    targetType: 1,
    targetLink:
        "4g#a(CBpQYvUIdnYxX$4B[hKe*ssR%NLA(7tJCNPrL4B1u2jlU[e&KtmOTeFE&LU#icxRr26#P^sO@7W49k2ZAT^gJn0AJp#U0ThJr%(PFc7)[&rjYk&Y[OM%BijpnuMA&bf2!@Zlk",
    startTime: 19,
    endTime: 18,
    status: 1,
    parentId: 58,
    index: 84,
    updateTime: 50,
    updaterName: "test",
    hasChildren: true,
})

const loading = ref(false)

//分页
const currentPage = ref(1)
const totalPage = ref(100)
function handleCurrentChange(val: any) {}

//主入口没有子入口的tooltip提示
const warningRef = ref()
const showWarning = ref(false)
function align(target: any) {
    domAlign(warningRef.value, target, {
        points: ["cc", "cc"],
        offset: [0, -20],
    })
}
async function cellmouseenter(row: any, column: any, cell: any, event: any) {
    if (row.index && !row.children) {
        showWarning.value = true
        await nextTick
        align(cell.parentNode)
    }
}
function cellmouseleave(row: any, column: any, cell: any, event: any) {
    showWarning.value = false
}

//渲染表格row的class
const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: any
    rowIndex: number
}) => {
    if (!row.index) {
        return "table-row-subentry"
    } else if (!row.children) {
        return "table-row-mainEntry-empty"
    }
    return ""
}

const deleteDialogVisible = ref(false)

function deleteConfirm() {
    const afterConfirm = () => {
        deleteDialogVisible.value = false
        $message({
            showClose: true,
            message: "Congrats, this is a success message.",
            type: "success",
        })
    }

    afterConfirm()

    const data = {
        recId: currentRow.value.recId,
        status: currentRow.value.status,
    }
    console.log(data)
    //TODO:fetch delete
}

function editEntrance(index: number, row: any) {}
function delEntrance(index: number, row: any) {
    deleteDialogVisible.value = true
    currentRow.value = row
}
function enableEntrance(index: number, row: any) {}
function disableEntrance(index: number, row: any) {}
</script>

<style lang="less">
.oss-table {
    .el-table__append-wrapper {
        padding: 20px;
        display: flex;
        justify-content: flex-end;
    }

    &.el-table tr {
        &.table-row-subentry {
            &,
            .oss-table-column-options {
                background-color: #f2f3f4;
            }
        }
        &.table-row-mainEntry-empty {
            cursor: pointer;
            &,
            .oss-table-column-options {
                background-color: #fdf0ee;
            }
        }

        &.hover-row {
            .el-table__cell {
                background-color: unset;
            }
        }
    }
    .oss-table-column-options {
        .cell {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .el-button + .el-button {
            margin: 0;
        }
    }
    .format-time {
        word-break: break-word;
    }
}
.mainEntry-empty-warning {
    display: inline-block;
    z-index: 2;
    padding: 10px 15px;
    background: #ffffff;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    font-size: 14px;
    line-height: 21px;
    color: #222222;
    .arrow {
        position: absolute;
        left: 50%;
        bottom: -6px;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        z-index: -1;
        &::before {
            position: absolute;
            width: 10px;
            height: 10px;
            z-index: -1;
            content: " ";
            transform: rotate(45deg);
            background: #ffffff;
            box-sizing: border-box;
            border: 1px solid #e4e7ed;
            right: 0;
            border-top-left-radius: 2px;
            border-top-color: transparent !important;
            border-left-color: transparent !important;
        }
    }
}
</style>
