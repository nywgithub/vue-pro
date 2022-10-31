import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Header from "./components/global/Header.vue"
import router from "./routers"
const app = createApp(App)

app.component("Header", Header)

app.use(router)

app.mount("#app")
