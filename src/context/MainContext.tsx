import { ReactNode, useState } from 'react'
import moment from 'moment'
import { IFilters } from '../@types'
import { createContext } from 'use-context-selector'

interface IMainContextProps {
  children: ReactNode
}

interface MainContextProps {
  filters: IFilters
  dataSelecionada: string
  changeFilters: (value: IFilters) => void
  changeDataSelecionada: (value: string) => void
  handleChangeMonth: (operacao: 'sub' | 'add') => void
  handleChangeYear: (operacao: 'sub' | 'add') => void
  changeMesSelecionado: (mes: string) => void
  changeNumeroLoja: (numeroLoja: number | string) => void
}

export const MainContext = createContext({} as MainContextProps)

const defaultFilters = {
  pagina: 1,
  quantidade: 9999,
  dataInicial: moment().startOf('month').format('YYYY-MM-DD'),
  dataFinal: moment().endOf('month').format('YYYY-MM-DD'),
  numeroLoja: '999',
}

export const MainProvider = ({ children }: IMainContextProps) => {
  const [dataSelecionada, setDataSelecionada] = useState<string>(
    moment().format('YYYY-MM-DD'),
  )
  const [filters, setFilters] = useState<IFilters>(defaultFilters)

  const changeFilters = (value: IFilters) => {
    setFilters({ ...filters, ...value })
  }

  const changeDataSelecionada = (value: string) => {
    setDataSelecionada(value)
  }

  const changeMesSelecionado = (mes: string) => {
    const dia = moment(dataSelecionada).format('DD')
    const year = moment(dataSelecionada).format('YYYY')
    const filterMes = moment(`${year}-${mes}-${dia}`, 'YYYY-MM-DD').format(
      'YYYY-MM-DD',
    )

    setDataSelecionada(filterMes)

    changeFilters({
      ...filters,
      dataInicial: moment(filterMes).startOf('month').format('YYYY-MM-DD'),
      dataFinal: moment(filterMes).endOf('month').format('YYYY-MM-DD'),
    })
  }

  const changeNumeroLoja = (numeroLoja: number | string) => {
    if (numeroLoja === filters.numeroLoja) return
    changeFilters({ ...filters, numeroLoja: String(numeroLoja) })
  }

  const handleChangeMonth = (operacao: 'sub' | 'add') => {
    if (operacao === 'sub') {
      const filterMes = moment(filters.dataInicial)
        .subtract(1, 'month')
        .format('YYYY-MM-DD')

      const filterData = moment(dataSelecionada)
        .subtract(1, 'month')
        .format('YYYY-MM-DD')

      changeFilters({
        ...filters,
        dataInicial: moment(filterMes).startOf('month').format('YYYY-MM-DD'),
        dataFinal: moment(filterMes).endOf('month').format('YYYY-MM-DD'),
      })

      changeDataSelecionada(filterData)

      return
    }

    const filterMes = moment(filters.dataInicial)
      .add(1, 'month')
      .format('YYYY-MM-DD')
    const filterData = moment(dataSelecionada)
      .add(1, 'month')
      .format('YYYY-MM-DD')

    changeFilters({
      ...filters,
      dataInicial: moment(filterMes).startOf('month').format('YYYY-MM-DD'),
      dataFinal: moment(filterMes).endOf('month').format('YYYY-MM-DD'),
    })

    changeDataSelecionada(filterData)
  }

  const handleChangeYear = (operacao: 'sub' | 'add') => {
    if (operacao === 'sub') {
      const filterYear = moment(filters.dataInicial)
        .subtract(1, 'year')
        .format('YYYY-MM-DD')
      const filterData = moment(dataSelecionada)
        .subtract(1, 'year')
        .format('YYYY-MM-DD')

      changeFilters({
        ...filters,
        dataInicial: moment(filterYear).startOf('month').format('YYYY-MM-DD'),
        dataFinal: moment(filterYear).endOf('month').format('YYYY-MM-DD'),
      })

      changeDataSelecionada(filterData)

      return
    }

    const filterYear = moment(filters.dataInicial)
      .add(1, 'year')
      .format('YYYY-MM-DD')
    const filterData = moment(dataSelecionada)
      .add(1, 'year')
      .format('YYYY-MM-DD')

    changeFilters({
      ...filters,
      dataInicial: moment(filterYear).startOf('month').format('YYYY-MM-DD'),
      dataFinal: moment(filterYear).endOf('month').format('YYYY-MM-DD'),
    })

    changeDataSelecionada(filterData)
  }

  const values = {
    filters,
    dataSelecionada,
    changeFilters,
    changeDataSelecionada,
    handleChangeMonth,
    handleChangeYear,
    changeMesSelecionado,
    changeNumeroLoja,
  }

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>
}
