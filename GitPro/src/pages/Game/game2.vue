<script setup lang="ts">
import { GameCard } from '../../utils/interface'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

let isSuccess: number = 0
const result = ref()
const cardsArray: Array<GameCard> = reactive([
    {
        id: "0",
        name: "banana.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "1",
        name: "boy.png",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "2",
        name: "cake.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "3",
        name: "choculate.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "4",
        name: "girl.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "5",
        name: "milk.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "6",
        name: "banana.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "7",
        name: "boy.png",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "8",
        name: "cake.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "9",
        name: "choculate.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "10",
        name: "girl.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
    {
        id: "11",
        name: "milk.jpg",
        default: "/src/assets/MemoryGameImg/blank.png",
        type: "default"
    },
])

//随机排序
cardsArray.sort(() => 0.5 - Math.random())

let cardChoosen: GameCard[] = []

//------------获得所有image的引用---------------------
const cardAllDom = ref([])
const imgRefs = (el: any) => {
    (cardAllDom.value as Array<HTMLElement>).push(el)
    //类型断言为HTMLImageElement，否则警告不含有src属性
    //const picDom = evt.target as HTMLImageElement
    //picDom.src = card.img
}
//---------------------------------------------------

const checkMatch = function (evt: Event, card: any) {
    if (card.type === "default") {
        for (let i = 0; i < cardsArray.length; i++) {
            if (card.id === cardsArray[i].id) {
                cardsArray[i].default = "/src/assets/MemoryGameImg/" + cardsArray[i].name
            }
        }
        cardChoosen.push(card)
        if (cardChoosen.length == 2) {
            setTimeout(() => {
                if (cardChoosen[0].name === cardChoosen[1].name) {
                    isSuccess++
                    ElMessage({
                        message: 'You find a match!',
                        type: 'success',
                        duration: 1000
                    })
                    for (let i = 0; i < cardsArray.length; i++) {
                        if (cardChoosen[0].id === cardsArray[i].id) {
                            cardsArray[i].default = "/src/assets/MemoryGameImg/white.jpg"
                            cardsArray[i].type = "isMatch"
                        }
                        if (cardChoosen[1].id === cardsArray[i].id) {
                            cardsArray[i].default = "/src/assets/MemoryGameImg/white.jpg"
                            cardsArray[i].type = "isMatch"
                        }
                    }
                    cardChoosen = []
                }
                else {
                    for (let i = 0; i < cardsArray.length; i++) {
                        if (cardChoosen[0].id === cardsArray[i].id) {
                            cardsArray[i].default = "/src/assets/MemoryGameImg/blank.png"
                        }
                        if (cardChoosen[1].id === cardsArray[i].id) {
                            cardsArray[i].default = "/src/assets/MemoryGameImg/blank.png"
                        }
                    }
                    cardChoosen = []
                }
            }, 500);
            if (isSuccess == 5) {
                result.value = "You find all the match!"
            }
        }
    }

}

const ResetGame = function () {
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].type = "default"
        cardsArray[i].default = "/src/assets/MemoryGameImg/blank.png"
    }
    isSuccess = 0
}

</script>
<template>
    <h3>This is Game2: Memory Game</h3>
    <h3>Result: <span>{{  result  }}</span></h3>
    <div style="width: 480px">
        <div v-for="(card, index) in cardsArray" :key="card.id" class="pic" @click="checkMatch($event, card)">
            <img :src="card.default" :ref="imgRefs">
        </div>
    </div>
    <el-button @click="ResetGame">Reset</el-button>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>

<style scoped>
.pic {
    height: 120px;
    width: 120px;
    display: flex;
    display: inline-block;
}

.pic img {
    height: 120px;
    width: 120px;
}
</style>