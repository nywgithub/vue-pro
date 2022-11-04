<!--  -->
<template>
    <div class="pager-wrap">
        <div class="total">总数：{{ total }}</div>
        <div class="prev">
            <component :is="prevNode"></component>
        </div>

        <ul>
            <li v-if="">
                1
            </li>
            <li>
                <span v-if="">... </span>
                <span v-else> << </span>
            </li>
            <li v-for="item in">
                </li>
            <li><span v-if="">... </span>
                <span v-else> >> </span></li>
            <li>
                {{totalPage}}
            </li>
        </ul>

        <div class="next">
            <component :is="prevNode"></component>
        </div>
        <div class="jumper">
            go to
            <Input v-model:input-value="jumper" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
import Input from "../input/index.vue"

</script>

<style scoped></style>
