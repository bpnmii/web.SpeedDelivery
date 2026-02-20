import type { AxiosPromise } from 'axios'
import xhr from './xhr'
import {
  ICriarOcorrenciasEntrega,
  IDados,
  IEntregador,
  IEntregas,
  IItensPedido,
  ILogin,
  IOcorrencias,
  IOcorrenciasEntrega,
} from '@/@types/global'

const entregadores = {
  criarEntregadores: (data: IDados): AxiosPromise<IEntregador> => {
    return xhr.post('/entregadores', data)
  },

  listarEntregadores: (): AxiosPromise<{ Entregadores: IEntregador[] }> =>
    xhr.get('/entregadores'),

  atualizarEntregador: (
    codigo_entregador: number,
    data: Partial<IEntregador>,
  ): AxiosPromise<IEntregador> => {
    return xhr.patch(`/entregadores/${codigo_entregador}`, data)
  },

  deletarEntregador: (codigo_entregador: number): AxiosPromise<void> => {
    return xhr.delete(`/entregadores/${codigo_entregador}`)
  },

  loginEntregador: (
    data: ILogin,
  ): AxiosPromise<{ token: string; entregador: IEntregador }> => {
    return xhr.post(`/entregadores/login`, data)
  },
}

const entregas = {
  criarEntrega: (data: IEntregas): AxiosPromise<IEntregas> => {
    return xhr.post('/entregas', data)
  },

  listarEntregas: (): AxiosPromise<{ Entregas: IEntregas[] }> =>
    xhr.get('/entregas'),

  mostrarEntregas: (codigo_operacao: number): AxiosPromise<IEntregas> =>
    xhr.get(`/entregas/${codigo_operacao}`),

  mostrarEntregasEntregador: (
    codigo_entregador: number,
  ): AxiosPromise<IEntregas[]> =>
    xhr.get(`/entregas/entregador/${codigo_entregador}`),

  atualizarEntregas: (
    codigo_operacao: number,
    data: any,
  ): AxiosPromise<IEntregas> => {
    const isFormData = data instanceof FormData

    return xhr.patch(`/entregas/${codigo_operacao}`, data)
  },

  deletarEntregas: (codigo_operacao: number): AxiosPromise<void> => {
    return xhr.delete(`/entregas/${codigo_operacao}`)
  },
}

const itensPedido = {
  criarItensPedido: (data: IItensPedido): AxiosPromise<IItensPedido> => {
    return xhr.post('/itensPedido', data)
  },

  listarItensPedidos: (): AxiosPromise<{
    ItensPedidos: IItensPedido[]
  }> => xhr.get('/itensPedido'),

  mostrarItensPedido: (codigo_entrega: number) =>
    xhr.get(`/itensPedido/${codigo_entrega}`),

  atualizarItensPedidos: (
    codigo: number,
    data: Partial<IItensPedido>,
  ): AxiosPromise<IItensPedido> => {
    return xhr.patch(`/itensPedido/${codigo}`, data)
  },

  deletarItensPedidos: (codigo: number): AxiosPromise<void> => {
    return xhr.delete(`/itensPedido/${codigo}`)
  },
}

const ocorrencias = {
  criarOcorrencia: (data: IOcorrencias): AxiosPromise<IOcorrencias> => {
    return xhr.post('/ocorrencias', data)
  },

  listarOcorrencias: (): AxiosPromise<{ Ocorrencias: IOcorrencias[] }> =>
    xhr.get('/ocorrencias'),

  atualizarOcorrencia: (
    codigo_ocorrencia: number,
    data: Partial<IOcorrencias>,
  ): AxiosPromise<IOcorrencias> => {
    return xhr.patch(`/ocorrencias/${codigo_ocorrencia}`, data)
  },

  deletarOcorrencia: (codigo_ocorrencia: number): AxiosPromise<void> => {
    return xhr.delete(`/ocorrencias/${codigo_ocorrencia}`)
  },
}

const ocorrenciasEntrega = {
  criarOcorrenciaEntrega: (
    data: ICriarOcorrenciasEntrega,
  ): AxiosPromise<IOcorrenciasEntrega> => {
    return xhr.post('/ocorrenciasEntrega', data)
  },

  listarOcorrenciaEntregas: (): AxiosPromise<{
    OcorrenciaEntregas: IOcorrenciasEntrega[]
  }> => xhr.get('/ocorrenciasEntrega'),

  mostrarOcorrenciaEntrega: (
    codigo_entrega: number,
  ): AxiosPromise<IOcorrenciasEntrega[]> =>
    xhr.get(`/ocorrenciasEntrega/${codigo_entrega}`),
}

const api = {
  entregadores,
  entregas,
  itensPedido,
  ocorrencias,
  ocorrenciasEntrega,
}

export default api
