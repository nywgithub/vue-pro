declare namespace HeaderCell {
    // 1-禁用 2-启用 3-草稿
    type status = 1 | 2 | 3
    //入口类型|1-一级入口,2-二级入口
    type entranceType = 1 | 2
    //查阅对象类型|0-全部,1-指定区域TARGET_COUNTRY
    type targetType = 0 | 1
    //当前入口排序序号, 从1 开始计算, 如果是第二个则传2
    type noFollow = 1 | 2
}
