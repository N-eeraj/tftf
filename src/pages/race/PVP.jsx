import TypingContextProvider from '@contexts/Typing'
import RaceContextProvider from '@contexts/Race'
import PVPScreen from '@components/screens/PVPScreen'

const PVP = () => {
  return (
    <TypingContextProvider>
      <RaceContextProvider>
        <PVPScreen />
      </RaceContextProvider>
    </TypingContextProvider>
  )
}

export default PVP
