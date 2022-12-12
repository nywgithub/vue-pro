<!--顶部搜索区域 -->
<template>
    <div class="oss-search-content">
        <h3 style="text-align: left">页头配置</h3>
        <el-tabs
            v-model="activeTabName"
            class="oss-tabs"
            @tab-click="handleTabClick"
        >
            <el-tab-pane
                v-for="lang in LANG"
                :label="lang.label"
                :name="lang.lanCode"
            ></el-tab-pane>
        </el-tabs>
        <div class="form-area">
            <el-form
                label-position="left"
                :inline="true"
                :model="searchForm"
                class="search-form-area"
                ref="formRef"
            >
                <el-form-item label="名称">
                    <el-input
                        v-model="searchForm.entranceName"
                        placeholder="请输入"
                    />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="请选择" v-model="searchForm.status">
                        <el-option label="启用" value="2" />
                        <el-option label="禁用" value="1" />
                        <el-option label="草稿" value="3" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="searchForm.startTime"
                        type="date"
                        format="YYYY/MM/DD"
                        value-format="x"
                        placeholder="请选择"
                    />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="searchForm.endTime"
                        type="date"
                        format="YYYY/MM/DD"
                        value-format="x"
                        placeholder="请选择"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<!-- TODO:
activeTabName搞成受控模式  
-->

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
import type { TabsPaneContext, FormInstance } from "element-plus"
import { LANG } from "../../model/lang"
import { initForm } from "../../data/search"

const formRef = ref<FormInstance>()

const activeTabName = ref(0)

function clear() {
    for (const key in searchForm) {
        if (Object.prototype.hasOwnProperty.call(searchForm, key)) {
            //@ts-ignore
            searchForm[key] = ""
        }
    }
}

function handleTabClick(tab: TabsPaneContext, event: Event) {
    console.log("activeTabName", tab.paneName)
    clear()
    emit("onTabChange", tab.paneName as number)
}

const searchForm = reactive({ ...initForm })

const emit = defineEmits<{
    (e: "onSubmit", data: any): void
    (e: "onReset"): void
    (e: "onTabChange", tab: number): void
}>()

function onSubmit() {
    // 确认是否初始表单
    if (JSON.stringify(searchForm) === JSON.stringify(initForm)) return
    emit("onSubmit", { lanCode: activeTabName.value, ...searchForm })
}

function onReset() {
    clear()
    emit("onReset")
}
</script>

<style scoped></style>
