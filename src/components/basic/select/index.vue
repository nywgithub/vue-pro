<!--  -->
<template>
    <div class="select-wrap">
        <Input
            :value="value"
            @focus="focus"
            @blur="blur"
            :ref="getInputDom"
            readonly
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
import { ref, reactive, watch, computed } from "vue"
import dropDown from "./dropDown.vue"
import Input from "../input/index.vue"
import domAlign from "dom-align"

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
    display: "none",
})

function onSelect(item: any) {
    emit("update:value", item)
}

function focus() {
    align()
}

function blur() {
    dropStyle.display = "none"
}

function align() {
    domAlign(dropRef.value.dropDownRef, inputRef.value, {
        points: ["tl", "tl"],
        offset: [0, 22],
    })
}

function getInputDom(ref: any) {
    console.log(ref.inputRef)
    inputRef.value = ref.inputRef
}
</script>

<style scoped></style>
