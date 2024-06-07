import { useEffect, useRef } from 'react'

import carsImage from '@images/cars.png'
import finishImage from '@images/finish.png'

const Canvas = ({ peerId, connections, started }) => {
  const canvas = useRef()
  const lineUp = useRef()
  const counter = useRef(0)
  const tracks = useRef(Array.from({ length: 5 }).map((_, i) => i * 100))

  // image references
  const cars = useRef()
  const finish = useRef()

  const canvasDraw = (ctx) => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.fillStyle = '#2E2E2E'
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)
    lineUp.current?.forEach(({ key, index, progress, carPosition }, lineUpIndex) => {
      const trackHeight = canvas.current.height / lineUp.current.length
      ctx.fillStyle = '#EEE'

      tracks.current.forEach((progress, trackIndex) => {
        ctx.fillRect(progress, trackHeight * (index + 0.5) - 15, 50, 30)
        if (started)
          tracks.current[trackIndex] -= 2
        if (tracks.current[0] < 0) {
          if (tracks.current.length < 5)
            tracks.current.push(tracks.current[tracks.current.length - 1] + 100)
          if (tracks.current[0] < -50)
            tracks.current.shift()
        }
      })

      // const finishWidth = 10
      // ctx.drawImage(finish.current, canvas.current.width - finishWidth, trackHeight * index, finishWidth, trackHeight)
      const sx = 0
      const sy = 2258.25 * index
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dHeight = trackHeight * 0.75
      const dWidth = dHeight * 0.15
      const dx = carPosition
      if (started) {
        if (!progress && carPosition < canvas.current.width * 0.05)
          lineUp.current[lineUpIndex].carPosition += 1
        if (progress > 0.1 && progress < 0.9 && carPosition < canvas.current.width * +progress.toFixed(1) - dWidth)
          lineUp.current[lineUpIndex].carPosition += 0.5
      }
      const dy = trackHeight * (index + 0.125)
      ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    })
  }

  useEffect(() => {
    canvas.current.height = Object.keys(connections).length * 300
    canvas.current.style.height = `${Object.keys(connections).length * 100}px`
    lineUp.current = Object.entries(connections).reduce((sorted, [key, { index, ...progress }], connectionsIndex) => {
      let carPosition = 0
      if (lineUp.current)
        carPosition = lineUp.current[connectionsIndex]?.carPosition ?? 0
      const data = {
        key,
        index,
        carPosition,
        ...progress,
      }
      if (!sorted.length || index < sorted[0].index)
        sorted.unshift(data)
      else if (index > sorted[sorted.length - 1].index)
        sorted.push(data)
      else
        sorted.splice(sorted.findIndex(item => item.index > index), 0, data)
      return sorted
    }, [])
  }, [connections])

  useEffect(() => {
    let animation
    const ctx = canvas.current.getContext('2d')
    const animate = () => {
      if (started)
        ++counter.current
      canvasDraw(ctx)
      animation = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animation)
  }, [started])

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