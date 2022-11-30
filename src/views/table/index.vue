<!--表格 -->
<template>
    <div class="oss-main-content">
        <SearchArea ref="searchFormRef" @onSubmit="onSubmit"></SearchArea>
        <div class="button-content">
            <router-link to="/form?enterance=parent">
                <el-button>添加主入口</el-button>
            </router-link>
            <router-link to="/form?enterance=child">
                <el-button>添加子入口</el-button>
            </router-link>
            <el-button @click="preview">预览</el-button>
            <span>
                每个站点最多启用11个主入口，每个主入口下最多启用6个子入口
            </span>
        </div>
        <Table :tableData="tableData" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
import SearchArea from "./search.vue"
import Table from "./table.vue"
import { data } from "../../data/table"

const tableData = ref(data)

//预览
function preview() {}

const searchFormRef = ref()

//点击查询
function onSubmit(data: any) {
    console.log(data)
    //TODO:请求获取表格数据，并传到list组件
}
</script>

<style lang="less" scoped>
.oss-main-content {
    background-color: #f5f5f5;
}
</style>
