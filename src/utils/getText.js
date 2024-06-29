import { generate } from 'random-words'
import { randomPuncuation } from '@utils/formatters'

const getText = options => {
  return generate(options)
    .reduce((text, word) => {
      return `${text}${`${word[0][[undefined, '.', '!']
        .includes(text[text.length - 2]) ? 'toUpperCase': 'toLowerCase']()}${word.slice(1)}`}${randomPuncuation()} `
    }, '')
    .replace(/.$/, '.')
}

export default getText
