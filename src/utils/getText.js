const getText = async (signal, options) => {
    const dummyText = 'The quick brown fox jumps over the lazy dog.'
    try {
        const response = await fetch(`https://api.quotable.io/random?minLength=${options?.minLength || 100}&maxLength=${options?.maxLength || 200}`, { signal })
        const { content } = await response.json()
        return content
    }
    catch (error) {
        console.warn(error)
        return dummyText
    }
}

export default  getText