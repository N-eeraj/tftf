import { useEffect, useRef } from 'react'

import carsImage from '@images/cars.png'
import finishImage from '@images/finish.png'

const Canvas = ({ connections }) => {
  const canvas = useRef()
  const lineUp = useRef()

  // image references
  const cars = useRef()
  const finish = useRef()

  const canvasDraw = (ctx) => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.fillStyle = '#2E2E2E'
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)
    lineUp.current?.forEach(({ index, progress }) => {
      const trackHeight = canvas.current.height / lineUp.current.length
      const finishWidth = 10
      ctx.drawImage(finish.current, canvas.current.width - finishWidth, trackHeight * index, finishWidth, trackHeight)
      const sx = 0
      const sy = 2258.25 * index
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dHeight = trackHeight * 0.75
      const dWidth = dHeight * 0.15
      const dx = (canvas.current.width - finishWidth - dWidth) * progress
      const dy = trackHeight * (index + 0.125)
      ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    })
  }

  useEffect(() => {
    let animation
    const ctx = canvas.current.getContext('2d')
    const animate = () => {
      canvasDraw(ctx)
      animation = requestAnimationFrame(animate)
    }
    animate()
    canvas.current.height = Object.keys(connections).length * 300
    canvas.current.style.height = `${Object.keys(connections).length * 100}px`
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
        <img ref={finish} src={finishImage} />
      </div>
    </>
  )
}

export default Canvas