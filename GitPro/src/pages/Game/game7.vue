<script lang="ts" setup>
import { useCheckboxGroupProps } from 'element-plus/lib/components';
import { reactive, ref , onUnmounted} from 'vue'

let direction = 1
let invaderID: number
let goingRight = true
const result = ref()
const score = ref(0)
let aliensRemeved: Array<number> = []
//构造数组
const gridArray = reactive(
    Array.from({ length: 225 }, () => ({ class: "" }))
)
let currentShooterIndex = 202
gridArray[currentShooterIndex].class += " shooter"

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]


const draw = function () {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemeved.includes(i) && alienInvaders[i] < gridArray.length) {
            gridArray[alienInvaders[i]].class += " invader"
        }
    }
}

draw()

const remove = function () {
    for (let i = 0; i < alienInvaders.length; i++) {
        gridArray[alienInvaders[i]].class = gridArray[alienInvaders[i]].class.replace("invader", "")
    }
}


const width = 15
console.log(gridArray)
const moveShooter = function (e: KeyboardEvent) {
    gridArray[currentShooterIndex].class = gridArray[currentShooterIndex].class.replace('shooter', '')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    gridArray[currentShooterIndex].class += " shooter"
}

const moveInvaders = function () {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === (width - 1)
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > gridArray.length) {
            result.value = "GAME OVER!"
            clearInterval(invaderID)
        }
    }

    if (gridArray[currentShooterIndex].class.search("invader") != -1) {
        result.value = "GAME OVER!"
        clearInterval(invaderID)
    }

    if (aliensRemeved.length === alienInvaders.length) {
        result.value = "YOU WIN!"
        clearInterval(invaderID)
    }
}

const shoot = function (e: KeyboardEvent) {
    let laserId: number
    let currentLaserIndex = currentShooterIndex
    const moveLaser = function () {
        if(currentLaserIndex >= 0 ) gridArray[currentLaserIndex].class = gridArray[currentLaserIndex].class.replace("laser", "")
        currentLaserIndex -= width
        if(currentLaserIndex >= 0 ) gridArray[currentLaserIndex].class += " laser"

        if (currentLaserIndex >= 0 && gridArray[currentLaserIndex].class.search("invader") != -1) {
            gridArray[currentLaserIndex].class = gridArray[currentLaserIndex].class.replace("laser", "")
            gridArray[currentLaserIndex].class = gridArray[currentLaserIndex].class.replace("invader", "")
            gridArray[currentLaserIndex].class += " boom"
            setTimeout(() => {
                gridArray[currentLaserIndex].class = gridArray[currentLaserIndex].class.replace("boom", "")
            }, 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemeved.push(alienRemoved)
            score.value++
        }
    }

    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break
    }
}

invaderID = setInterval(moveInvaders, 1000)

document.addEventListener('keydown', moveShooter)
document.addEventListener('keydown', shoot)

onUnmounted(() => {
    document.removeEventListener('keydown', moveInvaders)
    document.removeEventListener('keydown', shoot)
})
</script>
<template>
    <h3>This is Game4: Connect Four</h3>
    <h2>Result: {{ result }}</h2>
    <h2>Score: {{ score }}</h2>
    <div class="grid">
        <div v-for="(grid, index) in gridArray" :key="index" :class="grid.class"></div>
    </div>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>

<style scoped>
.grid {
    width: 300px;
    height: 300px;
    border: solid 1px black;
    display: flex;
    flex-wrap: wrap;
}

.grid div {
    width: 20px;
    height: 20px;
}

.invader {
    background-color: purple;
    border-radius: 10px;
}

.shooter {
    background-color: green;
}

.laser {
    background-color: orange;
    ;
}

.boom {
    background-color: red;
}
</style>