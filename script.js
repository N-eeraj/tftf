const sampleText = 'The quick brown fox jumped over the lazy dog.'

const textContainer = document.querySelector('.text')
const countdownText = document.querySelector('.countdown')

let count = 3

const startRace = () => {
    textContainer.innerHTML = `<span class='current'>${sampleText[0]}</span><span>${sampleText.slice(1)}</span>`

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
            textContainer.innerHTML = `<span class='completed'>${sampleText.slice(0, keysPressed.correct)}</span>`

            console.log(`Accuracy: ${Math.round(keysPressed.correct * 100 / (keysPressed.correct + keysPressed.wrong))}%`)
            console.log(`Speed: ${Math.round((keysPressed.correct * 60000) / (5 * (Date.now() - startTime)))} WPM`)

            if (keysPressed.correct === sampleText.length) {
                const endTime = Date.now()
                document.removeEventListener('keydown', null)
                setTimeout(() => {
                    alert(`
                        Accuracy: ${Math.round(keysPressed.correct * 100 / (keysPressed.correct + keysPressed.wrong))}%
                        Speed: ${Math.round((keysPressed.correct * 60000) / (5 * (endTime - startTime)))} WPM
                    `)
                }, 1250)
            }
            else if (keysPressed.correct < sampleText.length) {
                textContainer.innerHTML += `<span class='current'>${sampleText[keysPressed.correct]}</span><span>${sampleText.slice(keysPressed.correct+1)}</span>`
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