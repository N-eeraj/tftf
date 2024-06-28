export const spriteCarSize = 2258.25

export const dashesConfig = {
  width: 75,
  height: 8,
  count: 15,
}

export const drawDashes = ({ ctx, dashes, trackHeight, index }, updateFunction) => {
  dashes.current.forEach((progress, trackIndex) => {
    ctx.fillRect(progress, trackHeight * (index + 0.5) - dashesConfig.height * 0.5, dashesConfig.width, dashesConfig.height)
    updateFunction && updateFunction(trackIndex)
  })
}

export const drawPlayerTag = (ctx, { canvas, lineUp, key, peerId, playerName, dx, dy, dWidth, dHeight }) => {
  ctx.fillStyle = '#555'
  const roadHeight = canvas.current.height / lineUp.current.length
  const tagName = key === peerId ? 'You' : playerName
  const paddingX = 20
  const tagWidth = tagName.length * 12 + paddingX
  ctx.fillRect(dx + dWidth * 1.2 - paddingX / 2, dy + roadHeight * 0.15, tagWidth, roadHeight * 0.5)
  ctx.shadowBlur = 7
  ctx.font = `${dHeight / 3}px monospace`
  ctx.fillStyle = key === peerId ? '#0C7' : '#EEE'
  ctx.fillText(tagName, dx + dWidth * 1.2, dy + dHeight * 0.66)
  ctx.shadowBlur = 0
}
