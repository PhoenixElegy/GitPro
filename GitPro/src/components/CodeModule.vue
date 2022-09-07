<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps(["code"])

</script>
<template>
    <div class="codeString">
        {{props.code}}
    </div>
</template>

<style scope>
.codeString{
    padding-left: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 6px;
    background-color:lavender;
    color:crimson;
    letter-spacing: 1px;
}
</style>