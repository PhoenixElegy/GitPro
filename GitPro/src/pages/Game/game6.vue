<script lang="ts" setup>
import { reactive ,ref } from 'vue'

let currentPlayer = 1
const result = ref()
const gridArray = reactive([
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: ''
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
    {
        class: 'taken'
    },
])

const checkBoard = function () {
    for (let y = 0; y < winningArray.length; y++) {
        const grid1 = gridArray[winningArray[y][0]]
        const grid2 = gridArray[winningArray[y][1]]
        const grid3 = gridArray[winningArray[y][2]]
        const grid4 = gridArray[winningArray[y][3]]
        if (grid1.class.search("player-one") != -1&&
            grid2.class.search("player-one") != -1&&
            grid3.class.search("player-one") != -1&&
            grid4.class.search("player-one") != -1) {
                result.value = "Player One Win!"
        }
        if (grid1.class.search("player-two") != -1&&
            grid2.class.search("player-two") != -1&&
            grid3.class.search("player-two") != -1&&
            grid4.class.search("player-two") != -1) {
                result.value = "Player Two Win!"
        }
    }
}

const winningArray = [
    //
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],

    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],

    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],

    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],

    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],

    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],

    //
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],

    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],

    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],

    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],

    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],

    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],

    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],

    //
    [0,8,16,24],
    [1,9,17,25],
    [2,10,18,26],
    [3,11,19,27],

    [7,15,23,31],
    [8,16,24,32],
    [9,17,25,33],
    [10,18,26,34],

    [14,22,30,38],
    [15,23,31,39],
    [16,24,32,40],
    [17,25,33,41],

    [3,9,15,21],
    [4,10,16,22],
    [5,11,17,23],
    [6,12,18,24],

    [10,16,22,28],
    [11,17,23,29],
    [12,18,24,30],
    [13,19,25,31],

    [17,23,29,35],
    [18,24,30,36],
    [19,25,31,37],
    [20,26,32,38]
]

const domClick = function (index: number) {
    if (gridArray[index + 7].class.search("taken") != -1 && gridArray[index].class.search("taken") == -1) {
        if (currentPlayer == 1) {
            gridArray[index].class += " taken"
            gridArray[index].class += " player-one"
            currentPlayer = 2
        }
        else if (currentPlayer == 2) {
            gridArray[index].class += " taken"
            gridArray[index].class += " player-two"
            currentPlayer = 1
        }
        else alert("can't go there!")
    }
    checkBoard()
}

</script>
<template>
    <h3>This is Game6: Connect Four</h3>
    <h2>Result: {{result}}</h2>
    <div class="grid">
        <div v-for="(grid, index) in gridArray" @click="domClick(index)" :key="index" :class="grid.class"></div>
    </div>
    <h4>Reference URL: <a
            href="https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s">https://www.youtube.com/watch?v=ec8vSKJuZTk&t=645s</a>
    </h4>
</template>

<style scoped>
.grid {
    border: solid 1px black;
    height: 120px;
    width: 140px;
    display: flex;
    flex-wrap: wrap;
}

.grid div {
    height: 20px;
    width: 20px;
}

.player-one {
    background-color: red;
    border-radius: 10px;
}

.player-two {
    background-color: blue;
    border-radius: 10px;
}
</style>