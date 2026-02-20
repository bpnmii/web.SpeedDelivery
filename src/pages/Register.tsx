import { ReactElement, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Button, Input } from 'maxscalla-lib'
import { ZodError, z } from 'zod'
import {
  getValidationError,
  notifyErrorCatch,
  notifyErrorCatchZod,
  notifySuccess,
  notifyWarning,
} from '@/utils'
import axios from 'axios'
import { IDados, Screens } from '@/components/Screens'
import SpeedDeliveryLogo from '../../public/SpeedDeliveryLogo.png'

interface Props {
  changeScreen: (value: Screens) => void
  setDados: (value: IDados) => void
  dados: IDados
}

export const Register = ({ changeScreen }: Props): ReactElement => {
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [verSenha, setVerSenha] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [serverCode, setServerCode] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout | null = null
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [resendCooldown])

  // eslint-disable-next-line no-undef
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    if (!pasted) return
    const arr = pasted.split('')
    const newArr = [...code]
    arr.forEach((d, i) => {
      if (i < 6) newArr[i] = d
    })
    setCode(newArr)
    const next = document.getElementById(`code-${Math.min(arr.length, 5)}`)
    next?.focus()
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('')
      if (!digits.length) return
      const newArr = [...code]
      digits.forEach((d, i) => {
        if (index + i < 6) newArr[index + i] = d
      })
      setCode(newArr)
      const nextIndex = Math.min(index + digits.length - 1, 5)
      document.getElementById(`code-${nextIndex}`)?.focus()
      return
    }

    if (!/^\d?$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === 'Backspace') {
      if (code[index]) {
        const newCode = [...code]
        newCode[index] = ''
        setCode(newCode)
        return
      }
      if (index > 0) {
        const prev = document.getElementById(
          `code-${index - 1}`,
        ) as HTMLInputElement | null
        prev?.focus()
        const newCode = [...code]
        newCode[index - 1] = ''
        setCode(newCode)
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus()
    }
    if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const handleRegister = async (data: IDados) => {
    try {
      setIsLoading(true)
    } catch (error) {
      notifyErrorCatch(error, 'Erro ao criar conta!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="">
      <div className="d-flex flex-center flex-column flex-lg-row-fluid flex-lg-row flex-column-fluid">
        <div className="w-form" style={{ width: '90%', height: '80vh' }}>
          <div className="brand-logo pd-b-10 mg-b-15">
            <div className="text-center">
              <img
                style={{ width: 180, height: 70 }}
                src={SpeedDeliveryLogo}
                alt=""
              />
            </div>
          </div>

          {!showCode ? (
            <>
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
                    Unidade de negocio
                  </span>
                  <Input
                    id="unidade_negocio"
                    name="unidade_negocio"
                    placeholder="Digite sua unidade de negocio"
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
                    id="email"
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
                    id="senha"
                    name="senha"
                    type={verSenha ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    focusColor="blue"
                    style={{ width: '100%' }}
                    icon={
                      <span className="d-flex align-items-center cursor-pointer"
                        onClick={() => setVerSenha(!verSenha)}
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
                <Button type="submit" loading={isLoading} className="w-100 ">
                  Criar conta
                </Button>
              </div>

                <div className="text-center mt-4">
                  <span
                    className="cursor-pointer"
                    style={{ color: '#0066ff' }}
                    onClick={() => changeScreen('login')}
                  >
                    Já tem uma conta? Entrar
                  </span>
                </div>
              </Form>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <h5 className="montserrat-regular cs-color-dark">
                  Digite o código enviado
                </h5>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  maxWidth: '320px',
                  margin: '0 auto',
                }}
              >
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    style={{
                      width: '44px',
                      height: '52px',
                      textAlign: 'center',
                      fontSize: '20px',
                      borderRadius: '10px',
                      border: '1px solid #ccc',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
