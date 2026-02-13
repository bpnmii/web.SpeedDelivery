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
            <div>
              <h2>
                CÓDIGO DA OPERAÇÃO:{' '}
                <span style={{ color: '#4CA78C', fontSize: 20 }}>
                  {entrega.codigo_operacao}
                </span>
              </h2>
            </div>
            <div style={{ fontSize: 15, marginBottom: 20 }}>
              <h3>
                Entrega sequencial:
                <span style={{ color: '#4CA78C' }}>
                  {entrega.sequencia_entrega}
                </span>
              </h3>
            </div>
            <div style={{ fontSize: 15, marginBottom: 20 }}>
              <i className="fa-regular fa-user m-2"></i>
              <span style={{ color: 'gray' }}>{entrega.nome_cliente}</span>
            </div>
            <div style={{ fontSize: 15 }}>
              <i className="fa-light fa-location-dot m-2"></i>
              <span style={{ color: 'gray' }}>{entrega.endereco}</span>
              <br />
              <span style={{ color: 'gray' }}>
                {entrega.bairro}, {entrega.cidade} - {entrega.estado}
              </span>
              <br />
              <span style={{ color: 'gray' }}>CEP: {entrega.CEP}</span>
              <br />
              <span style={{ color: '4CA78C' }}>
                Status Entrega:{' '}
                <span style={{ color: '#4CA78C', fontWeight: 'bold' }}>
                  Concluído
                </span>
              </span>
              <br />
              <span style={{ color: '4CA78C' }}>
                Status do resultado:{' '}
                {entrega.status_resultado ===
                StatusResultadoEnum.ENTREGA_TOTAL ? (
                  <span style={{ color: '#4CA78C', fontWeight: 'bold' }}>
                    Entrega total
                  </span>
                ) : entrega.status_resultado ===
                  StatusResultadoEnum.ENTREGA_PARCIAL ? (
                  <span style={{ color: '#cc8400', fontWeight: 'bold' }}>
                    Entrega Parcial
                  </span>
                ) : (
                  <span style={{ color: '#b30000', fontWeight: 'bold' }}>
                    Não entrege
                  </span>
                )}
              </span>
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
          <MaxCard.Header>
            <h1>Observações do produto:</h1>
          </MaxCard.Header>
          <MaxCard.Body>
            {itensPedido && itensPedido.length > 0 ? (
              itensPedido.map((item) => (
                <div
                  key={item.codigo}
                  style={{
                    borderBottom: '1px solid #3333',
                    marginBottom: 20,
                    paddingBottom: 10,
                  }}
                >
                  <div style={{ fontSize: 15, marginBottom: 20 }}>
                    <span> Código da entrega: </span>
                    <span style={{ color: 'gray' }}>{item.codigo_entrega}</span>
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 20 }}>
                    <span> Código Produto: </span>
                    <span style={{ color: 'gray' }}>{item.codigo}</span>
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 20 }}>
                    <span> Descrição: </span>
                    <span style={{ color: 'gray' }}>
                      {item.descricao_produto}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 20 }}>
                    <span> Embalagem: </span>
                    <span style={{ color: 'gray' }}>{item.embalagem}</span>
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 20 }}>
                    <span> Quantidade: </span>
                    <span style={{ color: 'gray' }}>{item.quantidade}</span>
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
          <MaxCard.Header>
            <h1>Ocorrências:</h1>
          </MaxCard.Header>
          <MaxCard.Body>
            {ocorrencias && ocorrencias.length > 0 ? (
              ocorrencias.map((oc, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 4,
                    background: '#4CA78C',
                    color: 'white',
                    width: '100%',
                    padding: 10,
                    marginBottom: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ fontSize: 14, color: 'white' }}>
                    {oc.ocorrencia?.descricao_ocorrencia}
                  </h3>
                  <span style={{ fontSize: 12 }}>
                    {oc.created_at
                      ? new Date(oc.created_at).toLocaleString()
                      : ''}
                  </span>
                </div>
              ))
            ) : (
              <p>Nenhuma ocorrência registrada.</p>
            )}
          </MaxCard.Body>
        </div>
      </MaxCard.Container>
    </>
  )
}
