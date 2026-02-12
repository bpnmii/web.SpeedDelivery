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

export enum StatusEntregaEnum {
  NAO_INICIADO = 'NAO_INICIADO',
  INICIADO = 'INICIADO',
  PAUSADO = 'PAUSADO',
  CONCLUIDO = 'CONCLUIDO',
}

export enum StatusResultadoEnum {
  ENTREGA_TOTAL = 'ENTREGA_TOTAL',
  ENTREGA_PARCIAL = 'ENTREGA_PARCIAL',
  NAO_ENTREGUE = 'NAO_ENTREGUE',
}

export interface IEntregas {
  sequencia_entrega: number
  codigo_operacao?: number
  codigo_cliente: number
  nome_cliente: string
  CEP: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  observacao?: string
  imagem?: string[]
  status_entrega?: StatusEntregaEnum
  status_resultado?: StatusResultadoEnum
}

export interface IItensPedido {
  codigo?: number
  codigo_entrega: number
  descricao_produto: string
  embalagem: string
  quantidade: number
}

export interface IOcorrencias {
  codigo_ocorrencia: number
  descricao_ocorrencia: string
}

export interface ICriarOcorrenciasEntrega {
  codigo_ocorrencia?: number
  codigo_entrega?: number
}

export interface IOcorrenciasEntrega {
  index?: number
  created_at?: string
  entrega?: IEntregas
  ocorrencia?: IOcorrencias
}
