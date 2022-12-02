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
                :name="lang.value"
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
                    <el-input v-model="searchForm.form1" placeholder="请输入" />
                </el-form-item>
                <!-- <el-form-item label="层级">
                    <el-input v-model="searchForm.form2" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="searchForm.form3" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="查阅对象">
                    <el-select placeholder="请选择" v-model="searchForm.form4">
                        <el-option label="全体" value="全体" />
                        <el-option label="部分区域" value="部分区域" />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="状态">
                    <el-select placeholder="请选择" v-model="searchForm.form2">
                        <el-option label="启用" value="启用" />
                        <el-option label="禁用" value="禁用" />
                        <el-option label="草稿" value="草稿" />
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="searchForm.form3"
                        type="date"
                        placeholder="请选择"
                    />
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="searchForm.form4"
                        type="date"
                        placeholder="请选择"
                    />
                </el-form-item>
                <!--  <el-form-item label="编辑人">
                    <el-input v-model="searchForm.form8" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="编辑时间">
                    <el-date-picker
                        v-model="searchForm.form9"
                        type="date"
                        placeholder="请选择"
                    />
                </el-form-item> -->

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
import type { TabsPaneContext } from "element-plus"
import type { FormInstance } from "element-plus"
import { LANG } from "../../model/lang"

const formRef = ref<FormInstance>()

const activeTabName = ref<string>("en")

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
}

const initForm = {
    form1: "",
    form2: "",
    form3: "",
    form4: "",
    // form5: "",
    // form6: "",
    // form7: "",
    // form8: "",
    // form9: "",
}
const searchForm = reactive(initForm)

const emit = defineEmits<{
    (e: "onSubmit", data: any): void
    (e: "onReset"): void
}>()

function onSubmit() {
    console.log(initForm)
    // 确认是否空表单
    if (
        JSON.stringify(searchForm) ===
        JSON.stringify({
            form1: "",
            form2: "",
            form3: "",
            form4: "",
            // form5: "",
            // form6: "",
            // form7: "",
            // form8: "",
            // form9: "",
        })
    )
        return
    emit("onSubmit", { lang: activeTabName.value, ...searchForm })
}

function onReset() {
    clear()
    emit("onReset")
}
</script>

<style scoped></style>
