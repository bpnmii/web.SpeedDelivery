import { ReactElement, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Button, Input } from 'maxscalla-lib'
import { notifyErrorCatch } from '@/utils'
import { Screens } from '@/components/Screens'
import SpeedDeliveryLogo from '../../public/SpeedDeliveryLogo.png'
import api from '@/api/api'

interface Props {
  changeScreen: (value: Screens) => void
}

interface FormData {
  email: string
  senha: string
  unidade_negocio: string
}

export const Register = ({ changeScreen }: Props): ReactElement => {
  const formRef = useRef<FormHandles>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [verSenha, setVerSenha] = useState(false)

  const handleRegister = async (data: FormData) => {
    try {
      setIsLoading(true)

      await api.entregadores.criarEntregadores({
        email: data.email,
        senha: data.senha,
        unidade_negocio: data.unidade_negocio,
      })

      changeScreen('login')
    } catch (error) {
      notifyErrorCatch(error, 'Erro ao criar conta!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="d-flex flex-center flex-column flex-lg-row-fluid flex-lg-row flex-column-fluid">
        <div className="w-form" style={{ width: '90%', height: '80vh' }}>
          <div className="brand-logo pd-b-10 mg-b-15 text-center">
            <img
              style={{ width: 180, height: 70 }}
              src={SpeedDeliveryLogo}
              alt="Logo"
            />
          </div>

          <div className="text-center mb-11">
            <h5
              style={{ fontSize: 20, fontWeight: 500 }}
              className="mb-3 cs-color-dark"
            >
              Criar conta
            </h5>
          </div>

          <Form ref={formRef} onSubmit={handleRegister}>
            <div className="form-group mg-b-20">
              <span
                className="form-label overline-title fs-12 weight-bold"
                style={{ color: '#8094AE' }}
              >
                Unidade de negócio
              </span>
              <Input
                name="unidade_negocio"
                placeholder="Digite sua unidade de negócio"
                focusColor="blue"
              />
            </div>

            <div className="form-group mg-b-20">
              <span
                className="form-label overline-title fs-12 weight-bold"
                style={{ color: '#8094AE' }}
              >
                Email
              </span>
              <Input
                name="email"
                placeholder="Digite seu email"
                focusColor="blue"
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group mg-b-20">
              <span
                className="form-label overline-title fs-12 weight-bold"
                style={{ color: '#8094AE' }}
              >
                Senha
              </span>
              <Input
                name="senha"
                type={verSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                focusColor="blue"
                style={{ width: '100%' }}
                icon={
                  <span
                    onClick={() => setVerSenha((prev) => !prev)}
                    style={{ color: '#8094AE', cursor: 'pointer' }}
                  >
                    <i
                      className={`fa-regular ${
                        verSenha ? 'fa-eye-slash' : 'fa-eye'
                      }`}
                    />
                  </span>
                }
              />
            </div>

            <div className="d-flex form-group w-100">
              <Button type="submit" loading={isLoading} className="w-100">
                Criar conta
              </Button>
            </div>

            <div className="text-center mt-4">
              <span
                style={{ color: '#0066ff', cursor: 'pointer' }}
                onClick={() => changeScreen('login')}
              >
                Já tem uma conta? Entrar
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
