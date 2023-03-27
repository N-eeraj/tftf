const sampleText = 'The quick brown fox jumped over the lazy dog.'

const textContainer = document.querySelector('.text')
const countdownText = document.querySelector('.countdown')

textContainer.innerText = sampleText

let count = 3

const startRace = () => {
    clearInterval(countdown)
    textContainer.classList.remove('hidden')
    countdownText.classList.add('hidden')

    const keysPressed = {
        correct: 0,
        wrong: 0
    }

    const startTime = Date.now()

    document.addEventListener('keydown', ({ key }) => {
        if (key === sampleText[keysPressed.correct]) {
            keysPressed.correct++
            console.log(sampleText.slice(0, keysPressed.correct))
            if (keysPressed.correct === sampleText.length) {
                const endTime = Date.now()
                console.log(`Accuracy: ${Math.round(keysPressed.correct * 100 / (keysPressed.correct + keysPressed.wrong))}%`)
                console.log(`Speed: ${Math.round((sampleText.length * 60000) / (5 * (endTime - startTime)))} WPM`)
            }
        }
        else {
            ++keysPressed.wrong
        }
    })
}

const countdown = setInterval(() => {
    if (count) {
        countdownText.innerText = count
        --count
    }
    else
        startRace()
}, 1000)