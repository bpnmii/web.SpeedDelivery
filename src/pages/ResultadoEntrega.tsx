import { StatusEntregaEnum, StatusResultadoEnum } from '@/@types/global'
import api from '@/api/api'
import { Button } from 'maxscalla-lib'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export function ResultadoEntrega() {
  const navigate = useNavigate()
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const [observacao, setObservacao] = useState('')
  const [status_resultado, setStatusResultado] = useState<
    StatusResultadoEnum | undefined
  >()

  async function onSubmit() {
    try {
      const codigo = Number(codigo_operacao)

      const data = {
        observacao: observacao,
        status_resultado: status_resultado,
        status_entrega: StatusEntregaEnum.CONCLUIDO,
      }

      await api.entregas.atualizarEntregas(codigo, data)

      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  return (
    <div className="max-container">
      <h1
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          margin: 20,
        }}
      >
        Como foi a entrega?
      </h1>

      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          gap: 8,
          marginBottom: 40,
        }}
      >
        <Button
          style={{ width: 50, height: 60, background: 'green' }}
          onClick={() => setStatusResultado(StatusResultadoEnum.ENTREGA_TOTAL)}
        >
          <i className="fa-regular fa-circle-check"></i>
          <span>Entrega Total</span>
        </Button>

        <Button
          style={{ width: 50, height: 60, background: 'orange' }}
          onClick={() =>
            setStatusResultado(StatusResultadoEnum.ENTREGA_PARCIAL)
          }
        >
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>Entrega Parcial</span>
        </Button>

        <Button
          style={{ width: 50, height: 60, background: 'red' }}
          onClick={() => setStatusResultado(StatusResultadoEnum.NAO_ENTREGUE)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
          <span>Não Entregue</span>
        </Button>
      </div>

      <h2
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: 10,
        }}
      >
        Observação
      </h2>

      <form
        action=""
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: 550,
        }}
      >
        <input
          type="text"
          style={{ borderRadius: 5 }}
          onChange={(e) => setObservacao(e.target.value)}
        />
        <footer
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            gap: 400,
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            style={{
              background: 'grey',
              borderRadius: 3,
              border: 'none',
              width: 30,
              height: 50,
            }}
          >
            <i className="fa-solid fa-arrow-left-long"></i>
          </Button>

          <Button
            onClick={() => {
              onSubmit()
              navigate('/')
            }}
            style={{
              background: 'grey',
              borderRadius: 3,
              border: 'none',
              width: 30,
              height: 50,
            }}
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </Button>
        </footer>
      </form>
    </div>
  )
}
