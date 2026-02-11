import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal/modal'
import { useNavigate, useParams } from 'react-router-dom'
import { IEntregas, IItensPedido } from '@/@types'
import api from '@/api/api'

export function CardCodOp() {
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const navigate = useNavigate()

  const [IsOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [entrega, setEntrega] = useState<IEntregas | null>(null)
  const [itensPedido, setItensPedido] = useState<IItensPedido[]>([])

  useEffect(() => {
    async function fetchData() {
      if (!codigo_operacao) return

      try {
        setLoading(true)
        const resEntrega = await api.entregas.mostrarEntregas(
          Number(codigo_operacao),
        )
        setEntrega(resEntrega.data)

        if (resEntrega.data?.codigo_operacao) {
          const resItens = await api.itensPedido.mostrarItensPedido(
            Number(resEntrega.data?.codigo_operacao),
          )
          setItensPedido(resItens.data)
        }
      } catch (err: any) {
        console.error('ERRO DO SERVIDOR:', err.response?.data)
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
      {/* SEÇÃO 1: DADOS DO CLIENTE E ENDEREÇO */}
      <MaxCard.Container>
        <div
          style={{
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <MaxCard.Header>
            <Button onClick={() => navigate('/')}>
              <i className="fa-solid fa-arrow-left-long"></i>
            </Button>
            <div className='d-flex gap-20'>
                        <div className='initial'>
                                <div></div>
                                <h1>CÓDIGO DA OPERAÇÃO: 
                                    <span style={{color: 'GrayText', fontSize: 20}} >
                                        {/* {entrega.codigopedido} */}
                                    </span> 
                                </h1>
                        </div>

                        <div className=''>
                            <Button >
                                <i className="fa-sharp-duotone fa-light fa-circle-location-arrow"></i>{' '}
                                <span style={{fontSize:15}}>Localizar</span>
                            </Button>
                        </div>

                    </div>
          </MaxCard.Header>

          <MaxCard.Body>
            <div style={{ fontSize: 15, marginBottom: 20 }}>
              <h3>Entrega sequencial: {entrega.sequencia_entrega}</h3>
            </div>
            {/* ... Restante dos dados do cliente ... */}
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
            </div>
          </MaxCard.Body>
        </div>
      </MaxCard.Container>

      {/* SEÇÃO 2: ITENS DO PEDIDO (OBSERVAÇÕES) */}
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
                  {/* CAMPO ADICIONADO ABAIXO */}
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
              <p>Nenhum item encontrado para este pedido.</p>
            )}
          </MaxCard.Body>
        </div>
      </MaxCard.Container>

      {/* SEÇÃO 3: OCORRÊNCIAS */}
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
            {/* O conteúdo estático que você já tinha */}
            <div
              style={{
                borderRadius: 4,
                background: 'grey',
                color: 'white',
                width: '100%',
                height: 40,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <h3 style={{ fontSize: 14 }}>Iniciado</h3>
              <span style={{ fontSize: 12 }}>09/09/2026 22:44</span>
            </div>
          </MaxCard.Body>
          <MaxCard.Footer>
            <div style={{alignItems:'center', justifyContent:'center', display:"flex"}}>
              <Button onClick={() => setIsOpen(true)} >
                Adicionar Ocorrência
              </Button>
            </div>
          </MaxCard.Footer>
        </div>

        {/* ... Botões de ação ... */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Button>
            <i className="fa-solid fa-pause"></i> Pausar
          </Button>
          <Button onClick={() => navigate('/ResultadoEntrega')}>
            <i className="fa-solid fa-angles-right"></i> Concluir
          </Button>
        </div>

        <Modal isOpen={IsOpen} onClose={() => setIsOpen(false)} />
      </MaxCard.Container>
    </>
  )
}
