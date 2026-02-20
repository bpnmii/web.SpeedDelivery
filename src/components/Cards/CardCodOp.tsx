import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal/modal'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IEntregas,
  IItensPedido,
  IOcorrenciasEntrega,
  StatusEntregaEnum,
} from '@/@types'
import api from '@/api/api'
import { ModalPausar } from '../Modal/modalPausar'

export function CardCodOp() {
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const navigate = useNavigate()

  const [IsPause, setIsPause] = useState(false)
  const [IsOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [entrega, setEntrega] = useState<IEntregas | null>(null)
  const [itensPedido, setItensPedido] = useState<IItensPedido[]>([])
  const [ocorrencias, setOcorrencias] = useState<IOcorrenciasEntrega[]>([])

  // --- FUNÇÃO DE LOCALIZAÇÃO COM ALTA PRECISÃO ---
  async function tratarAbrirRota() {
    if (!entrega) {
      console.log('❌ Entrega não encontrada')
      return
    }

    console.log('🚀 Iniciando rota com Google Maps')

    const enderecoDestino = `
    ${entrega.endereco},
    ${entrega.bairro},
    ${entrega.cidade},
    ${entrega.estado},
    ${entrega.CEP},
    Brasil
  `
      .replace(/\s+/g, ' ')
      .trim()

    console.log('📍 Destino:', enderecoDestino)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords

        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(
          enderecoDestino,
        )}&travelmode=driving`

        window.open(url, '_blank')
      },
      (error) => {
        // fallback: abre só destino
        const urlFallback = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          enderecoDestino,
        )}`

        window.open(urlFallback, '_blank')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  async function Pausar() {
    try {
      const codigo = Number(codigo_operacao)
      const data = { status_entrega: StatusEntregaEnum.PAUSADO }
      await api.entregas.atualizarEntregas(codigo, data)
      await api.ocorrenciasEntrega.criarOcorrenciaEntrega({
        codigo_entrega: Number(codigo_operacao),
        codigo_ocorrencia: Number(2),
      })
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  async function Retomar() {
    try {
      const codigo = Number(codigo_operacao)
      const data = { status_entrega: StatusEntregaEnum.INICIADO }
      await api.entregas.atualizarEntregas(codigo, data)
      await api.ocorrenciasEntrega.criarOcorrenciaEntrega({
        codigo_entrega: Number(codigo_operacao),
        codigo_ocorrencia: Number(3),
      })
      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!codigo_operacao) return
      try {
        setLoading(true)
        const codigo = Number(codigo_operacao)
        const { data: entregaData } = await api.entregas.mostrarEntregas(codigo)
        setEntrega(entregaData)
        const response = await api.ocorrenciasEntrega.mostrarOcorrenciaEntrega(
          codigo,
        )
        setOcorrencias(response.data)
        const { data: itensData } = await api.itensPedido.mostrarItensPedido(
          codigo,
        )
        setItensPedido(itensData)
      } catch (err: any) {
        console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [codigo_operacao])

  if (loading) return <p>Carregando detalhes...</p>
  if (!entrega) return <p>Entrega não encontrada.</p>

  return (
    <>
      <MaxCard.Container>
        <div
          style={{
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <MaxCard.Header>
            <div style={{ display: 'flex' }} className="d-flex gap-20">
              <div style={{ display: 'flex', gap: 20 }} className="initial">
                <Button onClick={() => navigate('/home')}>
                  <i className="fa-solid fa-arrow-left-long"></i>
                </Button>
                <Button onClick={tratarAbrirRota} style={{ marginLeft: 170 }}>
                  <i className="fa-sharp-duotone fa-light fa-circle-location-arrow"></i>{' '}
                  <span style={{ fontSize: 15 }}>Localizar</span>
                </Button>
              </div>
            </div>
          </MaxCard.Header>

          <MaxCard.Body>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 5,
              }}
            >
              <i className="fa-solid fa-user"></i>
              <div>
                <h3 style={{ display: 'flex', margin: 5 }}>
                  {entrega.nome_cliente}
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    display: 'flex',
                    margin: 5,
                  }}
                >
                  {entrega.endereco}, {entrega.bairro} - {entrega.cidade}/
                  {entrega.estado}
                </span>
              </div>
            </div>
          </MaxCard.Body>
        </div>
      </MaxCard.Container>

      <MaxCard.Container>
        <div
          style={{
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <MaxCard.Body>
            <h3 style={{ margin: 20 }}>Itens do pedido de entrega:</h3>
            {itensPedido && itensPedido.length > 0 ? (
              itensPedido.map((item) => (
                <div
                  key={item.codigo}
                  style={{
                    borderBottom: '1px solid #3333',
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      margin: 20,
                      color: 'gray',
                    }}
                  >
                    <span>
                      {item.quantidade} x {item.descricao_produto} (
                      {item.codigo})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum item encontrado.</p>
            )}
          </MaxCard.Body>
        </div>
      </MaxCard.Container>

      <MaxCard.Container>
        <div
          style={{
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <MaxCard.Body>
            <h3 style={{ margin: 20 }}>Ocorrências:</h3>
            {ocorrencias && ocorrencias.length > 0 ? (
              ocorrencias.map((oc, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: '1px solid #3333',
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      margin: 20,
                      color: 'gray',
                      gap: 165,
                    }}
                  >
                    <span>{oc.ocorrencia?.nome_ocorrencia}</span>

                    <span>
                      {oc.created_at
                        ? new Date(oc.created_at).toLocaleString()
                        : ''}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma ocorrência registrada.</p>
            )}
          </MaxCard.Body>
          <MaxCard.Footer>
            <div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              {entrega.status_entrega !== StatusEntregaEnum.PAUSADO ? (
                <Button onClick={() => setIsOpen(true)}>
                  Adicionar Ocorrência
                </Button>
              ) : null}
            </div>
          </MaxCard.Footer>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {entrega.status_entrega === StatusEntregaEnum.INICIADO ? (
            <Button onClick={() => (Pausar(), setIsPause(true))}>
              <i className="fa-solid fa-pause"></i> <span>Pausar</span>
            </Button>
          ) : (
            <Button onClick={Retomar}>
              <i className="fa-solid fa-play"></i> <span>Retomar</span>
            </Button>
          )}
          {entrega.status_entrega !== StatusEntregaEnum.PAUSADO ? (
            <Button
              onClick={() =>
                navigate(`/ResultadoEntrega/${entrega.codigo_operacao}`)
              }
            >
              <i className="fa-solid fa-angles-right"></i> Concluir
            </Button>
          ) : null}
        </div>

        <Modal
          isOpen={IsOpen}
          onClose={() => setIsOpen(false)}
          codigoEntrega={entrega.codigo_operacao!}
        />

        <ModalPausar
          isOpen={IsPause}
          onClose={() => setIsPause(false)}
          codigoEntrega={entrega.codigo_operacao!}
        />
      </MaxCard.Container>
    </>
  )
}
