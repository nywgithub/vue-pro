<!--表格 -->
<template>
    <div class="oss-main-content">
        <SearchArea
            ref="searchFormRef"
            @onSubmit="onSubmit"
            @onReset="onReset"
            @onTabChange="onTabChange"
        ></SearchArea>
        <div class="button-content">
            <router-link :to="`/form?entry=1&type=add&lanCode=${lanCode}`">
                <el-button>添加主入口</el-button>
            </router-link>
            <router-link :to="`/form?entry=2&type=add&lanCode=${lanCode}`">
                <el-button>添加子入口</el-button>
            </router-link>
            <el-button @click="preview">预览</el-button>
            <span>
                每个站点最多启用11个主入口，每个主入口下最多启用6个子入口
            </span>
        </div>
        <Table :tableData="tableData" :loading="loading" :lanCode="lanCode" />
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
    onMounted,
} from "vue"
import SearchArea from "./search.vue"
import Table from "./table.vue"
import { data } from "../../data/table"
import { getEntranceList } from "../../api/index"
import { initForm, initPager } from "../../data/search"
import type { ListItem } from "../../model/table"

const tableData = ref(data)

const loading = ref(false)

const searchFormRef = ref()

const lanCode = ref(0)

onMounted(() => {
    initFetch()
})

//获取list数据
async function fetchEntranceList(data: API.getHeaderListParams) {
    loading.value = true
    try {
        const res = await getEntranceList(data)
        tableData.value = res.data
    } finally {
        loading.value = false
    }
}

const initFetch = () => {
    const data = {
        ...initForm,
        ...initPager,
        lanCode: lanCode.value,
    }
    fetchEntranceList(data as API.getHeaderListParams)
}

//预览
function preview() {}

//点击查询
function onSubmit(data: any) {
    console.log("searchForm", data)
    //TODO:请求获取表格数据，并传到list组件
    fetchEntranceList({
        ...data,
        ...initPager,
    })
}
//点击重置
function onReset() {
    //TODO:获取初始表格数据
    initFetch()
}

function onTabChange(lang: number) {
    lanCode.value = lang
    const data = {
        ...initForm,
        ...initPager,
        lanCode: lang,
    }
    fetchEntranceList(data as API.getHeaderListParams)
}
</script>

<style lang="less" scoped>
.oss-main-content {
    background-color: #f5f5f5;
}
</style>
