<!--  -->
<template>
    <div class="select-wrap">
        <Input
            :value="value"
            @focus="focus"
            :ref="getInputDom"
            readonly
            v-bind="$attrs"
        />
    </div>
    <dropDown
        v-bind="$attrs"
        ref="dropRef"
        :style="dropStyle"
        @onSelect="onSelect"
    />
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, nextTick } from "vue"
import dropDown from "./dropDown.vue"
import Input from "../input/index.vue"
import domAlign from "dom-align"
import { onClickOutside } from "@vueuse/core"

withDefaults(
    defineProps<{
        value?: any
    }>(),
    {}
)

const emit = defineEmits<{
    (e: "update:value", item: any): void
}>()

const inputRef = ref()

const dropRef = ref()

const dropStyle = reactive({
    display: "block",
})

function onSelect(item: any) {
    emit("update:value", item)
}

async function focus() {
    dropStyle.display = "block"
    await nextTick
    align()
    /* nextTick(() => {
        align()
    }) */
}

function align() {
    domAlign(dropRef.value.dropDownRef, inputRef.value, {
        points: ["tl", "tl"],
        offset: [0, 22],
    })
}

function getInputDom(ref: any) {
    inputRef.value = ref.inputRef
}

watch(
    () => inputRef.value,
    (newVal) => {
        newVal &&
            onClickOutside(inputRef.value, (event) => {
                dropStyle.display = "none"
            })
    }
)
</script>

<style scoped></style>
