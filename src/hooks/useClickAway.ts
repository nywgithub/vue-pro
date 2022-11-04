// mouse.js
import { ref, onMounted, onUnmounted } from "vue"

// 按照惯例，组合式函数名以“use”开头
export function useClickAway() {
    const isClick = ref<boolean>(false)

    return { isClick }
}
