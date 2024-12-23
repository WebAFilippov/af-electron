import { ChangeEvent, FC, useState } from 'react'

import { getOpenWeatherMapApiKey, useValidateApiKey } from '@entities/application'

import { Button, InputField } from '@shared/components/ui'
import { useAppSelector } from '@shared/hooks'
import { useDebounce } from '@shared/hooks/use-debounce'

export const SettingsPage: FC = () => {
  const owm_apikey = useAppSelector(getOpenWeatherMapApiKey)

  const [owmValue, setOWMValue] = useState(owm_apikey)
  const debouncedValue = useDebounce(owmValue, 500)

  const { data, error } = useValidateApiKey(debouncedValue)

  const handleExternalOpen = (url: string) => {
    window.api.openExternal(url)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOWMValue(e.target.value)
  }

  const handleSaveSettings = () => {}

  return (
    <div className="container flex h-full flex-col py-5">
      <div className="w-full text-center font-bold">Настройки</div>

      <div className="mt-8">
        <InputField
          placeholder="Введите ключ..."
          value={owmValue}
          onChange={handleOnChange}
          id="opm_apikey"
          label="OpenWeatherMap API KEY"
          success={data}
          error={error}
          hint={
            <>
              <h3 className="text-md mb-2 font-semibold">Инструкция по получению API Key:</h3>
              <ol className="list-inside list-decimal space-y-2">
                <li>
                  Перейдите на сайт{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() =>
                      handleExternalOpen('https://home.openweathermap.org/users/sign_up')
                    }
                  >
                    OpenWeatherMap
                  </button>
                  .
                </li>
                <li>Зарегистрируйтесь, указав электронную почту и пароль.</li>
                <li>Подтвердите свою электронную почту.</li>
                <li>
                  Перейдите в раздел{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => handleExternalOpen('https://home.openweathermap.org/api_keys')}
                  >
                    API Keys
                  </button>
                  .
                </li>
                <li>Нажмите «Создать ключ» и задайте имя для ключа.</li>
                <li>Скопируйте полученный ключ и вставьте его в поле ввода.</li>
              </ol>
              <p className="mt-4">
                Если возникнут вопросы, обратитесь в{' '}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => handleExternalOpen('https://openweathermap.org/faq')}
                >
                  FAQ
                </button>
                .
              </p>
            </>
          }
        />
      </div>

      <div>
        <Button className="border-1 mt-10 w-full border-border bg-foreground text-primary shadow-md hover:bg-secondary">
          Сохранить
        </Button>
      </div>
    </div>
  )
}
