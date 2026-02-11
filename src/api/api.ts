import type { AxiosPromise } from 'axios'
import xhr from './xhr'
import {
  ICriarOcorrenciasEntrega,
  IEntregas,
  IItensPedido,
  IOcorrencias,
  IOcorrenciasEntrega,
} from '@/@types/global'

const entregas = {
  criarEntrega: (data: IEntregas): AxiosPromise<IEntregas> => {
    return xhr.post('/entregas', data)
  },

  listarEntregas: (): AxiosPromise<{ Entregas: IEntregas[] }> =>
    xhr.get('/entregas'),

  mostrarEntregas: (codigo_operacao: number): AxiosPromise<IEntregas> =>
    xhr.get(`/entregas/${codigo_operacao}`),

  atualizarEntregas: (
    codigo_operacao: number,
    data: Partial<IEntregas>,
  ): AxiosPromise<IEntregas> => {
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
  entregas,
  itensPedido,
  ocorrencias,
  ocorrenciasEntrega,
}

export default api
