<!--  -->
<template>
    <div class="department-box">
        <div class="user-info-area">
            <div class="search-area">
                <!-- <Input
                    :inputValue="inputValue"
                    @update:input-value="update"
                    placeholder="请输入"
                /> -->
                <Input
                    v-model:inputValue="inputValue"
                    placeholder="请输入名字"
                />
                <Select
                    :list="list"
                    @onSelect="onSelect"
                    v-model:value="value"
                    placeholder="选择一个部门"
                ></Select>
                <button @click="search">search</button>
            </div>
        </div>
        <div class="user-table">
            <Table :tableData="tableData"></Table>
            <Pager :total="tableData.length" :page-size="5" />
        </div>
        <div class="user-dep-tree">
            <!-- <Tree
                :dataSource="dataSource"
                :renderContent="renderContent"  
            ></Tree> -->
        </div>
        <Modal
            :visible="visible"
            @cancel="visible = false"
            @confirm="visible = false"
        ></Modal>
        <button @click="visible = true">show</button>
    </div>
</template>

<script setup lang="ts">
import { ref, h, shallowRef } from "vue"
import Input from "../components/basic/input/index.vue"
import Select from "../components/basic/select/index.vue"
import Pager from "../components/basic/pagenation/index.vue"
import Table from "./Tables.vue"
import tableData from "../data/table"
import Tree from "./Tree.vue"
import dataSource from "../data/tree"
import Modal from "./Modal.vue"
import type Node from "element-plus/es/components/tree/src/model/node"

interface Tree {
    id: number
    label: string
    children?: Tree[]
}

const inputValue = ref()

const value = ref()

const visible = ref(true)

// const getprevNode = h("div", "<")

function search() {
    const data = {
        name: inputValue.value,
        dep: value.value,
    }
    console.log(data)
}

/* function update(e: any) {
    inputValue.value = e
} */

const list = ref(["1", "2", "3"])

function onSelect(item: any) {
    console.log("选择:", item)
}

const append = (data: Tree) => {}

const remove = (node: Node, data: Tree) => {}

const renderContent = (
    h: any,
    {
        node,
        data,
        store,
    }: {
        node: Node
        data: Tree
        store: Node["store"]
    }
) => {
    return h(
        "span",
        {
            class: "custom-tree-node",
        },
        h("span", null, node.label),
        h(
            "span",
            null,
            h(
                "a",
                {
                    onClick: () => append(data),
                },
                "Append "
            ),
            h(
                "a",
                {
                    style: "margin-left: 8px",
                    onClick: () => remove(node, data),
                },
                "Delete"
            )
        )
    )
}
</script>

<style lang="less" scoped>
.department-box {
    background-color: aliceblue;
    .search-area {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
