<!-- 全局vue组件  -->
<template>
    <div class="header">{{ name }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
interface Props {
    name: string
}
defineProps<Props>()
</script>

<!-- 写法二 -->
<!-- <script setup lang="ts">

defineProps(['name']);

</script> -->

<!-- 写法三 -->
<!-- <script lang="ts">
    export default {
        props: {
            name: String
        }
    }

</script> -->

<!-- 写法四 -->
<!-- <script lang="ts">
    export default {
        props: ['name'],
        setup(props){
            console.log(props.name)
        }
    }
</script>  -->

<style scoped>
.header {
    color: red;
}
</style>
