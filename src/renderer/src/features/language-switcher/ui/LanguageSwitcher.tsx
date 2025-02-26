import { useUnit } from 'effector-react'
import { Globe } from 'lucide-react'
import React from 'react'

// Иконка по умолчанию
import { $language, setLanguage } from '@entities/language/model/model'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui'

// Предполагаемая модель языка в Effector

// Тип для возможных языков
type Language = 'en' | 'ru' | 'es'

// Интерфейс для вариантов языка
interface LanguageOption {
  value: Language
  label: string
  icon: React.ReactNode
}

export const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, handleSetLanguage] = useUnit([$language, setLanguage])

  const languages: LanguageOption[] = [
    { value: 'en', label: 'English', icon: <span>🇬🇧</span> },
    { value: 'ru', label: 'Русский', icon: <span>🇷🇺</span> },
    { value: 'es', label: 'Español', icon: <span>🇪🇸</span> }
  ]

  return (
    <Select value={currentLanguage} onValueChange={handleSetLanguage}>
      <SelectTrigger className="flex h-8 w-8 items-center justify-center border-none p-0 [&>span]:hidden">
        <SelectValue asChild>
          {languages.find((lang) => lang.value === currentLanguage)?.icon}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {lang.icon}
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
