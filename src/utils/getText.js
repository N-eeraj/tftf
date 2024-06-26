const getText = async (signal, length) => {
  const dummyText = 'The quick brown fox jumps over the lazy dog.'
  try {
    const response = await fetch(`http://metaphorpsum.com/sentences/${length}`, { signal })
    const text = await response.text()
    return text
  }
  catch (error) {
    console.warn(error)
    return dummyText
  }
}

export default getText
