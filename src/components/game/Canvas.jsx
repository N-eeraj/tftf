import { useEffect, useRef } from 'react'

import cars from '@images/cars.png'
import road from '@images/road.png'

const Canvas = ({ connections }) => {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.height = Object.keys(connections).length * 25
  }, [connections])

  return (
    <>
      <canvas ref={canvas} className='w-full border border-black' />
      <div className='hidden'>
        <img src={cars} />
        <img src={road} />
      </div>
    </>
  )
}

export default Canvas