import { useCallback, useEffect, useRef } from 'react'

import carsImage from '@images/cars.png'
import roadImage from '@images/road.png'

const Canvas = ({ connections }) => {
  const canvas = useRef()
  const start = useRef()
  const lineUp = useRef()

  // image references
  const cars = useRef()
  const road = useRef()

  const canvasDraw = (ctx) => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.drawImage(road.current, 0, 0, 120, 240, 0, 0, canvas.current.width * 4, canvas.current.height)
    lineUp.current?.forEach(({ index, progress }) => {
      const sx = 0
      const sy = 2000 * index
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dx = canvas.current.width * 4 * progress
      const dy = (canvas.current.height * index / lineUp.current.length) + (canvas.current.height * 0.125 / lineUp.current.length)
      const dHeight = canvas.current.height * 0.75 / lineUp.current.length
      const dWidth = dHeight * 1.9135
      ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    })
  }

  useEffect(() => {
    let animation
    if (!start.current)
      start.current = true
    const ctx = canvas.current.getContext('2d')
    const animate = () => {
      canvasDraw(ctx)
      animation = requestAnimationFrame(animate)
    }
    animate()
    canvas.current.height = Object.keys(connections).length * 25
    lineUp.current = Object.entries(connections).reduce((sorted, [key, { index, ...progress }]) => {
      const data = { key, index, ...progress }
      if (!sorted.length || index < sorted[0].index)
        sorted.unshift(data)
      else if (index > sorted[sorted.length - 1].index)
        sorted.push(data)
      else
        sorted.splice(sorted.findIndex(item => item.index > index), 0, data)
      return sorted
    }, [])

    return () => cancelAnimationFrame(animation)
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