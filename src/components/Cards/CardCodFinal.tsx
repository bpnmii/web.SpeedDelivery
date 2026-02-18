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
                    Entregue parcialmente concluída
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
                    Entrega concluída
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
                    Não entregue
                  </span>
                )}
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
                      gap: 73,
                    }}
                  >
                    <span>{oc.ocorrencia?.descricao_ocorrencia}</span>

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
            {entrega.observacao && entrega.observacao.length > 0 ? (
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
            ) : (
              <span
                style={{
                  fontSize: 13,
                  display: 'flex',
                  margin: 20,
                  color: 'gray',
                }}
              >
                Nenhuma observação escrita.
              </span>
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
                    src={`http://localhost:3333/uploads/${img}`}
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
              <p style={{ margin: 20 }}>Nenhuma imagem cadastrada.</p>
            )}
          </MaxCard.Body>
        </div>
      </MaxCard.Container>
    </>
  )
}
