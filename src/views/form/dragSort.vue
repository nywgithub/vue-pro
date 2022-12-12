<template>
    <div class="oss-drag">
        <draggable
            :list="list"
            item-key="recId"
            class="list-group"
            ghost-class="ghost"
        >
            <template #item="{ element }">
                <div
                    class="list-group-item"
                    :class="{ 'not-draggable': element.disable }"
                >
                    {{ element.entranceName }}
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable"
export default {
    name: "dragSort",
    components: {
        draggable,
    },
    props: ["list"],
    data() {
        return {}
    },
    methods: {},
}
</script>
<style lang="less" scoped>
.buttons {
    margin-top: 35px;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.not-draggable {
    cursor: no-drop;
}
.list-group {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
    .list-group-item {
        cursor: move;
        position: relative;
        display: block;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        &:first-child {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
        }
        &:last-child {
            border-bottom-right-radius: inherit;
            border-bottom-left-radius: inherit;
        }
    }
}
</style>
