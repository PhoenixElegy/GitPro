<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const gridArray = reactive([
    {
        id: "0",
        isActive: "square"
    },
    {
        id: "1",
        isActive: "square"
    }, {
        id: "2",
        isActive: "square mole"
    }, {
        id: "3",
        isActive: "square"
    }, {
        id: "4",
        isActive: "square"
    }, {
        id: "5",
        isActive: "square"
    }, {
        id: "6",
        isActive: "square"
    }, {
        id: "7",
        isActive: "square"
    }, {
        id: "8",
        isActive: "square"
    },
])

let hitPosition: string
const score = ref(0)
let timeleft = ref(10)
let timeId: number
let countDownTimeId: number
let isStart = false
const randomSquare = function () {
    gridArray.forEach(grid => {
        grid.isActive = "square"
    })
    let randonId = Math.floor(Math.random() * 9)
    gridArray[randonId].isActive = "square mole"
    hitPosition = randonId.toString()
}

const moveMole = function () {
    timeId = setInterval(randomSquare, 1000)
}

const catchMole = function (choice: any) {
    if (isStart) {
        gridArray.forEach(grid => {
            if (grid.id == hitPosition) {
                score.value++
            }
        })
    }
}

const countDown = function () {
    timeleft.value--
    if (timeleft.value <= 0) {
        isStart = false
        clearInterval(countDownTimeId)
        clearInterval(timeId)
        ElMessage({
            type: 'success',
            message: 'Game Over! Your final score is ' + score.value
        })
    }
}

const StartGame = function () {
    isStart = true
    moveMole()
    countDownTimeId = setInterval(countDown, 1000)
}

const ResetGame = function () {
    timeleft.value = 10
    score.value = 0
}

</script>
<template>
    <h3>This is Game3: Whac-a-mole</h3>
    <h2>Your score: {{ score }}</h2>
    <h2>Time Left: {{ timeleft }}</h2>
    <div class="grid">
        <div v-for="grid in gridArray" :key="grid.id" :class="grid.isActive" @click="catchMole(grid)">
        </div>
    </div>
    <div style="height: 30px;"></div>
    <el-button @click="StartGame">StartGame</el-button>
    <el-button @click="ResetGame">ResetGame</el-button>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>
<style scoped>
.grid {
    width: 456px;
    display: flex;
    flex-wrap: wrap;
}

.square {
    height: 120px;
    width: 120px;
    border: solid black 1px;
}

.mole {
    background-image: url("/src/assets/MemoryGameImg/watermelon.jpg");
    background-size: cover;
}
</style>