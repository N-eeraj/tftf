import { useEffect, useRef, useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import carsImage from '@images/car-sprites.png'
import {
  spriteCarSize,
  dashesConfig,
  drawDashes,
  drawPlayerTag,
} from '@helpers/canvasDraw'

const Canvas = () => {
  const { peerId, connections, mainData } = useContext(RaceContext)
  const started = !!mainData.data

  const canvas = useRef()
  const lineUp = useRef([])
  const counter = useRef(0)
  const dashes = useRef(Array.from({ length: dashesConfig.count }).map((_, i) => i * dashesConfig.width * 2))

  // image reference
  const cars = useRef()
  
  const canvasDraw = (ctx) => {
    // clear & repaint canvas
    const trackHeight = canvas.current?.height / lineUp.current.length
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.fillStyle = '#2E2E2E'
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)

    lineUp.current?.forEach(({ key, index, progress, carPosition, completed, lastUpdated, playerName, playerCar }, lineUpIndex) => {
      // initialize values for update & drawing canvas items
      ctx.fillStyle = '#EEE'
      const sx = 0
      const sy = spriteCarSize * playerCar
      const sWidth = cars.current.width
      const sHeight = cars.current.height / 8
      const dHeight = trackHeight * 0.75
      const dWidth = dHeight * 1.913
      let dx = carPosition
      const dy = trackHeight * (index + 0.125)
      const self = lineUp.current.find(({ key }) => key === peerId)
      const gameOver = self.progress === 1

      // handle game over updations & drawings
      if (gameOver) {
        drawDashes({ ctx, dashes, trackHeight, index })
        // handle player completion
        if (key === peerId) {
          // move player car upto final position
          if (completed && carPosition < canvas.current.width / 3) {
            lineUp.current[lineUpIndex].carPosition += 5
          }
          // move player car to left of canvas & set completed flag
          else if (!completed) {
            lineUp.current[lineUpIndex].completed = true
            lineUp.current[lineUpIndex].carPosition = -dWidth
          }
        }
        // handle opponents completion
        else if (progress === 1) {
          // set opponent cars to final position if completed prior to player
          if (self.lastUpdated > lastUpdated) {
            lineUp.current[lineUpIndex].completed = true
            dx = canvas.current.width / 3
          }
          // handle completion after player
          else {
            // move opponent car upto final position
            if (completed && carPosition < canvas.current.width / 3) {
              lineUp.current[lineUpIndex].carPosition += 5
            }
            // move opponent car to left of canvas & set completed flag
            else if (!completed) {
              lineUp.current[lineUpIndex].completed = true
              lineUp.current[lineUpIndex].carPosition = -dWidth
            }
          }

          ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
          drawPlayerTag(ctx, { canvas, lineUp, key, peerId, playerName, dx, dy, dWidth, dHeight })
        }
      }
      // handle game in progress updations & drawings
      else {
        const udpateDash = trackIndex => {
          if (started)
            dashes.current[trackIndex] -= dashesConfig.width / 10
          if (dashes.current[0] < 0) {
            if (dashes.current.length < dashesConfig.count)
              dashes.current.push(dashes.current[dashes.current.length - 1] + dashesConfig.width * 2)
            if (dashes.current[0] < -dashesConfig.width)
              dashes.current.shift()
          }
        }

        if (started) {
          // move car a little on race start
          if (!progress && carPosition < canvas.current.width * 0.05) {
            lineUp.current[lineUpIndex].carPosition += 1
          }
          // move car based on progress
          else if (carPosition < canvas.current.width * +progress.toFixed(1) - dWidth || progress === 1) {
            lineUp.current[lineUpIndex].carPosition += 0.5
          }
        }

        drawDashes({ ctx, dashes, trackHeight, index }, udpateDash)
      }

      if (!gameOver || key === peerId) {
        ctx.drawImage(cars.current, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        drawPlayerTag(ctx, { canvas, lineUp, key, peerId, playerName, dx, dy, dWidth, dHeight })
      }

      // drawPlayerTag(ctx, { canvas, lineUp, key, peerId, playerName, dx, dy, dWidth, dHeight })
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