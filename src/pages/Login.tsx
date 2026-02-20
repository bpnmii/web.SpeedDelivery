import { ReactElement, useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Button, Input } from 'maxscalla-lib'
import { ZodError, z } from 'zod'
import { IObjectGeneric } from '@/@types'
import {
  getValidationError,
  notifyErrorCatch,
  notifyErrorCatchZod,
} from '@/utils'
import { IDados, Screens } from '@/components/Screens'

import { useNavigate } from 'react-router-dom'
import api from '@/api/api'
import { useAuth } from '@/utils/useAuth'

interface Props {
  changeScreen: (value: Screens) => void
  setDados: (value: IDados) => void
  dados: IDados
}

export const Login = ({
  changeScreen,
  dados,
  setDados,
}: Props): ReactElement => {
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [verSenha, setVerSenha] = useState<boolean>(false)
  const login = useAuth((state) => state.login)

  const navigate = useNavigate()

  const handleLogin = async (data: IObjectGeneric) => {
    try {
      setIsLoading(true)

      formRef.current?.setErrors({})

      const schema = z.object({
        email: z.string().min(1, { message: 'Usuário obrigatório!' }),
        senha: z.string().min(1, { message: 'Senha obrigatória!' }),
      })

      const params = schema.parse(data)

      await login(params)

      navigate('/home')
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = getValidationError(error)
        formRef.current?.setErrors(errors)
        notifyErrorCatchZod(error)
      } else {
        notifyErrorCatch(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="d-flex flex-center flex-column flex-lg-row-fluid">
      <div className="w-form">
        <div className="brand-logo pd-b-30 mg-b-25">
          <div className="logo-link w-100 text-center">
            <img
              className="logo-dark w-100"
              src="./images/logo-cs-preto.png"
              alt="logo"
            />
          </div>
        </div>
        <div className="text-center mb-11">
          <h5
            style={{ fontSize: 36, fontWeight: 400 }}
            className="montserrat-regular mb-3 cs-color-dark"
          >
            Login
          </h5>
        </div>
        <Form ref={formRef} onSubmit={handleLogin}>
          <div className="form-group mg-b-20">
            <div className="form-label-group">
              <span
                className="form-label overline-title fs-12 weight-bold"
                style={{ color: '#8094AE' }}
              >
                Usuário
              </span>
            </div>
            <Input
              id="usuario"
              name="email"
              focusColor="blue"
              placeholder="Digite seu email"
            />
          </div>
          <div className="form-group mg-b-20">
            <div className="form-label-group">
              <span
                className="form-label overline-title fs-12 weight-bold"
                style={{ color: '#8094AE' }}
              >
                Senha de acesso
              </span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ justifyContent: 'end' }}
            >
              <Input
                id="senha"
                name="senha"
                focusColor="blue"
                type={`${verSenha ? 'text' : 'password'}`}
                placeholder="Senha"
                icon={
                  <span
                    className="d-flex align-items-center cursor-pointer"
                    onClick={() => setVerSenha(!verSenha)}
                    style={{ color: '#8094AE' }}
                  >
                    {verSenha ? (
                      <i className="fs-16 fa-regular fa-eye-slash" />
                    ) : (
                      <i className="fs-16 fa-regular fa-eye" />
                    )}
                  </span>
                }
              />
            </div>
          </div>
          <div className="d-flex form-group w-100">
            <Button
              titleLoading="Entrando..."
              type="submit"
              loading={isLoading}
              className="w-100"
            >
              Entrar
            </Button>
          </div>

          <div className="text-center mt-4">
            <span
              className="cursor-pointer"
              style={{ color: '#0066ff' }}
              onClick={() => changeScreen('register')}
            >
              Não possui uma conta? Crie Agora!
            </span>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
