import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

import { notifyErrorCatch } from '../utils'

import { Screens } from '@/components/Screens'
import { IDados, IEntregador } from '@/@types'
import api from '@/api/api'

interface ILoginRequest {
  email: string
  senha: string
}

interface Auth {
  token: string | null
  usuario: IEntregador | null
  login: (params: ILoginRequest) => Promise<void>
  logout: () => void
}

export const useAuth = create(
  persist<Auth>(
    (set, get) => {
      return {
        token: null,
        usuario: null,

        login: async (params: ILoginRequest): Promise<void> => {
          try {
            const { data } = await api.entregadores.loginEntregador(params)

            set({
              token: data.token,
              usuario: data.entregador,
            })
          } catch (error) {
            notifyErrorCatch(error, 'Erro ao efetuar o login!')
          }
        },

        logout: () => {
          localStorage.clear()

          set({
            token: null,

            usuario: null,
          })

          window.location.pathname = '/'
        },
      }
    },
    {
      name: '@SpeedDelivery:login',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
