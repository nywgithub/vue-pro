<!-- 国家选择器 -->
<template>
    <el-popover
        placement="bottom"
        :width="400"
        transition="el-zoom-in-top"
        :hide-after="0"
        trigger="click"
        ref="popoverRef"
    >
        <template #reference>
            <div
                ref="triggerRef"
                :class="`select-picker-area ${visible ? 'open' : ''}`"
                @click.stop="visible = true"
                @mouseenter="isHover = true"
                @mouseleave="isHover = false"
            >
                <div class="select-picker-inner">
                    <div class="country-selected">
                        {{ countryStr }}
                    </div>
                    <div class="select-picker-suffix">
                        <el-icon v-if="isHover && !!countryStr" @click="clear">
                            <CircleCloseFilled />
                        </el-icon>
                        <!-- <el-icon class="arrow-down">
                            <ArrowDown />
                        </el-icon> -->
                    </div>
                </div>
            </div>
        </template>
        <div class="country-dropDown">
            <el-input v-model="filterText" placeholder="请输入国家名称搜索" />
            <el-checkbox
                v-model="onlyCheckAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
            >
                Check all
            </el-checkbox>
            <!-- 使用defaul-key会导致一些问题，建议使用setCheckedKey设置初始值 -->
            <el-tree
                class="oss-country-tree"
                ref="treeRef"
                :data="data"
                show-checkbox
                default-expand-all
                node-key="abb"
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                @check="handleTreeChange"
            />
        </div>
    </el-popover>
</template>
<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue"
import { onClickOutside } from "@vueuse/core"

//单个树单元的类型
interface Tree {
    code: string
    name: string
    children?: Tree[]
}

const props = withDefaults(
    defineProps<{
        data: Array<any>
        value: string
        defaultCheckAll?: boolean
        default?: string
    }>(),
    {
        defaultCheckAll: false,
        default: "",
    }
)

const emits = defineEmits<{
    (e: "update:value", val: string): void
    // (e: "update:checkAll", check: boolean): void
}>()

const defaultProps = {
    children: "children",
    label: "name",
}

//是否展开
const visible = ref(false)

//鼠标悬浮状态
const isHover = ref(false)

const treeRef = ref()

const countryStr = ref("")

watch(
    () => [props.default, props.defaultCheckAll],
    (newVal, oldVal) => {
        if (newVal[1]) {
            countryStr.value = "全部"
            setCheckedKey(allkeys.value)
        } else {
            countryStr.value = props.default || ""
            setCheckedKey(props.default.split(",") || [])
        }
        if (oldVal[1] !== newVal[1]) {
            onlyCheckAll.value = newVal[1] as boolean
        }
    }
)

//获取当前所有勾选状态
const getCheckedNodes = () => {
    console.log(treeRef.value!.getCheckedNodes(false, false))
    return treeRef.value!.getCheckedNodes(false, false)
}

//设置已勾选数据
const setCheckedKey = (keys: Array<any>) => {
    treeRef.value!.setCheckedKeys(keys, false)
}

const allkeys = computed(() => {
    let countriesArr: Array<any> = []
    props.data.forEach((continent) => {
        const { children } = continent
        children && countriesArr.push(...children)
    })
    return countriesArr.map((i) => i.abb)
})

const onlyCheckAll = ref(props.defaultCheckAll)
/* watch(
    () => props.defaultCheckAll,
    (newVal, oldVal) => {
        onlyCheckAll.value = newVal
    }
) */

/* //双向绑定全选状态
const isCheckAll = computed({
    get() {
        console.log("props.checkAll", props.defaultCheckAll)
        return props.defaultCheckAll || !isIndeterminate.value
    },
    set(value) {
        console.log("点击全选后", value)
        emits("update:checkAll", value)
    },
}) */

/* onMounted(() => {
    if (onlyCheckAll.value) {
        setCheckedKey(allkeys.value)
    } else {
        setCheckedKey(props.default.split(",") || [])
    }
}) */

/* 输入后筛选 */
const filterText = ref("")
watch(filterText, (val) => {
    treeRef.value!.filter(val)
})
const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.name.includes(value)
}

const handleChange = (val: string) => {
    emits("update:value", val)
    countryStr.value = val
}

//tree勾选国家事件
const handleTreeChange = (current: any, all: any) => {
    handleChange(all.checkedKeys.join(","))
    onlyCheckAll.value = all.checkedKeys.length === allkeys.value.length
    isIndeterminate.value =
        all.checkedKeys.length > 0 &&
        all.checkedKeys.length < allkeys.value.length
    // emits("update:checkAll", !isIndeterminate.value)
}

//清空
const clear = () => {
    setCheckedKey([])
    handleChange("")
    //关闭全选
    onlyCheckAll.value = false
    isIndeterminate.value = false
}

/* 全选checkbox处理 */
//半选状态
const isIndeterminate = ref(true)
watch(
    () => props.default,
    (newVal, oldVal) => {
        props.default.length > 0 && (isIndeterminate.value = true)
    }
)
const handleCheckAllChange = (val: boolean) => {
    const keyArr = val ? allkeys.value : []
    isIndeterminate.value = false
    setCheckedKey(keyArr)
    handleChange(keyArr.join(","))
}

defineExpose({
    getCheckedNodes,
    setCheckedKey,
    isIndeterminate,
})
</script>

<style lang="less" scoped>
.select-picker-area {
    border: 1px solid #ced3d9;
    border-radius: 4px;
    background: #fff;
    color: #222;
    font-size: 14px;
    line-height: 1.5;
    display: inline-block;
    position: relative;
    min-width: 200px;
    &.open {
        border-color: #2e8ae6;
        .arrow-down {
            transform: rotate(180deg);
            &.hide {
                display: none;
            }
        }
    }
    .select-picker-inner {
        color: #222;
        font-size: 14px;
        line-height: 1.5;
        padding: 5px 10px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        .country-selected {
            height: 21px;
            color: #222;
            font-size: 14px;
            line-height: 1.5;
            cursor: pointer;
            width: 0;
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            user-select: none;
        }
        .select-picker-suffix {
            /* cursor: pointer;
            white-space: nowrap;
            line-height: 1;
            box-sizing: content-box;
            color: #888;
            font-size: 0;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center; */
        }
    }
}
.oss-country-tree {
    height: 400px;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
        background-color: #0003;
        border-radius: 10px;
        transition: all 0.2s ease-in-out;
    }
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }
}
</style>
