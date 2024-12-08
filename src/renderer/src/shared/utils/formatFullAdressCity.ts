type Props = {
  type_region: string
  region: string
}

export const formatFullAdressCity = ({type_region, region}: Props) => {
  if (type_region === 'Чувашия') return `${region}`
  if (type_region === 'АО') return `${region} ${type_region}`
  if (type_region === 'Респ') return `Республика ${region}`
  if (type_region === 'обл') return `${region} область`
  if (type_region === 'край') return `${region} край`
  if (type_region === 'г') return `г.${region}`
  if (type_region === 'Аобл') return `${region} ${type_region}`
  return ''
}
