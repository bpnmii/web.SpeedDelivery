import { useState } from 'react'
import { SubHeader } from '@/components'
import { Card } from '@/components/Cards/Card'
import { Filters } from 'maxscalla-lib'

export const Home = () => {
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined)

  const handleFilterChange = (
    _column: string | undefined,
    value: string | undefined,
  ) => {
    setFilterValue(value)
  }

  return (
    <>
      <SubHeader title="Entregas pendentes" />

      <div className="max-container">
        <div style={{ marginBottom: 20 }}>
          <Filters onChangeFilters={handleFilterChange} />
        </div>

        <Card filterValue={filterValue} />
      </div>
    </>
  )
}
