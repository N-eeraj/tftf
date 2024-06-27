import { useEffect, useRef } from 'react'
import carsImage from '@images/car-sprites.png'

const Canvas = ({ peerId, connections, started }) => {
  const dashesConfig = {
    width: 75,
    height: 8,
    count: 15,
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

    lineUp.current?.forEach(({ key, index, progress, carPosition, completed, lastUpdated, playerName, playerCar }, lineUpIndex) => {
      ctx.fillStyle = '#EEE'
      ctx.shadowBlur = 0

      const sx = 0
      const sy = 2258.25 * playerCar
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dHeight = trackHeight * 0.75
      const dWidth = dHeight * 1.913
      let dx = carPosition
      const dy = trackHeight * (index + 0.125)

      const self = lineUp.current.find(({ key }) => key === peerId)
      const gameOver = self.progress === 1
      if (gameOver) {
        dashes.current.forEach(progress => 
          ctx.fillRect(progress, trackHeight * (index + 0.5) - dashesConfig.height * 0.5, dashesConfig.width, dashesConfig.height)
        )
        if (key === peerId) {
          if (completed && carPosition < canvas.current.width / 3) {
            lineUp.current[lineUpIndex].carPosition += 5
          }
          else if (!completed) {
            lineUp.current[lineUpIndex].completed = true
            lineUp.current[lineUpIndex].carPosition = -dWidth
          }
        }
        else if (progress === 1) {
          if (self.lastUpdated > lastUpdated) {
            lineUp.current[lineUpIndex].completed = true
            dx = canvas.current.width / 3
          }
          else {
            if (completed && carPosition < canvas.current.width / 3) {
              lineUp.current[lineUpIndex].carPosition += 5
            }
            else if (!completed) {
              lineUp.current[lineUpIndex].completed = true
              lineUp.current[lineUpIndex].carPosition = -dWidth
            }
          }
          ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }
      }
      else {
        dashes.current.forEach((progress, trackIndex) => {
          ctx.fillRect(progress, trackHeight * (index + 0.5) - dashesConfig.height * 0.5, dashesConfig.width, dashesConfig.height)
          if (started)
            dashes.current[trackIndex] -= dashesConfig.width / 10
          if (dashes.current[0] < 0) {
            if (dashes.current.length < dashesConfig.count)
              dashes.current.push(dashes.current[dashes.current.length - 1] + dashesConfig.width * 2)
            if (dashes.current[0] < -dashesConfig.width)
              dashes.current.shift()
          }
        })
        if (started) {
          if (!progress && carPosition < canvas.current.width * 0.05) {
            lineUp.current[lineUpIndex].carPosition += 1
          }
          else if (carPosition < canvas.current.width * +progress.toFixed(1) - dWidth || progress === 1) {
            lineUp.current[lineUpIndex].carPosition += 0.5
          }
        }
      }
      if (!gameOver || key === peerId) {
        ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      }
      ctx.fillStyle = '#555'
      ctx.fillRect(dx + dWidth * 1.1, dy + dHeight * 0.2, 60, dHeight * 0.75)
      ctx.shadowBlur = 7
      ctx.font = `${dHeight / 3}px Arial`
      ctx.fillStyle = key === peerId ? '#0C7' : '#EEE'
      ctx.fillText(key === peerId ? 'You' : playerName, dx + dWidth * 1.2, dy + dHeight * 0.66)
    })
  }

  useEffect(() => {
    canvas.current.height = Object.keys(connections).length * 80
    canvas.current.width = 1200
    lineUp.current = Object.entries(connections).reduce((sorted, [key, { index, ...details }], connectionsIndex) => {
      const carPosition = lineUp.current[connectionsIndex]?.carPosition ?? 0
      const completed = lineUp.current[connectionsIndex]?.completed ?? false

      const data = {
        key,
        index,
        carPosition,
        completed,
        ...details
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
      <canvas ref={canvas} className='w-full' />
      <div className='hidden'>
        <img ref={cars} src={carsImage} />
      </div>
    </>
  )
}

export default Canvas