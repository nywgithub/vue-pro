import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Header from "./components/global/Header.vue"
import moment from "moment"
import ElementPlus, { ElMessage } from "element-plus"
// 引入所有图标
import * as Icons from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import router from "./routers"
const app = createApp(App)

app.component("Header", Header)

// 循环注册所有图标
for (const name in Icons) {
    //name 为icon名称，也是组件名称。使用时：<Edit />，
    //也可以按需增加前缀或者后缀
    // eg: app.component(`eurake-name-${name}`,(Icons as any)[name])
    // 使用时：<eurake-name-Edit />
    // 当然你也可以写一个方法把首字母大写的图标名称改成小写等你想要的任意格式
    app.component(name, (Icons as any)[name])
}

app.use(router)
app.use(ElementPlus)

//挂载全局方法
app.config.globalProperties.$moment = moment
app.config.globalProperties.$message = ElMessage

app.mount("#app")
