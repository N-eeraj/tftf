import { useCallback, useEffect, useRef } from 'react'

import carsImage from '@images/cars.png'
import roadImage from '@images/road.png'

const Canvas = ({ peerId, connections }) => {
  const canvas = useRef()
  const ctx = useRef()
  const carIndex = useRef()

  // image references
  const cars = useRef()
  const road = useRef()

  const animate = useCallback(() => {
    canvasDraw()
    requestAnimationFrame(animate)
  }, [])

  const canvasDraw = () => {
    ctx.current.drawImage(road.current, 0, 0, 120, 240, 0, 0, canvas.current.width * 4, canvas.current.height)
    ctx.current.drawImage(cars.current, 0, carIndex.current * 200, 383, 200, 0, carIndex.current * 200 + canvas.current.height * 0.2, canvas.current.width * 0.1, (canvas.current.height / Object.keys(connections).length) * 0.6)
  }

  useEffect(() => {
    if (!ctx.current) {
      ctx.current = canvas.current.getContext('2d')
      animate()
    }
    if (carIndex.current === undefined && Object.keys(connections).length) {
      carIndex.current = Object.keys(connections).indexOf(peerId)
    }
    canvas.current.height = Object.keys(connections).length * 25
  }, [connections])

  return (
    <>
      <canvas ref={canvas} className='w-full border border-black' />
      <div className='hidden'>
        <img ref={cars} src={carsImage} />
        <img ref={road} src={roadImage} />
      </div>
    </>
  )
}

export default Canvas