interface ListItem {
    recId: number
    //入口类型|1-一级入口,2-二级入口
    entranceType: HeaderCell.entranceType
    entranceName: string
    //查阅对象类型|0-全部,1-指定区域TARGET_COUNTRY
    targetType: HeaderCell.targetType
    targetLink: string
    startTime: number
    endTime: number
    // 1-禁用 2-启用 3-草稿
    status: HeaderCell.status
    parentId: number
    index: number
    updateTime: number
    updaterName: string
    hasChildren: boolean
}

export type { ListItem }
