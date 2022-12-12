import { axios, host } from "../utils/request"

//查询列表
export const getEntranceList = (params: API.getHeaderListParams) => {
    return axios({
        url: `${host}/site/header/entrance/query`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        params,
    })
}

//获取节点详情
export const getEntranceDetail = (params: API.getEntranceDetailParams) => {
    return axios({
        url: `${host}/site/header/entrance/detail`,
        method: "get",
        params,
    })
}

//列出生效入口(子入口选择主入口时, 或者子入口排序时)
export const getValidEntranceList = (
    params: API.getValidEntranceListParams
) => {
    return axios({
        url: `${host}/site/header/entrance/listValid`,
        method: "get",
        params,
    })
}

//保存入口配置信息
export const saveEntrance = (data: API.saveEntranceTypes) => {
    return axios({
        url: `${host}/trade/refund/cancel.do`,
        method: "post",
        data,
    })
}

//入口信息 禁用/启用/删除
export const switchEntrance = (data: API.switchEntranceTypes) => {
    return axios({
        url: `${host}/trade/refund/cancel.do`,
        method: "post",
        data,
    })
}
