import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Header from "./components/global/Header.vue"
const app = createApp(App)

app.component("Header", Header)

app.mount("#app")
