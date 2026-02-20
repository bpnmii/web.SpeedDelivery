import { IOcorrencias, TipoOcorrenciaEnum } from '@/@types'
import api from '@/api/api'
import { Button } from 'maxscalla-lib'
import { useEffect, useState } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  codigoEntrega?: number
}

export function ModalPausar({ isOpen, onClose, codigoEntrega }: ModalProps) {
  const [ocorrencias, setOcorrencias] = useState<IOcorrencias[]>([])
  const [loading, setLoading] = useState(false)
  const [selecionada, setSelecionada] = useState('')

  useEffect(() => {
    async function fetchData() {
      if (!isOpen) return

      try {
        setLoading(true)
        const res = await api.ocorrencias.listarOcorrencias()

        setOcorrencias(res.data)
      } catch (err: any) {
        console.error(
          'ERRO AO BUSCAR OCORRÊNCIAS:',
          err.response?.data || err.message,
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isOpen])

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    if (!selecionada) return

    try {
      setLoading(true)

      console.log({
        codigo_entrega: Number(codigoEntrega),
        codigo_ocorrencia: Number(selecionada),
      })

      await api.ocorrenciasEntrega.criarOcorrenciaEntrega({
        codigo_entrega: Number(codigoEntrega),
        codigo_ocorrencia: Number(selecionada),
      })

      onClose()
    } catch (err: any) {
      console.error(
        'ERRO AO CRIAR OCORRÊNCIA:',
        err.response?.data || err.message,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 30,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          background: 'white',
          padding: 30,
          zIndex: 40,
          borderRadius: 10,
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Motivo da pausa:</h2>
          <Button
            onClick={onClose}
            style={{ background: 'grey', width: 30, height: 30, padding: 0 }}
          >
            <i className="fa-solid fa-x"></i>
          </Button>
        </div>

        <form
          style={{
            marginTop: 10,
          }}
          onSubmit={handleSubmit}
        >
          <select
            style={{
              width: '100%',
              height: '40px',
              padding: '8px',
              borderRadius: 6,
              border: '1px solid #ccc',
              backgroundColor: loading ? '#f0f0f0' : 'white',
              color: 'grey',
            }}
            value={selecionada}
            onChange={(e) => setSelecionada(e.target.value)}
            disabled={loading}
          >
            <option value="">
              {loading ? 'Carregando...' : 'Selecione o motivo...'}
            </option>
            {ocorrencias
              .filter(
                (oc) => oc.tipo_ocorrencia === TipoOcorrenciaEnum.MOTIVO_PAUSA,
              )
              .map((oc) => (
                <option key={oc.codigo_ocorrencia} value={oc.codigo_ocorrencia}>
                  {oc.nome_ocorrencia}
                </option>
              ))}
          </select>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Button type="submit" disabled={loading || !selecionada}>
              <span>{loading ? 'Aguarde...' : 'Confirmar'}</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
