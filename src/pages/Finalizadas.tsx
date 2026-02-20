import { useState } from 'react'
import { SubHeader } from '@/components'
import { CardFinal } from '@/components/Cards/CardFinal'
import { Filters } from 'maxscalla-lib'

export function Finalizadas() {
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined)

  const handleFilterChange = (
    _column: string | undefined,
    value: string | undefined,
  ) => {
    setFilterValue(value)
  }

  return (
    <>
      <SubHeader title="Entregas finalizadas" isDateDisabled />

      <div className="max-container">
        <div style={{ marginBottom: 20 }}>
          <Filters onChangeFilters={handleFilterChange} />
        </div>

        <CardFinal filterValue={filterValue} />
      </div>
    </>
  )
}
