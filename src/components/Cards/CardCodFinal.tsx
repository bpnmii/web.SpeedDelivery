import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal/modal'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IEntregas,
  IItensPedido,
  IOcorrenciasEntrega,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/@types'
import api from '@/api/api'

export function CardCodFinal() {
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const navigate = useNavigate()

  const [IsOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [entrega, setEntrega] = useState<IEntregas | null>(null)
  const [itensPedido, setItensPedido] = useState<IItensPedido[]>([])
  const [ocorrencias, setOcorrencias] = useState<IOcorrenciasEntrega[]>([])

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

  let conteudoObservacao

  const possuiMotivoOcorrencia = ocorrencias.some(
    (oc) => oc.ocorrencia?.tipo_ocorrencia === 'MOTIVO_OCORRENCIA',
  )

  const temObservacao =
    !!entrega.observacao && entrega.observacao.trim().length > 0

  const temImagem = !!entrega.imagem?.length

  if (temObservacao) {
    conteudoObservacao = (
      <span
        style={{
          fontSize: 13,
          display: 'flex',
          margin: 20,
          color: 'gray',
        }}
      >
        {entrega.observacao}
      </span>
    )
  } else if (temImagem) {
    conteudoObservacao = (
      <span
        style={{
          fontSize: 13,
          display: 'flex',
          margin: 20,
          color: 'gray',
        }}
      >
        Justificado por imagem.
      </span>
    )
  } else if (possuiMotivoOcorrencia) {
    conteudoObservacao = (
      <span
        style={{
          fontSize: 13,
          display: 'flex',
          margin: 20,
          color: 'gray',
        }}
      >
        Justificado por ocorrência, sem observação textual.
      </span>
    )
  } else {
    conteudoObservacao = (
      <span
        style={{
          fontSize: 13,
          display: 'flex',
          margin: 20,
          color: 'gray',
        }}
      >
        Nenhuma observação registrada.
      </span>
    )
  }

  const tempoTotal = calcularTempoOcorrencia(
    ocorrencias,
    'Iniciado',
    'Concluído',
  )

  function calcularTempoOcorrencia(
    ocorrencias: IOcorrenciasEntrega[],
    nomeInicio: string,
    nomeFim: string,
  ): string {
    const inicio = ocorrencias.find(
      (o) => o.ocorrencia?.nome_ocorrencia === nomeInicio,
    )

    const fim = ocorrencias.find(
      (o) => o.ocorrencia?.nome_ocorrencia === nomeFim,
    )

    if (!inicio?.created_at || !fim?.created_at) return '00:00:00'

    const dataInicio = new Date(inicio.created_at).getTime()
    const dataFim = new Date(fim.created_at).getTime()

    const diffMs = dataFim - dataInicio

    if (diffMs <= 0) return '00:00:00'

    const totalSegundos = Math.floor(diffMs / 1000)

    const horas = Math.floor(totalSegundos / 3600)
    const minutos = Math.floor((totalSegundos % 3600) / 60)
    const segundos = totalSegundos % 60

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(
      2,
      '0',
    )}:${String(segundos).padStart(2, '0')}`
  }

  const tempoPausado = calcularTempoPausado(ocorrencias, 'Pausado', 'Retomado')

  function calcularTempoPausado(
    ocorrencias: IOcorrenciasEntrega[],
    nomePausa: string,
    nomeRetomada: string,
  ): string {
    if (!ocorrencias.length) return '00:00:00'

    // Ordena por data crescente
    const ordenadas = [...ocorrencias].sort((a, b) => {
      const dataA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dataB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dataA - dataB
    })

    let totalMs = 0
    let inicioPausa: number | null = null

    for (const oc of ordenadas) {
      const nome = oc.ocorrencia?.nome_ocorrencia
      const data = oc.created_at ? new Date(oc.created_at).getTime() : null

      if (!data) continue

      if (nome === nomePausa) {
        inicioPausa = data
      }

      if (nome === nomeRetomada && inicioPausa) {
        totalMs += data - inicioPausa
        inicioPausa = null
      }
    }

    if (totalMs <= 0) return '00:00:00'

    const totalSegundos = Math.floor(totalMs / 1000)

    const horas = Math.floor(totalSegundos / 3600)
    const minutos = Math.floor((totalSegundos % 3600) / 60)
    const segundos = totalSegundos % 60

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(
      2,
      '0',
    )}:${String(segundos).padStart(2, '0')}`
  }

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
                <Button
                  onClick={() => navigate('/finalizadas')}
                  style={{ background: '#4CA78C' }}
                >
                  <i className="fa-solid fa-arrow-left-long"></i>
                </Button>
              </div>
            </div>
          </MaxCard.Header>
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
                  {entrega.endereco} - {entrega.bairro} - {entrega.cidade}/
                  {entrega.estado} - {entrega.CEP}
                </span>

                {entrega.status_resultado ===
                  StatusResultadoEnum.ENTREGA_PARCIAL && (
                  <span
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      margin: 5,
                      color: 'orange',
                    }}
                  >
                    <b>Entregue parcialmente concluída</b>
                  </span>
                )}
                {entrega.status_resultado ===
                  StatusResultadoEnum.ENTREGA_TOTAL && (
                  <span
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      margin: 5,
                      color: 'green',
                    }}
                  >
                    <b>Entrega concluída</b>
                  </span>
                )}
                {entrega.status_resultado ===
                  StatusResultadoEnum.NAO_ENTREGUE && (
                  <span
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      margin: 5,
                      color: 'red',
                    }}
                  >
                    <b>Não entregue</b>
                  </span>
                )}

                <span>
                  Tempo total = <b>{tempoTotal}</b>
                </span>
                <span
                  style={{
                    display: 'flex',
                  }}
                >
                  Tempo pausado = <b>{tempoPausado}</b>
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
            <h3 style={{ margin: 10 }}>Itens do pedido de entrega:</h3>
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
                      margin: 10,
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
            <h3 style={{ margin: 10 }}>Ocorrências:</h3>
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
                      margin: 10,
                      color: 'gray',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
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
              <p style={{ color: 'gray' }}>Nenhuma ocorrência registrada.</p>
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
            <h3 style={{ margin: 20 }}>Observações:</h3>
            {conteudoObservacao}
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
            <h3 style={{ margin: 20 }}>Galeria de imagens:</h3>

            {entrega.imagem && entrega.imagem.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  margin: 20,
                }}
              >
                {entrega.imagem.map((img, index) => (
                  <img
                    key={index}
                    src={`https://drive.google.com/uc?export=view&id=${img}`}
                    alt={`imagem-${index}`}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 8,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                  />
                ))}
              </div>
            ) : (
              <p style={{ margin: 20, color: 'gray' }}>
                Nenhuma imagem cadastrada.
              </p>
            )}
          </MaxCard.Body>
        </div>
      </MaxCard.Container>
    </>
  )
}
