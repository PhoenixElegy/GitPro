<script setup lang="ts">
import { ref , computed } from 'vue'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();
let name = ref<string>("")
const password = ref<string>("")
const disabled = computed({
    get: () => {
        return !(name.value.length > 0 && password.value.length > 0)
    },
    set : () => {}
})

console.log(store)

function login() {
    ElMessage({
        message: '登录成功，欢迎你',
        type: 'success',
        duration: 1000
    })
    setTimeout(() => {
        router.push({
            path: '/home'
        })
    }, 1000);
}
</script>

<template>
    <div id="container">
        <div id="loginMenu">
            <div id="icon"></div>
            <div class="input">
                <el-input v-model="name" prefix-icon="user" placeholder="请输入用户名"></el-input>
            </div>
            <div class="redLine"></div>
            <div class="input">
                <el-input v-model="password" prefix-icon="lock" placeholder="请输入密码" show-password></el-input>
            </div>
            <div class="input_login">
                <el-button @click="login" type="primary" :disabled="disabled"
                    style="width:500px ; background-color: #f07b7b 1; border : 0; font-size : 17px;">登录</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#container {
    background: #595959;
    background-image: url("../../assets/Arceus.jpg");
    height: 100%;
    width: 100%;
    position: absolute;
    background-size: 100% 100%;
}

#title {
    text-align: center;
    color: rgb(0, 0, 0);
    margin-top: 50px;
}

.input {
    margin: 20px auto;
    width: 80%;
}

.input_login {
    margin-top: 70px;
    text-align: center;
}


#loginMenu {
    position: absolute;
    height: 230px;
    width: 500px;
    background-color: rgb(59, 133, 144);
    top: 0;
    left: 250px;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
}

#icon {
    width: 120px;
    height: 120px;
    background-color: #fff;
    margin: -60px auto 1px;
    border-radius: 60px;
    background-image: url(../../assets/head.jpg);
    background-size: 100% 100%;
}

:deep(.el-input__wrapper) {
    border: 0;
    font-size: 17px;
    background-color: rgb(59, 133, 144, 0.85);
    border-color: rgb(59, 133, 144, 0.85);
}

:deep(.el-input__inner){
    color: #fff;
    border: 0;
}

:deep(.el-button) {
    background-color: rgba(237, 55, 10, 0.786);
    height: 40px;
}

.redLine {
    width: 90%;
    background-color: #ffffff;
    height: 3px;
    margin: 0 auto;
}
</style>

