// import { generateZones } from './ambilight'
// import AmbilightCanvas from './AmbilightCanvas'
// import React, { useEffect, useState } from 'react'
// const DOWNSCALE = 6
// export const App: React.FC = () => {
//   const [colors, setColors] = useState<number[][]>([])
//   const zones = generateZones(1920, 1080, 30, 15, 30, 15, 0, 200)
//   useEffect(() => {
//     const video = document.createElement('video')
//     video.autoplay = true
//     video.style.display = 'none'
//     async function startCapture() {
//       try {
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//           audio: false,
//           video: {
//             width: 3840,
//             height: 2160,
//             frameRate: 90,
//           },
//         })
//         video.srcObject = stream
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d', { willReadFrequently: true })!
//         let frameCount = 0
//         let fpsTimer = performance.now()
//         const update = () => {
//           const now = performance.now()
//           frameCount++
//           // FPS расчёт каждые 1000 мс
//           if (now - fpsTimer >= 1000) {
//             const fps = (frameCount * 1000) / (now - fpsTimer)
//             console.log(`FPS: ${fps.toFixed(1)}`)
//             fpsTimer = now
//             frameCount = 0
//           }
//           if (video.videoWidth === 0 || video.videoHeight === 0) {
//             requestAnimationFrame(update)
//             return
//           }
//           // ресайз
//           canvas.width = video.videoWidth / DOWNSCALE
//           canvas.height = video.videoHeight / DOWNSCALE
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
//           // получение пикселей
//           const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//           // средний цвет для каждой зоны
//           const newColors = zones.map(([x1, y1, x2, y2]) => {
//             const sx1 = Math.floor(x1 / DOWNSCALE)
//             const sy1 = Math.floor(y1 / DOWNSCALE)
//             const sx2 = Math.floor(x2 / DOWNSCALE)
//             const sy2 = Math.floor(y2 / DOWNSCALE)
//             let rSum = 0,
//               gSum = 0,
//               bSum = 0,
//               count = 0
//             for (let y = sy1; y < sy2; y++) {
//               for (let x = sx1; x < sx2; x++) {
//                 const idx = (y * canvas.width + x) * 4
//                 rSum += imgData.data[idx]
//                 gSum += imgData.data[idx + 1]
//                 bSum += imgData.data[idx + 2]
//                 count++
//               }
//             }
//             if (count === 0) return [0, 0, 0]
//             return [rSum / count, gSum / count, bSum / count]
//           })
//           setColors(newColors)
//           requestAnimationFrame(update)
//         }
//         update()
//       } catch (err) {
//         console.error('Error capturing screen:', err)
//       }
//     }
//     startCapture()
//   }, [])
//   return (
//     <div style={{ width: '100vw', height: '100vh', background: '#fff' }}>
//       <AmbilightCanvas colors={colors} zones={zones} />
//     </div>
//   )
// }
import { router } from './provider/router'
import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

export const App: FC = () => {
  return <RouterProvider router={router} />
}
