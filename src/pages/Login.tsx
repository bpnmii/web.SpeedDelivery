import { ReactElement, useRef, useState } from 'react'

import {
  notifyErrorCatch,
  getValidationError,
  notifyErrorCatchZod,
} from '../utils'
import { IObjectGeneric } from '../@types'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Button, Input } from 'maxscalla-lib'
import { ZodError, z } from 'zod'

const Index = (): ReactElement => {
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [verSenha, setVerSenha] = useState<boolean>(false)

  const handleLogin = async (data: IObjectGeneric) => {
    try {
      setIsLoading(true)

      formRef.current?.setErrors({})

      const schema = z.object({
        apelido: z
          .string()
          .min(1, { message: 'Unidade de negócio obrigatória!' }),
        usuario: z.string().min(1, { message: 'Usuário obrigatório!' }),
        senha: z.string().min(1, { message: 'Senha obrigatória!' }),
      })

      await schema.parse(data)

      // const ciphertext = crypto.AES.encrypt(data.senha, SIGNATURE).toString()

      const params = {
        apelido: data.apelido,
        usuario: data.usuario,
        senha: data.senha,
      }

      console.log(params)

      setIsLoading(false)
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = getValidationError(error as ZodError)

        formRef.current?.setErrors(errors)
        notifyErrorCatchZod(error)
      } else {
        notifyErrorCatch(error)
      }

      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   if (tokenAuth) {
  //     navigate('/demonstrativos/comercial-dashboards')
  //   }
  // }, [])

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100-vh">
      <div
        className="form-container d-flex flex-column flex-lg-row-fluid w-lg-50 order-2 order-lg-1 h-100-vh justify-content-center cs-bg-white"
        style={{ maxWidth: 700 }}
      >
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
                    Unidade de negócio
                  </span>
                </div>
                <Input
                  id="apelido"
                  name="apelido"
                  focusColor="blue"
                  placeholder="Apelido ou número de série"
                />
              </div>
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
                  name="usuario"
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
                    // required
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
            </Form>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 hide-background-image"
        style={{
          backgroundImage: 'url(/images/fundo-cs.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundClip: 'content-box',
          backgroundSize: '95%, auto, contain',
          backgroundColor: '#f9f9f9',
        }}
      />
    </div>
  )
}

export default Index
