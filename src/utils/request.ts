import axios from "axios"
import { getCurrentInstance } from "vue"

const { proxy }: any = getCurrentInstance()

const { $message } = proxy

export type Response<T = any> = {
    code: number
    message: string
    data: T
}

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
        $message.error({ message: "请求超时!" })
        return Promise.resolve(err)
    }
)
axios.interceptors.response.use((res) => {
    if (res.data.code === 0) {
        return res.data
    } else {
        res.data.message && $message.error({ message: res.data.message })
        return Promise.reject(res.data)
    }
})

let host = ""
// let host = 'http://127.0.0.1:4523/mock/821010'
export { axios, host }
