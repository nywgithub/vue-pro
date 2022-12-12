import axios from "axios"

import { ElMessage } from "element-plus"

export type Response<T = any> = {
    code: number
    message: string
    data: T
}

//请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers = {
            ...(config.headers || {}),
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest",
        }
        return config
    },
    (err) => {
        ElMessage.error({ message: "网络错误!" })
        return Promise.resolve(err)
    }
)

//响应拦截器
axios.interceptors.response.use(
    (res) => {
        if (res.data.code === 0) {
            return res.data
        } else {
            res.data.message && ElMessage.error({ message: res.data.message })
            return Promise.reject(res.data)
        }
    },
    (err) => {
        // 异常的请求返回处理
        const data = {
            message: err.response?.data?.message || "请重试",
            code:
                err.response?.status !== 200
                    ? err.response?.status
                    : err.response?.data?.code,
        }
        throw data
    }
)

let host = "http://mfoss.vemic.com:8080"
// let host = 'http://127.0.0.1:4523/mock/821010'
export { axios, host }
