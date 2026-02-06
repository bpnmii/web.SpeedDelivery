import { FormEvent } from 'react'

export type IErrorCatch = { [x: string]: any }

export type IDataForm = FormEvent<HTMLFormElement>

export type IObjectGeneric = { [x: string]: any }

export interface IChangeOrder {
  columnToOrder: string | undefined
  order: 'ASC' | 'DESC'
}

export interface IFilters {
  dataInicial: string
  dataFinal: string
  numeroLoja?: string
  pagina?: number
  quantidade?: number
  order?: 'ASC' | 'DESC'
  columnToOrder?: string
  column?: string
  value?: string
}
