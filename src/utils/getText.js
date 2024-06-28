import { generate } from 'random-words'

const getText = options => {
  const puncuation = () => {
    const random = Math.random()
    if (random < 0.025) return '!'
    if (random < 0.10) return '.'
    if (random < 0.25) return ','
    return ''
  }

  return generate(options)
    .reduce((text, word) => {
      return `${text}${`${word[0][[undefined, '.', '!']
        .includes(text[text.length - 2]) ? 'toUpperCase': 'toLowerCase']()}${word.slice(1)}`}${puncuation()} `
    }, '')
    .replace(/.$/, '.')
}

export default getText
