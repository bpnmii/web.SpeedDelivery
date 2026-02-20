import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { env } from '../env'

const url = 'http://192.168.1.62:3333'
//env.VITE_ENV === 'dev' ? 'http://localhost:3333' :

const headers = (tokenAuth: string): AxiosRequestHeaders => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  Authorization: `Bearer ${tokenAuth}`,
})

const getHeaders = (): AxiosRequestHeaders => {
  const tokenAuth = localStorage.getItem('@CSGestor:token')

  return headers(tokenAuth!)
}

const xhr = axios.create({
  baseURL: url,
  headers: getHeaders(),
})

export const setTokenAfterLogin = async (tokenAuth: string): Promise<void> => {
  xhr.interceptors.request.use(
    async (config: AxiosRequestConfig) => ({
      ...config,
      headers: headers(tokenAuth),
    }),
    (error) => Promise.reject(error),
  )
}

xhr.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default xhr
