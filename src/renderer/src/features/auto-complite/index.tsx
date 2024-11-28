import React, { useState } from 'react'

import { ICity } from '../../../../shared/types'

export const AutoComplete: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ICity[]>([])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 0) {
      try {
        const cities = await window.api.searchCities(value, 5, 'DESC')
        setResults(cities)
      } catch (error) {
        console.log(error)
        setResults([])
      }
    } else {
      setResults([])
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Введите город"
        className="text-foreground"
      />
      {results.length > 0 && (
        <ul>
          {results.map((city, index) => (
            <li key={index}>
              {city.city}, {city.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
