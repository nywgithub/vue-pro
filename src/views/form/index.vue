<!-- 基于element的表单解决方案 -->
<template>
    <div class="oss-form-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="140px"
            class="oss-ruleForm"
            status-icon
        >
            <div class="title">
                <span>修改页头配置</span>
                <span></span>
            </div>

            <el-form-item label="所属站点：">
                {{ lanCodeCn }}
            </el-form-item>

            <el-form-item label="入口层级：">
                {{ entry === "1" ? "主入口" : "子入口" }}
            </el-form-item>

            <el-form-item
                label="从属主入口："
                prop="parentName"
                v-if="entry === '2'"
            >
                <el-select
                    placeholder="选择从属主入口"
                    v-model="ruleForm.parentName"
                >
                    <el-option
                        v-for="item in entries"
                        :label="item.entranceName"
                        :value="item.recId"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="入口名称：" prop="entranceName">
                <el-input
                    maxlength="20"
                    placeholder="最多输入20个字符"
                    v-model="ruleForm.entranceName"
                />
            </el-form-item>

            <el-form-item label="查阅对象：" prop="targetCountry">
                <CountrySelector
                    ref="countrySelectRef"
                    v-model:value="ruleForm.targetCountry"
                    showCheckAll
                    :data="countryData"
                    :default="defaultCountryStr"
                    :defaultCheckAll="isCheckAll"
                ></CountrySelector>
            </el-form-item>

            <el-form-item label="站内链接：" prop="targetLink">
                <el-input
                    placeholder="必须是MIC站内链接MIC站内链接"
                    v-model="ruleForm.targetLink"
                >
                    <template #prepend>Https://</template>
                </el-input>
            </el-form-item>

            <el-form-item
                v-if="ruleForm.targetLink"
                label="设为No Follow："
                prop="noFollow"
            >
                <el-radio-group v-model="ruleForm.noFollow">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <p>No Follow设置请与推广部确认</p>
            </el-form-item>

            <el-form-item label="悬浮提示文案：" prop="coverDesc">
                <el-input
                    maxlength="100"
                    show-word-limit
                    autosize
                    v-model="ruleForm.coverDesc"
                    type="textarea"
                    placeholder="注意大小写准确，标点符号使用规范，最多输入100个字符"
                />
                <p>注意大小写准确，标点符号使用规范</p>
            </el-form-item>

            <el-form-item label="New标签：" prop="showNew">
                <el-radio-group v-model="ruleForm.showNew">
                    <el-radio :label="true">开启</el-radio>
                    <el-radio :label="false">关闭</el-radio>
                </el-radio-group>
                <p>New 标签时效为1个月</p>
            </el-form-item>

            <el-form-item label="应用时间：" prop="effectiveDate">
                <el-date-picker
                    v-model="ruleForm.effectiveDate"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                />
            </el-form-item>

            <el-form-item label="入口排序：" prop="queue">
                <DragSort :list="sortList" />
            </el-form-item>

            <el-form-item>
                <el-button type="default" @click="saveForm(ruleFormRef)">
                    保存为草稿
                </el-button>
                <el-button type="default" @click="preview">点击预览</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    立即应用
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import type { FormInstance, FormRules } from "element-plus"
import { countries, continents } from "../../data/country"
import { LANG, langType } from "../../model/lang"
import DragSort from "./dragSort.vue"
import CountrySelector from "../../components/countrySelector.vue"
import { getEntranceDetail, getValidEntranceList } from "../../api/index"
import { detail, list, sortListDemo } from "../../data/detail"
//路由信息
const router = useRouter()
const route = useRoute()

const { recId, lanCode, entry, status } = route.query as any

const formTitle = computed(() => {})

const lanCodeCn = computed(() => {
    let str = ""
    LANG.some((item: langType) => {
        if (item.value === lanCode) {
            str = item.label
            return true
        }
    })
    return str
})

const ruleFormRef = ref<FormInstance>()

const ruleForm = ref<any>({
    entranceType: "",
    entranceName: "",
    lanCode: "",
    targetType: "",
    targetCountry: "",
    targetLink: "",
    coverDesc: "",
    showNew: false,
    noFollow: "",
    effectiveDate: "",
    parentName: "",
    queue: [],
})

