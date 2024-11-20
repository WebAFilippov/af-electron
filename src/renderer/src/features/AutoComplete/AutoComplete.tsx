import React, { useState } from 'react'

const AutoComplete: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ city: string; region: string }[] | string[]>([])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 0) {
      const cities = await window.search_cities.searchCities(value)
      setResults(cities)
    } else {
      setResults([])
    }
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Введите город" />
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

export default AutoComplete
