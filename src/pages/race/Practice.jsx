import PracticeScreen from "@components/screens/PracticeScreen"
import RaceContextProvider from '@components/RaceContextProvider'

const Practice = () => {
  return (
    <RaceContextProvider>
      <PracticeScreen />
    </RaceContextProvider>
  )
}

export default Practice
