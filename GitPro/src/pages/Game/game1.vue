<script setup lang="ts">
import { ref } from 'vue'
import { Generates } from "../../utils/function"
const generater = new Generates(0)
const choiceArr: Array<string> = ["Rock", "Paper", "Scissos"]
const computerChoiceDom = ref<HTMLElement | null>(null)
const userChoiceDom = ref<HTMLElement | null>(null)
const result = ref<HTMLElement | null>(null)

//---------------------循环获取dom--------------------------
const arrDom = ref([])
const possibleChoice = (el: HTMLElement) => {
    (arrDom.value as Array<HTMLElement>).push(el)
}
arrDom.value.forEach(element => {

})
//---------------------------------------------------------

const rockClick = function () {
    if (userChoiceDom.value) {
        //类型断言为非空
        userChoiceDom.value!.innerHTML = "Rock"
    }
    computerChoice()
    GetResult()
}

const paperClick = function () {
    if (userChoiceDom.value) {
        //类型断言为非空
        userChoiceDom.value!.innerHTML = "Paper"
    }
    computerChoice()
    GetResult()
}

const scissorsClick = function () {
    if (userChoiceDom.value) {
        //类型断言为非空
        userChoiceDom.value!.innerHTML = "Scissos"
    }
    computerChoice()
    GetResult()
}

const computerChoice = function () {
    if (computerChoiceDom.value) {
        //[waring]不能将类型“string | undefined”分配给类型“string”。不能将类型“undefined”分配给类型“string”
        //使用类型断言 as 判断右侧值为string
        computerChoiceDom.value!.innerHTML = generater.SpecifiedString(choiceArr) as string
    }
}

const GetResult = function () {
    if (computerChoiceDom.value?.innerHTML === userChoiceDom.value?.innerHTML) {
        result.value!.innerHTML = "It is a draw!"
    }
    if (computerChoiceDom.value?.innerHTML === "Rock" && userChoiceDom.value?.innerHTML === "Scissos") {
        result.value!.innerHTML = "You lost!"
    }
    if (computerChoiceDom.value?.innerHTML === "Rock" && userChoiceDom.value?.innerHTML === "Paper") {
        result.value!.innerHTML = "You win!"
    }
    if (computerChoiceDom.value?.innerHTML === "Paper" && userChoiceDom.value?.innerHTML === "Rock") {
        result.value!.innerHTML = "You lost!"
    }
    if (computerChoiceDom.value?.innerHTML === "Paper" && userChoiceDom.value?.innerHTML === "Scissos") {
        result.value!.innerHTML = "You win!"
    }
    if (computerChoiceDom.value?.innerHTML === "Scissos" && userChoiceDom.value?.innerHTML === "Paper") {
        result.value!.innerHTML = "You lost!"
    }
    if (computerChoiceDom.value?.innerHTML === "Scissos" && userChoiceDom.value?.innerHTML === "Rock") {
        result.value!.innerHTML = "You win!"
    }
}

</script>
<template>
    <h3>This is Game1: Rock Paper Scissors Tutorial</h3>
    <h2>Computer Choice: <span ref="computerChoiceDom"></span></h2>
    <h2>Your Choice: <span ref="userChoiceDom"></span></h2>
    <h2>Result: <span ref="result"></span></h2>

    <el-button :ref="possibleChoice" @click="rockClick">Rock</el-button>
    <el-button :ref="possibleChoice" @click="paperClick">Paper</el-button>
    <el-button :ref="possibleChoice" @click="scissorsClick">Scissors</el-button>

    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>