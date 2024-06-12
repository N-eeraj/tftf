import { useEffect, useRef } from 'react'

import carsImage from '@images/cars.png'

const Canvas = ({ peerId, connections, started }) => {
  const dashesConfig = {
    width: 50,
    height: 5,
    count: 7,
    speed: 3,
  }

  const canvas = useRef()
  const lineUp = useRef([])
  const counter = useRef(0)
  const dashes = useRef(Array.from({ length: dashesConfig.count }).map((_, i) => i * 100))

  // image reference
  const cars = useRef()
  
  const canvasDraw = (ctx) => {
    const trackHeight = canvas.current?.height / lineUp.current.length
    
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.fillStyle = '#2E2E2E'
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)

    lineUp.current?.forEach(({ index, progress, carPosition, completed }, lineUpIndex) => {
      ctx.fillStyle = '#EEE'

      const sx = 0
      const sy = 2258.25 * index
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dHeight = trackHeight * 0.75
      const dWidth = dHeight * 1.913
      const dx = carPosition
      const dy = trackHeight * (index + 0.125)

      const gameOver = lineUp.current.find(({ key }) => key === peerId).progress === 1
      if (gameOver) {
        dashes.current.forEach(progress => 
          ctx.fillRect(progress, trackHeight * (index + 0.5) - dashesConfig.height * 0.5, dashesConfig.width, dashesConfig.height)
        )
        if (completed && carPosition < canvas.current.width / 2) {
          lineUp.current[lineUpIndex].carPosition += 2
        }
        else if (!completed) {
          lineUp.current[lineUpIndex].completed = true
          lineUp.current[lineUpIndex].carPosition = -dWidth
        }
      }
      else {
        dashes.current.forEach((progress, trackIndex) => {
          ctx.fillRect(progress, trackHeight * (index + 0.5) - dashesConfig.height * 0.5, dashesConfig.width, dashesConfig.height)
          if (started)
            dashes.current[trackIndex] -= dashesConfig.speed
          if (dashes.current[0] < 0) {
            if (dashes.current.length < dashesConfig.count)
              dashes.current.push(dashes.current[dashes.current.length - 1] + 100)
            if (dashes.current[0] < -dashesConfig.width)
              dashes.current.shift()
          }
        })
        if (started) {
          if (!progress && carPosition < canvas.current.width * 0.05) {
            lineUp.current[lineUpIndex].carPosition += 1
          }
          else if (carPosition < canvas.current.width * +progress.toFixed(1) - dWidth) {
            lineUp.current[lineUpIndex].carPosition += 0.5
          }
        }
      }
      ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    })
  }

  useEffect(() => {
    canvas.current.height = Object.keys(connections).length * 40
    canvas.current.width = 600
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
      </div>
    </>
  )
}

export default Canvas