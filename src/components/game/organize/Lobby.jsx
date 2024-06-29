import { useState, useEffect, useContext } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { RaceContext } from '@contexts/Race'
import { TypingContext } from '@contexts/Typing'
import Button from '@components/base/button'
import ShareIcon from '@icons/Share'
import getText from '@utils/getText'

const Lobby = () => {
  const {
    peerId,
    isHost,
    stopConnections,
  } = useContext(RaceContext)

  const [loading, setLoading] = useState(false)

  const [openSnackbar] = useSnackbar({
    style: {
      borderRadius: '50px'
    },
    closeStyle: {
      color: '#50C878',
    }
  })
  const { setText } = useContext(TypingContext)


  const handlePlay = async () => {
    setLoading(true)
    const content = await getText({ min: 20, max: 30 })
    stopConnections(content)
    setText(content)
  }

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      const shareData = {
          title: 'Type Fast Type Furious',
          text: 'Join in a race with me',
          url: `race?hostId=${peerId}`,
      }
      await navigator.share(shareData)
    }
    else
      handlePeerIdClick()
  }

  return (
    isHost.current ?
      <div className='flex flex-col items-center gap-y-2'>
        <div className='flex items-center gap-x-2'>
          <span className='text-light cursor-pointer' onClick={handlePeerIdClick}>
            Join with {peerId}
          </span>
          <ShareIcon className='w-6 fill-accent cursor-pointer' onClick={handleShare} />
        </div>
        <Button loading={loading} autoFocus className='col-span-2 bg-accent text-white' onClick={handlePlay}>
          Start Race
        </Button>
      </div> :
      <p className='text-light'>
        Please wait while host starts the race
      </p>
  )
}

export default Lobby
