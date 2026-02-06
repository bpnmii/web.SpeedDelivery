import React, { ThHTMLAttributes, ReactElement, ReactNode } from 'react'

import { IChangeOrder } from '@/@types'

import { FiltersContext } from '@/context/FiltersContext'
import { useContextSelector } from 'use-context-selector'

interface Props {
  column: string | ReactNode
  columnValue?: string
  columnType?: string
  columnToOrder?: string | undefined
  order?: 'ASC' | 'DESC' | undefined
  changeOrder?: (x: IChangeOrder) => void
  textAlign?: 'center' | 'right' | 'left'
}

type ThProps = ThHTMLAttributes<HTMLTableCellElement> & Props

export const Th: React.FC<ThProps> = ({
  column,
  columnValue,
  columnType,
  columnToOrder,
  order,
  changeOrder,
  className,
  style,
  textAlign,
  ...rest
}): ReactElement => {
  const setColumn = useContextSelector(
    FiltersContext,
    (context) => context.changeColumn,
  )

  const handleClassNameSort = (): string => {
    if (!columnToOrder || !order) {
      return ''
    }

    if (columnToOrder !== columnValue) {
      return 'table-sort'
    }

    if (order === 'ASC') {
      return 'table-sort-asc'
    }

    return 'table-sort-desc'
  }

  const handleChangeOrder = () => {
    if (!changeOrder) return

    const isTheColumnToOrder = columnToOrder === columnValue

    if (isTheColumnToOrder) {
      const newOrder = order === 'DESC' ? 'ASC' : 'DESC'
      changeOrder({ columnToOrder: columnValue, order: newOrder })
      return
    }

    const newOrder = order || 'ASC'

    changeOrder({ columnToOrder: columnValue, order: newOrder })

    if (columnValue && columnType) {
      setColumn({ value: columnValue, type: columnType })
    } else if (columnValue) {
      setColumn({ value: columnValue })
    }
  }

  return (
    <th
      {...rest}
      className={`${handleClassNameSort()} ${className ? className : ''} ${
        changeOrder && 'cursor-pointer'
      }`}
      onClick={handleChangeOrder}
      style={{
        verticalAlign: 'middle',
        textAlign: textAlign ? textAlign : 'inherit',
        ...style,
      }}
    >
      {column}
    </th>
  )
}

Th.defaultProps = {
  columnToOrder: undefined,
  order: undefined,
  changeOrder: undefined,
  columnValue: undefined,
}
