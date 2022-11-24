<!-- modal -->
<template>
    <div class="modal-box">
        <el-dialog
            :visible="true"
            title="Tips"
            width="30%"
            :before-close="handleClose"
        >
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('cancel')">Cancel</el-button>
                    <el-button type="primary" @click="$emit('confirm')">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, h, shallowRef, nextTick } from "vue"
const props = withDefaults(
    defineProps<{
        visible: boolean
    }>(),
    {
        visible: false,
    }
)

const emits = defineEmits<{
    (e: "cancel"): void
    (e: "confirm"): void
    (e: "beforeClose"): void
}>()

const handleClose = (done: () => void) => {
    done()
    emits("beforeClose")
}
</script>

<style scoped></style>
