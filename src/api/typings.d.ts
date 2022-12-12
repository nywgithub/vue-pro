//业务接口相关的类型
declare namespace API {
    type getHeaderListParams = {
        entranceName?: string
        lanCode?: number
        startTime?: number | ""
        endTime?: number | ""
        status?: HeaderCell.status
        page?: number
    }

    type getEntranceDetailParams = {
        recId: number
    }

    type getValidEntranceListParams = {
        recId: number
        lanCode: string
    }

    type switchEntranceTypes = {
        recId: number
        status: string
    }

    type saveEntranceTypes = {
        recId: number
        entranceType: HeaderCell.entranceType
        entranceName: string
        lanCode: string
        parentId: string
        targetType: HeaderCell.targetType
        targetCountry: string
        targetLink: string
        coverDesc: string
        showNew: boolean
        noFollow: HeaderCell.noFollow
        startTime: number
        endTime: number
        position: number
    }
}