//国家选择器
const isCheckAll = ref(false)
const defaultCountryStr = ref("")
const countrySelectRef = ref()
const countryData = continents.map((continent) => {
    let countryArr: Array<any> = []
    countries.forEach((country) => {
        //把州匹配的国家放入数组
        if (country.continent === continent.code) {
            countryArr.push(country)
        }
    })
    return {
        ...continent,
        children: countryArr,
    }
})

//主入口列表
interface selectItem {
    recId: number
    entranceName: string
}
const entries = ref<Array<selectItem>>([])

//排序列表
const sortList = ref()

//启用数量是否已达上限
const isMaxApplied = ref(false)

//初始化获取所有数据
onMounted(() => {
    /*
    const getDetail = async () => {
        const res = await getEntranceDetail({
            recId,
        })
        const { maxApplied, startTime, endTime, queue, ...formData } = res.data
        sortList.value = queue
        ruleForm.value = formData
        ruleForm..value.effectiveDate = [startTime, endTime]
        isMaxApplied.value = maxApplied
    }
    const getValidEntrance = async () => {
        const res = await getValidEntranceList({
            recId,
            lanCode,
        })
        entries.value = res.data || []
    }
    getDetail()
    getValidEntrance() */

    //test-模拟请求
    setTimeout(() => {
        const { maxApplied, startTime, endTime, ...formData } = detail
        ruleForm.value = formData
        ruleForm.value.effectiveDate = [startTime, endTime]
        isCheckAll.value = ruleForm.value.targetType === "0"
        defaultCountryStr.value = ruleForm.value.targetCountry
        console.log(ruleForm.value.targetType)
        isMaxApplied.value = maxApplied
        entries.value = list
        sortList.value = sortListDemo
    })
})

//查阅对象是否开放国家
const isOpenCountry = ref<boolean>(true)

//是否点击保存
const isSaveClicked = ref<boolean>(false)

//入口名称校验，trigger:blur
const validateProp3 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请填写入口名称"))
    } else {
        callback()
    }
}

//子入口-附加下拉菜单校验，trigger:保存
const validateProp2_1 = (rule: any, value: any, callback: any) => {
    //限制点击保存才触发
    if (!isSaveClicked.value) return
    if (value === "test") {
        callback(new Error("当前所属主入口生效时间为xx至xx，是否确认保存"))
    } else {
        callback()
    }
}

//New标签校验，trigger:保存
const validateProp7 = (rule: any, value: any, callback: any) => {}

//链接校验
const validateProp5 = (rule: any, value: any, callback: any) => {
    if (value === "" && ruleForm.prop2 === "子入口") {
        callback(new Error("请填写链接"))
    } else {
        callback()
    }
}

//权重校验
const validateProp10 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请选择权重"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    prop2_1: [
        {
            required: true,
            message: "请选择国家",
            trigger: "blur",
        },
        {
            validator: validateProp2_1,
        },
    ],
    prop3: [
        /*  {
            required: true,
            message: "请输入入口名称",
            trigger: "blur",
        }, */
        {
            validator: validateProp3,
            trigger: "blur",
        },
    ],
    prop4_1: [
        {
            required: true,
            message: "请选择国家",
            trigger: "blur",
        },
    ],
    prop5: [
        {
            validator: validateProp5,
            trigger: "trigger",
        },
    ],
    prop7: [
        {
            validator: validateProp7,
        },
    ],
    prop10: [
        {
            validator: validateProp10,
        },
    ],
})

const submitForm = (formEl: FormInstance | undefined) => {
    console.log(
        "sortList",
        sortList.value.map((i: any) => i.recId)
    )
    console.log("countrySelectedStr", ruleForm.value.targetCountry)
    console.log("是否全选状态", !countrySelectRef.value.isIndeterminate)
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            console.log("submit!")
        } else {
            console.log("error submit!")
            return false
        }
    })
    console.log("ruleForm", ruleForm)
}

const saveForm = (formEl: FormInstance | undefined) => {
    isSaveClicked.value = true
    console.log("保存数据", ruleForm)
}

const preview = () => {}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
</script>
<style lang="less" scoped>
.title {
    text-align: left;
    padding: 10px;
}
</style>
