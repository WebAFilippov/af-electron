import { $monitors } from '@entities/monitors/model/monitors.model'
import { useUnit } from 'effector-react'

export const AmbilightPage = () => {
  const [monitors] = useUnit($monitors)

  return <>Abmilight</>
}
