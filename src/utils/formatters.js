export const ordinals = number => {
  switch (number) {
    case 1:
      return `${number}st`
    case 2:
      return `${number}nd`
    case 3:
      return `${number}rd`
    default:
      return `${number}th`
  }
}

export const randomPuncuation = () => {
  const random = Math.random()
  if (random < 0.025) return '!'
  if (random < 0.10) return '.'
  if (random < 0.25) return ','
  return ''
}
