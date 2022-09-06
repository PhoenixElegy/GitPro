<script lang="ts" setup>
import { reactive, onUnmounted ,ref } from "vue";
const blockWidth = 100
const blockHeight = 20
const borderWidth = 560
const borderHeight = 300
const ballDiameter = 20
const userPosition = reactive({
    left: 230,
    bottom: 10
})
const ball = reactive({
    left: 270,
    bottom: 40
})
let timeId : number
let xDirection : number = -2
let yDirection : number = 2
const score = ref(0)
const result = ref()

class Block {
    constructor(xAxis: number, yAxis: number) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
    bottomLeft: Array<number>
    bottomRight: Array<number>
    topLeft: Array<number>
    topRight: Array<number>
}

const blocks = reactive([
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
])

//draw user
const drawUserLeft = function () {
    userPosition.left -= 10
}

const drawUserRight = function () {
    userPosition.left += 10
}

//move user 
const moveUser = function (e: KeyboardEvent) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userPosition.left > 0) drawUserLeft()
            break
        case 'ArrowRight':
            if (userPosition.left < borderWidth - blockWidth) drawUserRight()
            break
    }
}

//move ball
const moveBall = function (){
    ball.left += xDirection
    ball.bottom += yDirection
    checkForCollisions()
}

//check for collisions
const checkForCollisions = function() {
    //check for block collisions
    for( let i = 0; i < blocks.length;i++){
        if(
            (ball.left > blocks[i].bottomLeft[0] && ball.left < blocks[i].bottomRight[0]) && 
            ((ball.bottom + ballDiameter) > blocks[i].bottomLeft[1] && ball.bottom < blocks[i].topLeft[1])
        ){
            score.value++
            blocks.splice(i,1)
            changeDirection()

            //check for win 
            if(blocks.length === 0){
                result.value = "You Win!"
                clearInterval(timeId)
            }
        }
    }
    //check for wall collisions
    if( ball.left >= (borderWidth - ballDiameter) || 
        ball.bottom >= (borderHeight - ballDiameter) || 
        ball.left <= 0){
        changeDirection()
    }

    //check for user collisions
    if(
        (ball.left > userPosition.left && ball.left < userPosition.left + blockWidth) && 
        (ball.bottom > userPosition.bottom && ball.bottom < userPosition.bottom + blockHeight)
    ){
        changeDirection()
    }

    //check for game over
    if(ball.bottom <= 0){
        clearInterval(timeId)
        result.value = "You lose"
    }
}



const changeDirection = function () {
    if( xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if( xDirection === 2 && yDirection === -2){
        xDirection = -2
        return 
    }
    if( xDirection === -2 && yDirection === -2){
        yDirection = 2
        return 
    }
    if( xDirection === -2 && yDirection === 2){
        xDirection = 2
        return 
    }
}

timeId = setInterval( moveBall , 15 )

document.addEventListener('keydown', moveUser)

//组件销毁时，取消事件挂载，否则成为全页面事件
onUnmounted(() => {
    document.removeEventListener('keydown', moveUser)
})



</script>

<template>
    <h3>This is Game4: Breakout</h3>
    <h2>Your score: {{ score }}</h2>
    <h2>Result: {{ result }}</h2>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
    <div class="grid">
        <div class="ball" :style="{ left: ball.left + 'px', bottom: ball.bottom + 'px' }"></div>
        <div v-for="block in blocks" class="block"
            :style="{ left: block.bottomLeft[0] + 'px', bottom: block.bottomLeft[1] + 'px' }">
        </div>
        <div class="block user" :style="{ left: userPosition.left + 'px', bottom: userPosition.bottom + 'px' }"></div>
    </div>
</template>

<style scoped>
.grid {
    position: absolute;
    width: 560px;
    height: 300px;
    border: solid black 1px;
}

.block {
    position: absolute;
    width: 100px;
    height: 20px;
    background-color: blue;
}

.user {
    background-color: purple;
}

.ball {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: red;
}
</style>