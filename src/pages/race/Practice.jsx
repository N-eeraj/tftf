import PracticeScreen from '@components/screens/PracticeScreen'
import TypingContextProvider from '@contexts/Typing'

const Practice = () => {
  return (
    <TypingContextProvider>
      <PracticeScreen />
    </TypingContextProvider>
  )
}

export default Practice
