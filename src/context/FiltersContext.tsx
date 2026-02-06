import React, { useState } from 'react'
import { IChildren } from 'maxscalla-lib/dist/@types'
import { createContext } from 'use-context-selector'

interface ColumnProps {
  type?: string
  value: string
}

interface FiltersContextProps {
  column: ColumnProps
  value: string | number | undefined
  changeColumn: (column: ColumnProps) => void
  changeValue: (value: string | number | undefined) => void
  cleanFilters: () => void
}

export const FiltersContext = createContext({} as FiltersContextProps)

export const FiltersProvider = ({ children }: IChildren) => {
  const [column, setColumn] = useState<ColumnProps>({} as ColumnProps)
  const [value, setValue] = useState<string | number | undefined>(undefined)

  const changeColumn = (column: ColumnProps) => {
    setColumn(column)
  }

  const changeValue = (value: string | number | undefined) => {
    setValue(value)
  }

  const cleanFilters = () => {
    setColumn({} as ColumnProps)
    setValue(undefined)
  }

  return (
    <FiltersContext.Provider
      value={{
        column,
        value,
        changeColumn,
        changeValue,
        cleanFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
