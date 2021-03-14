export const addWaterMarker = (strArr) => {
  let ctx = document.createElement('canvas')
  let body = document.body
  ctx.width = 150 // canvas宽高
  ctx.height = 150
  ctx.style.display = 'none'
  let cans = ctx.getContext('2d')
  cans.rotate(-45 * Math.PI / 180) // 倾斜度
  cans.font = '14px Microsoft JhengHei'
  cans.fillStyle = 'rgba(17, 17, 17, 0.40)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(strArr[0] + strArr[2], 0, 100)
  cans.fillText(strArr[1], 0, 120)
  cans.font = '16px Microsoft JhengHei'
  cans.fillStyle = 'rgba(17, 17, 17, 0.40)'
  cans.fillText(strArr[2], 0, 140)
  body.appendChild(ctx)
  body.style.backgroundImage = 'url(' + ctx.toDataURL('image/png') + ')'
}
