// import { useEffect, useState } from 'react'

// const MOBILE_BREAKPOINT = 769

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

//   useEffect(() => {
//     const handleGetWidth = async () => {
//       const width = await window.api.getWindowWidth()
//       setIsMobile(width <= MOBILE_BREAKPOINT)
//     }

//     handleGetWidth()
//   }, [])

//   return !!isMobile
// }
