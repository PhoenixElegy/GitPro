<script lang="ts" setup>
import { reactive , ref } from 'vue';
const squaresArray = reactive([
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: "ending-block"
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: "log-left l1"
    },
    {
        class: "log-left l2"
    },
    {
        class: "log-left l3"
    },
    {
        class: "log-left l4"
    },
    {
        class: "log-left l5"
    },
    {
        class: "log-left l1"
    },
    {
        class: "log-left l2"
    },
    {
        class: "log-left l3"
    },
    {
        class: "log-left l4"
    },
    {
        class: "log-right l5"
    },
    {
        class: "log-right l1"
    },
    {
        class: "log-right l2"
    },
    {
        class: "log-right l3"
    },
    {
        class: "log-right l4"
    },
    {
        class: "log-right l5"
    },
    {
        class: "log-right l1"
    },
    {
        class: "log-right l2"
    },
    {
        class: "log-right l3"
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: "car-left c1"
    },
    {
        class: "car-left c2"
    },
    {
        class: "car-left c3"
    },
    {
        class: "car-left c1"
    },
    {
        class: "car-left c2"
    },
    {
        class: "car-left c3"
    },
    {
        class: "car-left c1"
    },
    {
        class: "car-left c2"
    },
    {
        class: "car-left c3"
    },
    {
        class: "car-right c1"
    },
    {
        class: "car-right c2"
    },
    {
        class: "car-right c3"
    },
    {
        class: "car-right c1"
    },
    {
        class: "car-right c2"
    },
    {
        class: "car-right c3"
    },
    {
        class: "car-right c1"
    },
    {
        class: "car-right c2"
    },
    {
        class: "car-right c3"
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: "starting-block"
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
    {
        class: ""
    },
])

let currentIndex = 76
const width = 9
const result = ref()
let timerId :any
const secondsleft = ref(20)

const moveFrog = function (e: KeyboardEvent) {
    squaresArray[currentIndex].class = squaresArray[currentIndex].class.replace("frog", " ")
    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1
            break
        case 'ArrowRight':
            if (currentIndex % width < width - 1) currentIndex += 1
            break
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width
            break
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width
            break
    }
    squaresArray[currentIndex].class += " frog"
}

const autoMoveLogs = function () {
    for (let i = 18; i < 27; i++) {
        moveLogLeft(squaresArray[i])
    }
    for (let i = 36; i > 27; i--) {
        moveLogRight(squaresArray[i])
    }
}

const autoMoveCars = function () {
    for (let i = 45; i < 54; i++) {
        moveCarLeft(squaresArray[i])
    }
    for (let i = 54; i < 63; i++) {
        moveCarRight(squaresArray[i])
    }
}

const moveLogLeft = function (item: { class: string }) {
    switch (true) {
        case item.class.search("l1") != -1:
            item.class = item.class.replace("l1", "l2")
            break
        case item.class.search("l2") != -1:
            item.class = item.class.replace("l2", "l3")
            break
        case item.class.search("l3") != -1:
            item.class = item.class.replace("l3", "l4")
            break
        case item.class.search("l4") != -1:
            item.class = item.class.replace("l4", "l5")
            break
        case item.class.search("l5") != -1:
            item.class = item.class.replace("l5", "l1")
            break
    }
}

const moveLogRight = function (item: { class: string }) {
    switch (true) {
        case item.class.search("l1") != -1:
            item.class = item.class.replace("l1", "l5")
            break
        case item.class.search("l2") != -1:
            item.class = item.class.replace("l2", "l1")
            break
        case item.class.search("l3") != -1:
            item.class = item.class.replace("l3", "l2")
            break
        case item.class.search("l4") != -1:
            item.class = item.class.replace("l4", "l3")
            break
        case item.class.search("l5") != -1:
            item.class = item.class.replace("l5", "l4")
            break
    }
}

const moveCarLeft = function (item: { class: string }) {
    switch (true) {
        case item.class.search("c1") != -1:
            item.class = item.class.replace("c1", "c2")
            break
        case item.class.search("c2") != -1:
            item.class = item.class.replace("c2", "c3")
            break
        case item.class.search("c3") != -1:
            item.class = item.class.replace("c3", "c1")
            break
    }
}

const moveCarRight = function (item: { class: string }) {
    switch (true) {
        case item.class.search("c1") != -1:
            item.class = item.class.replace("c1", "c3")
            break
        case item.class.search("c2") != -1:
            item.class = item.class.replace("c2", "c1")
            break
        case item.class.search("c3") != -1:
            item.class = item.class.replace("c3", "c2")
            break
    }
}

const autoMoveElements = function () {
    secondsleft.value--
    autoMoveLogs()
    autoMoveCars()
    lose()
    win()
}

const lose = function () {
    if (squaresArray[currentIndex].class.search("c1") != -1 ||
        squaresArray[currentIndex].class.search("l1") != -1 ||
        squaresArray[currentIndex].class.search("l2") != -1 ||
        squaresArray[currentIndex].class.search("l3") != -1 || 
        secondsleft.value <= 0) {
        result.value = "You lose!"
        clearInterval(timerId)
        document.removeEventListener('keydown',moveFrog)
    }
}

const win = function (){
    if(currentIndex === 4){
        result.value = "You win!"
        clearInterval(timerId)
        document.removeEventListener('keydown',moveFrog)
    }
}

const StopFn = function (){
    console.log(timerId)
    if(timerId){
        clearInterval(timerId)
        timerId = null
        document.removeEventListener('keydown',moveFrog)
    }
    else{
        timerId = setInterval( autoMoveElements , 1000)
        document.addEventListener('keydown', moveFrog)
    }
}

</script>
<template>
    <h3>This is Game5: Frogger</h3>
    <h2>Secconds left: {{secondsleft}}</h2>
    <h2>Result: {{result}}</h2>
    <el-button @click="StopFn">Stop/Start</el-button>
    <div style="height: 30px;" ></div>
    <div class="grid">
        <div v-for="square in squaresArray" :class="square.class"></div>
    </div>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>

<style scoped>
.grid {
    border: solid 1px black;
    height: 180px;
    width: 180px;
    display: flex;
    flex-wrap: wrap;
}

.grid div {
    height: 20px;
    width: 20px;
}

.ending-block {
    background-color: blue;
}

.starting-block {
    background-color: red;
}

.log-left,
.log-right {
    background-color: lightblue;
}

.car-left,
.car-right {
    background-color: lightgray;
}

.frog {
    background-color: green !important;
}

.l1,
.l2,
.l3 {
    background-color: brown;
}

.l4,
.l5 {
    background-color: lightblue;
}

.c1 {
    background-color: black;
}

.c2,
.c3 {
    background-color: lightgrey;
}
</style>