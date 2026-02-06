/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from 'react'

import { notifyWarning } from '../../utils/toast'
import { Form } from '@unform/web'

import { FiltersContext } from '@/context/FiltersContext'
import { useContextSelector } from 'use-context-selector'

import { Button, getColor, Input, Select } from 'maxscalla-lib'
import { InputNumber } from './components'
import { Container } from './styles'

interface Column {
  name: string
  value?: string
  type?: string
}

interface FiltersProps {
  columns?: Column[]
  hasQuantidade?: boolean
  showEstorno?: boolean
  hasStatus?: boolean
  changeEstorno?: () => void
  quantidade: number
  onChangeQuantidade: (q: number) => void
  onChangeFilters: (c: string | undefined, v: string | undefined) => void
  cleanFunction?: () => void
}

interface ColumnProps {
  type?: string
  value: string
}

export const Filters = ({
  columns,
  hasQuantidade,
  showEstorno,
  hasStatus,
  changeEstorno,
  onChangeFilters,
  quantidade,
  onChangeQuantidade,
  cleanFunction,
}: FiltersProps): ReactElement => {
  const { column, value, setColumn, setValue } = useContextSelector(
    FiltersContext,
    (context) => {
      return {
        column: context.column,
        value: context.value,
        setColumn: context.changeColumn,
        setValue: context.changeValue,
      }
    },
  )

  const changeValue = (newValue: string) => {
    setValue(newValue)
  }

  const onSubmit = (val?: string) => {
    if (columns && !column.value) {
      notifyWarning({ message: 'Selecione uma coluna para pesquisar' })
      return
    }

    if (!value && !val) {
      notifyWarning({ message: 'Digite algum filtro para pesquisar' })
      return
    }

    if (val) {
      onChangeFilters(column.value, String(val))
    } else {
      onChangeFilters(column.value, String(value))
    }
  }

  const cleanFiltros = () => {
    setColumn({} as ColumnProps)
    setValue(undefined)
    onChangeFilters(undefined, undefined)

    cleanFunction && cleanFunction()
  }

  const fetchCustomInputFromColumn = () => {
    switch (column.type) {
      case 'number':
        return <InputNumber value={value} setValue={changeValue} />

      default:
        return (
          <Input
            id="filter-input"
            type="search"
            name="value"
            placeholder="Digite aqui..."
            focusColor={getColor('blue')}
            value={value || ''}
            onChange={(e: any) => setValue(e.target.value)}
            style={{ minWidth: 200 }}
          />
        )
    }
  }

  const handleSetColumn = (targetValue: string) => {
    const type = targetValue.split(',')[0]
    const value = targetValue.split(',')[1]

    setValue('')
    setColumn({ value, type })
  }

  useEffect(() => {
    setValue(undefined)
  }, [])

  return (
    <Container className="row justify-between w-100 m-0 gap-10-px d-flex m-0">
      <Form
        onSubmit={() => onSubmit()}
        className="text-left p-0 d-flex flex-row gap-10-px w-mobile-100 flex-wrap justify-content-center w-100"
      >
        {hasQuantidade ? (
          <Select
            name="length-table"
            style={{ width: 'fit-content' }}
            value={quantidade}
            focusColor={getColor('blue')}
            onChange={(e) => onChangeQuantidade(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        ) : null}
        {columns ? (
          <Select
            id="columns-filter"
            name="value"
            style={{ width: 'fit-content' }}
            value={[column.type as string, column.value] || ''}
            focusColor={getColor('blue')}
            onChange={(e: any) => handleSetColumn(e.target.value)}
          >
            <optgroup label="Selecione uma coluna" />
            <option hidden>Selecione uma coluna</option>
            {columns.map(
              (c) =>
                c.value && (
                  <option key={c.name} value={[c.type as string, c.value]}>
                    {c.name}
                  </option>
                ),
            )}
          </Select>
        ) : null}
        <div className="dataTables_filter w-min-200px w-mobile-100 flex-1">
          {fetchCustomInputFromColumn()}
        </div>
        {changeEstorno && hasStatus ? (
          <button
            type="button"
            className="form-control"
            style={{
              width: 'fit-content',
            }}
            onClick={changeEstorno}
          >
            {showEstorno ? 'Exibir estorno' : 'Ocultar estorno'}
          </button>
        ) : null}
        <div
          className="form-group w-mobile-100 gap-10-px align-items-center"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Button type="submit" bgColor="lightGreen">
            Filtrar
          </Button>
          <Button type="button" bgColor="blue" onClick={cleanFiltros}>
            Limpar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

Filters.displayName = 'Filters'

Filters.defaultProps = {
  hasQuantidade: false,
  hasOpcoesPesquisa: false,
  columns: undefined,
  filters: undefined,
  onChangeQuantidade: undefined,
  onChangeOpcaoPesquisa: undefined,
}
