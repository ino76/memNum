// memNum game
// author: Daniel Cech 2017


const startButton = document.getElementById('start')
const result = document.getElementById('result')
const wrongSound = document.getElementById('wrong')
const coins = document.getElementById('coins')
const numberInput = document.getElementById('numberInput')
const number = document.getElementById('number')
const header = document.getElementById('header')

numberInput.addEventListener('input', listen)
window.addEventListener("keypress", enterStart)

let interval
let points = 0
let games = 1
let sequence = []
let wrongAnswer
let rightAnswer


// indicates if computer showing the sequence in this moment
let active = false

function focus() {
    numberInput.focus()
}


function enterStart(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
        if (startButton.disabled == false) {
            setNew()
        }
    }
}
function disableInput(value) {
    numberInput.disabled = value
    numberInput.value = ''
}
disableInput(true)
// this function is started after player click on 'start' button
// it basically sets and starts new game
function setNew() {
    result.textContent = ""
    startBle(true)
    start()
}


// disable or enable 'start' button
function startBle(value) {
    startButton.disabled = value
}


function start() {
    generateNumber(sequence.length + 1)
    playSequence()
}

function generateNumber(times) {
    sequence = []
    for(let i = 0; i < times; i++) {
        let random = Math.floor(Math.random() * 10)
        sequence.push(random)
    }
}

function playSequence() {
    number.classList.remove('slowAnimation')
    active = true
    let i = 0

    let play = function () {
        interval = setTimeout(play, 800)
        if (sequence.length - 1 == i) {
            clearTimeout(interval)
        }
        show(sequence[i])
        playSound(sequence[i] % 4)
        i++
    }

    play()
    setTimeout(function () {
        starGen()
        disableInput(false)
        numberInput.focus()
        header.textContent = 'memNum ...'
    }, sequence.length * 800)
}


function starGen() {
    let stars = []
    for (i = 0; i < sequence.length - numberInput.value.length; i++) {
        stars.push('*')
    }

    stars = stars.join('')
    show(numberInput.value + stars)
}


function listen() {
    const typedNumber = numberInput.value
    if (isNaN(typedNumber) || typedNumber == " ") {
        alert('Insert only whole numbers please.')
        numberInput.value = ""
        return
    }

    starGen()

    if (sequence.length === 0) {
        return
    } else if (sequence.length === typedNumber.length) {
        if (typedNumber === sequence.join('')) {
            header.textContent = "right"
            disableInput(true)
            coins.play()
            points++
            setTimeout(function () {
                start()
                header.textContent = "memNum ..."
            }, 1500)
        } else {
            rightAnswer = sequence.join('')
            wrongAnswer = typedNumber
            exit()
        }
    }
}


function show(cislo) {
    number.textContent = cislo
}

function playSound(number) {
    const audio = document.getElementById(number);
    audio.currentTime = 0;
    audio.play()
}


function exit() {
    disableInput(true)
    header.textContent = 'memNum ...'
    sequence = []
    wrongSound.play()
    clearInterval(interval)
    result.innerHTML = '<p style="color: #26c092">right answer: ' + rightAnswer + '<\p>' +
        '<p style="color: #c03d26">your answer: ' + wrongAnswer + '<\p>'
    if (points != 1) {
        result.innerHTML += '<p>You have ' + points + ' points.</p>'
    } else {
        result.innerHTML += '<p>You have ' + points + ' point.</p>'
    }
    points = 0
    games++
    startBle(false)
}