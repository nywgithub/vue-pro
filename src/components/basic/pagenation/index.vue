<!--  -->
<template>
    <div class="pager-wrap">
        <div class="total">总数：{{ total }}</div>
        <div
            class="prev"
            @click="pageChange('-')"
            :class="{ disable: currentPage === 1 }"
        >
            <component :is="prevNode"></component>
        </div>

        <ul>
            <li v-if="isSplit">1</li>
            <li v-if="isSplit">
                <span v-if="isHover">... </span>
                <span v-else> -- </span>
            </li>
            <li
                v-if="!isSplit"
                v-for="item in totalPage"
                :class="{ current: item === currentPage }"
                @click="itemClick(item)"
            >
                {{ item }}
            </li>
            <li v-else></li>
            <li v-if="isSplit">
                <span v-if="isSplit">... </span>
                <span v-else> ++ </span>
            </li>
            <li v-if="isSplit">
                {{ totalPage }}
            </li>
        </ul>

        <div
            class="next"
            @click="pageChange('+')"
            :class="{ disable: currentPage === totalPage }"
        >
            <component :is="nextNode"></component>
        </div>
        <div class="jumper">
            Go To
            <Input
                :input-value="jumper"
                @update:inputValue="handleInput"
                type="text"
                :style="inputStyle"
            />
        </div>
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
    VNode,
} from "vue"
import Input from "../input/index.vue"
const props = withDefaults(
    defineProps<{
        total: number
        pageSize?: number
        pageNo?: number
        prevNode?: any
        nextNode?: any
        splitNumber?: number
    }>(),
    {
        pageSize: 10,
        pageNo: 1,
        prevNode: h("span", "prev"),
        nextNode: h("span", "next"),
    }
)

const inputStyle = reactive({
    "margin-left": "10px",
})

const itemClick = (item: number) => {
    currentPage.value = item
}

const pageChange = (type: "+" | "-") => {
    if (type == "+") {
        currentPage.value < totalPage.value && currentPage.value++
    } else if (type == "-") {
        currentPage.value > 1 && currentPage.value--
    }
}

const isHover = ref<boolean>(false)
const currentPage = ref<number>(1)

const jumper = ref()

const handleInput = (val: any) => {
    jumper.value = Number(val)
}

watch(
    () => jumper.value,
    (newVal: number) => (currentPage.value = newVal)
)

const isSplit = computed(() => {
    return props.splitNumber ? props.splitNumber <= currentPage.value : false
})

const totalPage = computed(() => {
    const getTotalPage = (total: number, size: number) => {
        return Math.floor((total - 1) / size) + 1
    }
    return getTotalPage(props.total, props.pageSize!)
})

console.log(isSplit)
</script>

<style lang="less" scoped>
.pager-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .jumper {
        display: flex;
    }
    ul {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            min-width: 28px;
            height: 28px;
            margin-right: 8px;
            font-family: Arial;
            line-height: 26px;
            text-align: center;
            vertical-align: middle;
            list-style: none;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            outline: 0;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: #222;
            &.current {
                border: 1px solid red;
                color: red;
            }
        }
    }
    .prev,
    .next {
        margin: 10px;
        display: inline-block;
        min-width: 28px;
        height: 28px;
        margin-right: 8px;
        padding: 0 4px;
        font-family: Arial;
        line-height: 26px;
        text-align: center;
        vertical-align: middle;
        list-style: none;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        outline: 0;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #222;
        &.disable {
            cursor: not-allowed;
            color: #888;
        }
    }
}
</style>
