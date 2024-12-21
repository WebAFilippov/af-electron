import { useQuery } from '@tanstack/react-query'

import { FC, useState } from 'react'

import { getOpenWeatherMapApiKey } from '@entities/application'

import { InputLabelWithIcon } from '@shared/components/ui'
import { useAppSelector } from '@shared/hooks'
import { useDebounce } from '@shared/hooks/use-debounce'

export const SettingsPage: FC = () => {
  const opm_apikey = useAppSelector(getOpenWeatherMapApiKey)

  const [value, setValue] = useState(opm_apikey)
  const debouncedValue = useDebounce(value, 300)

  // const {} = useQuery(debouncedValue)

  return (
    <div className="mx-5 flex h-full flex-col gap-5 py-5">
      <div className="w-full text-center font-bold">Настройки</div>

      <div className="w-[400px]">
        <InputLabelWithIcon
          type="text"
          placeholder="API KEY"
          inputValue={value}
          setInputValue={setValue}
        />
      </div>

      <StoryPreview />
    </div>
  )
}

const StoryPreview = () => {
  const imageUrl =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAEOAJgDACIAAREBAhEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMAAAERAhEAPwD5mpKKKR18olIaU0UByjaQ06koFyjaSnGkxQHKNNJinEUmKLhyjSKTFOIoxQHKNNJinEUmKA5RMUlLRRcOUSilpKQcoUUUUw5S6KXbSgU4CoudapjNopdoqQLTgppXLVIh2CjYKsBD6U4Rn0pcxSolXyxR5Yq4Iz6Uvl+1HMV7Ao+WPSk8sehq8Y/ajy/ajmD2BQ8selJ5Q9DV/wAr2pPK9qOYPYFExj0ppjFX2iPpUbRn0o5iXQKZQU0oKttH7Uxkp3JdEqlaQrVhlNRladyHTIiKTFPIpMU7k8heWnrTFqRazbPQUB609aatPWpbNVAcKeBSKKkUVLZqoABS4pwFGKVy1AYRRin4oxRcOQjxQRUmKQii4uQiYVGwqcio2FFxOBAwqJhU7ComqkzJwIWqJqnaomqkzJwIWptPam07mbgXFqRaYtSqKhs7FEctSLTVFPAqTRIcKkWoxUi0maJDxSjFNopFD8ijioy1JuoFck4pDimbqN1AXFOKjanFqjY0xMY9RNUrVE1NENETVE1TNUTVRm4kLU2pGpuKZHIXFHNSjpTFHNSDpUXOiwopwNMBpQaQXRIDTgah3Uu8etAcyJt1JuqEyD1ppkHqKLCc0TM1N3VC0g9ab5g9aLE86LIajdVfzB60vmD1osHOifdTSaj8wUhcetBXMh5NMakLCmlhTC6Eao2p5NNNMCJqSnmkxTuFi5ig0401jUoUpDSaaWprtUTvTsYSqEpcUwyCoHkqJ5TVcphKtYstMKYZhVN5jULTHNUomMq5faYeppvnis9pjTfONHKR9YNMTD1pRMKzPONKsxzRygsQaomFO8ys1ZjUiymlym0a5fD0u6qayGpFc0rG0apZzRUKtUgNKxtGY6jFKKWkbJl5lqJ1q261DItSjmnIpyVXerUoqrLWiOWciCQ1XkappDVWVqtHLOZHI1QM/NLK1VXfmrSOWUyVnpN9V2ek307GfOWd9OV+aqB6ej80WGpl5GqdGqjG1WY2pNG8JlpDUyVWQ1YSpZ1wmTrUqiokqdBUM6oSHqtO205BT9tI6VI1JEqtKtaEyVTmWskcU5mfMKqTCr0y1SmFaI5ZyKUveqc1XJhVOatUc02U5qqSHmrM9U5OtaI5pCGkoopkBT4+tMpyfeoGi1FVqKqkVW4qlm0GWY6sxiq0VWoxUs6oMsRirEYqGIVZiWpZ1QkSxrUm2iNal21NjpUzanSqMy1qzp1qhOtYI8+UzLnWqM61pzrVCdetaoxlIzZxVGcVoziqFwK0RjJmdP3qlJ1q9cVRk+9WqMWNooopkhTk+9Tacn3qALUVW4qqRdauRUjWJZiFW4hVaKrcQqTeLLEQq1EKgiFWohUnRGRPEtSbfaiJal21Jspm/cL1rPnWta4Ws64HWudHA5GVcLWfcCtS4HWs64FaohyMy4FZ9wK0ris64rRGbZm3FUZPvVfuO9UJfvVqiGMooopiCnJ96m05OtAFuLtVyGqkNW4aTNEy5FVuKqsNW4aRomWohVuIVWhq5FSNFIsxCpcUyIVLSsaKZ0VwOtZ1x3rSuKzriuVI47mZcd6zritK4rNuO9aoVzOuKzbitG461nXHetEIzbiqEv3q0Lis+X71aIkZRRRTAKcnWm06PrQBchq5FVKCrsXSkykXIauRdqpw1chNItMuQ1ciqnDVyGgpMuQ1LiooalpF8x0FwetZtx3q/cNWbcN1rmSOa5RuDWdcd6vXB61n3BrRAZ9z3rOuO9X7g1n3HetEIz7is+X71X7jvVCX71WgGUUUUwCnJ1ptOTrQBahq9Caow1chNBRehq3DVKKrkRpDLkJq7CaoxVbiNIdy9DUtQRGpd1A7m3cNVCdqnneqU7VgkZoqznrVC471cmNUZqpDKNxis+4rQnFUZ1q0Bm3HeqMoGa0Z46qSRnNWgKpFJirBi9qb5R9KYmQU5OtSeUfSlSM56UCJYqtxVXijq1EtA0WojVuI1UiWrUVAy3EauRGqMVWojSAvRGpd1VomqXdSGacz1UlanSvVaVqysJEcrVUlappGqtIapDK8tVJatSVWkFUIpSiqzjmrsq1XZeaoCAj2pMVOy03bTEyEqPSkUc1MVpAvNAhUFTpTEWpUFAyaOrEdQJUyUDLEZqxGaqpU6GkBbjapN1Vo2qTdSAuSPUDtTXeomaoBA7VC5pzGo2NMZFJUDip2qJqYFZ1qFl5q0wqMrzTAgK03bVgrTdtUSyArSBeanK03bzQA1VqRRQFp4FADlqRaYKeKBkympFNQrT1NICwjU/dUCtT91ICVm5prNUZbmkLUhocTTCaQtSFhQAGoyKeWFNJFMCMim7ealOKbxQBGVpu2pjikxTEyErTdtTlaaVpiIwtOAp22jFIBBThRiloGKKeDTBSikBKDS7qiBpc0AOLUmabmkzQA7NFNJpM0APopm6k3UASYowKj3Um+gCXFGBUW80bzQBLgUhFR7zSbzTESEUlM3GjdQMdRTd1GaQDqM0lGaAHA0uaaKKAP/9k='

  return (
    <div
      style={{ backgroundImage: `url("${imageUrl}")`, opacity: 1 }}
      className="story-preview"
    ></div>
  )
}
