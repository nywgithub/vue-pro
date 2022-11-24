<!-- 基于element的表单解决方案 -->
<template>
    <div class="form-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
        >
            <div class="title">修改页头配置</div>
            <el-form-item label="所属站点" prop="prop1">
                <el-select
                    v-model="ruleForm.prop1"
                    placeholder="请选择对应站点"
                >
                    <el-option
                        v-for="item in LANG"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item
                label="入口层级"
                prop="prop2_1"
                :required="ruleForm.prop2 === '子入口'"
            >
                <el-radio-group v-model="ruleForm.prop2">
                    <el-radio label="主入口" value="主入口" />
                    <el-radio label="子入口" value="子入口" />
                </el-radio-group>
                <el-select
                    v-show="ruleForm.prop2 === '子入口'"
                    placeholder="选择从属主入口"
                    v-model="ruleForm.prop2_1"
                >
                    <el-option
                        v-for="item in enters"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="入口名称" prop="prop3">
                <el-input
                    maxlength="20"
                    placeholder="最多输入20个字符"
                    v-model="ruleForm.prop3"
                />
            </el-form-item>

            <el-form-item
                label="查阅对象"
                prop="prop4_1"
                :required="ruleForm.prop4 === '部分区域' && isOpenCountry"
            >
                <el-radio-group v-model="ruleForm.prop4">
                    <el-radio label="全体" value="全体" />
                    <el-radio label="部分区域" value="部分区域" />
                </el-radio-group>
                <el-select
                    v-show="ruleForm.prop4 === '部分区域' && isOpenCountry"
                    placeholder="选择相应国家"
                    v-model="ruleForm.prop4_1"
                >
                    <el-option
                        v-for="item in countries"
                        :label="item.name"
                        :value="item.abb"
                    />s
                </el-select>
            </el-form-item>

            <el-form-item
                label="链接"
                prop="prop5"
                :required="ruleForm.prop2 === '子入口'"
            >
                <el-input
                    placeholder="必须是MIC站内链接MIC站内链接"
                    v-model="ruleForm.prop5"
                >
                    <template #prepend>Http://</template>
                </el-input>
            </el-form-item>

            <el-form-item label="悬浮提示文案" prop="prop6">
                <el-input
                    maxlength="100"
                    show-word-limit
                    autosize
                    v-model="ruleForm.prop6"
                    type="textarea"
                    placeholder="注意大小写准确，标点符号使用规范，最多输入100个字符"
                />
            </el-form-item>

            <el-form-item label="New标签" prop="prop7">
                <el-radio-group v-model="ruleForm.prop7">
                    <el-radio label="启用" value="启用" />
                    <el-radio label="关闭" value="关闭" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="开始时间" prop="prop8">
                <el-date-picker
                    v-model="ruleForm.prop8"
                    type="date"
                    placeholder="选择开始时间"
                    style="width: 100%"
                />
            </el-form-item>

            <el-form-item label="结束时间" prop="prop9">
                <el-date-picker
                    v-model="ruleForm.prop9"
                    type="date"
                    placeholder="选择结束时间"
                    style="width: 100%"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveForm(ruleFormRef)"
                    >保存</el-button
                >
            </el-form-item>
            <div class="title">确定入口位置</div>
            <el-form-item label="选位权重" prop="prop10">
                <el-select
                    placeholder="选择从属主入口"
                    v-model="ruleForm.prop10"
                >
                    <el-option
                        v-for="item in points"
                        :label="item"
                        :value="item"
                    />
                </el-select>
                <p>
                    1. 主入口权重范围为1-11分，子入口权重范围为1-6分。 2.
                    1分为最高权重，当主入口赋1分时，入口位于Categories右侧首位；子入口赋1分时，入口位于下拉菜单最上方；其余入口按数字大小依次排序。
                    3. 当某一入口失效时，右侧/下方入口依次递补。
                </p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="preview">预览</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >应用</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { countries } from "../data/country"
interface selectItem {
    label: string
    value: any
}

const LANG: Array<selectItem> = [
    {
        label: "英语",
        value: "en",
    },
    {
        label: "西班牙语",
        value: "es",
    },
    {
        label: "葡萄牙语",
        value: "pt",
    },
    {
        label: "法语",
        value: "fr",
    },
    {
        label: "俄语",
        value: "ru",
    },
    {
        label: "意大利语",
        value: "it",
    },
    {
        label: "德语",
        value: "gr",
    },
    {
        label: "荷兰语",
        value: "nt",
    },
    {
        label: "阿拉伯语",
        value: "sa",
    },
    {
        label: "韩语",
        value: "kr",
    },
    {
        label: "日语",
        value: "jp",
    },
]

const formSize = ref("default")
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive<any>({
    prop1: "en",
    prop2: "主入口",
    prop2_1: "",
    prop3: "",
    prop4: "全体",
    prop4_1: "",
    prop5: "",
    prop6: "",
    prop7: "关闭",
    prop8: "",
    prop9: "",
    prop10: "",
})

//主入口列表
const enters = ref<Array<selectItem>>([
    {
        label: "test",
        value: "test",
    },
])

//权重
const points = computed(() => {
    return ruleForm.prop2 === "主入口" ? 11 : 6
})

watch(
    () => ruleForm.prop2,
    (newVal, oldVal) => {
        newVal && (ruleForm.prop10 = "")
    }
)

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
    console.log(formEl)
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            console.log("submit!")
        } else {
            console.log("error submit!")
            return false
        }
    })
    console.log(ruleForm)
}

const saveForm = () => {
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
