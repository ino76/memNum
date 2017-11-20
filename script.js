// memNum game
// author: Daniel Cech 2017


const startButton = document.getElementById('start')
const result = document.getElementById('result')
const wrongSound = document.getElementById('wrong')
const numberInput = document.getElementById('numberInput')
const number = document.getElementById('number')
const header = document.getElementById('header')

numberInput.addEventListener('input', listen)

let interval
let points = 0
let games = 1
let sequence = []
let wrongAnswer
let rightAnswer


// indicates if computer showing the sequence in this moment
let active = false

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
    addNext()
    playSequence()
}

function addNext() {
    let random = Math.floor(Math.random() * 10)
    sequence.push(random)
    // TODO vymazat log
    console.log(sequence)
}

function playSequence() {
    number.classList.remove('slowAnimation')
    active = true
    let i = 0

    let play = function() {
        interval = setTimeout(play, 800)
        if (sequence.length - 1  == i) {
            clearTimeout(interval)
        }
        show(sequence[i])
        playSound(sequence[i] % 4)
        i++
    }
    
    play()
    setTimeout(function(){
        show('?')
        number.classList.add('slowAnimation')
        disableInput(false)
        numberInput.focus()
        header.textContent = 'memNum ...'
    }, sequence.length * 800)
}


function listen() {
    const typedNumber = numberInput.value
    if (isNaN(typedNumber)) {
        alert('Insert only whole numbers please.')
        numberInput.value = ""
        return
    }

    if (sequence.length === 0) {
        return
    } else if (sequence.length === typedNumber.length) {
        if (typedNumber === sequence.join('')) {
            header.textContent = "right"
            disableInput(true)
            points++
            setTimeout(function(){
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
    if(points != 1) {
        result.innerHTML += '<p>You have ' + points + ' points.</p>'
    } else {
        result.innerHTML += '<p>You have ' + points + ' point.</p>'
    }
    points = 0
    games++
    startBle(false)
}