import { IEntregas, StatusEntregaEnum } from '@/@types'
import api from '@/api/api'
import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  filterValue?: string
}

export function Card({ filterValue }: CardProps) {
  const navigate = useNavigate()
  const [entregas, setEntregas] = useState<IEntregas[]>([])
  const [loading, setLoading] = useState(true)

  async function Iniciar(codigo_operacao: number | any) {
    try {
      const codigo = Number(codigo_operacao)

      const data = { status_entrega: StatusEntregaEnum.INICIADO }

      await api.entregas.atualizarEntregas(codigo, data)
      await api.ocorrenciasEntrega.criarOcorrenciaEntrega({
        codigo_entrega: Number(codigo_operacao),
        codigo_ocorrencia: Number(1),
      })

      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  async function Retomar(codigo_operacao: number | any) {
    try {
      const codigo = Number(codigo_operacao)

      const data = { status_entrega: StatusEntregaEnum.INICIADO }

      await api.entregas.atualizarEntregas(codigo, data)

      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    api.entregas
      .listarEntregas()
      .then((response) => {
        const dados = response.data?.Entregas || response.data || []
        setEntregas(dados)
      })
      .catch((err) => {
        console.error('Erro ao carregar:', err)
        setEntregas([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Função de filtragem por texto em múltiplos campos
  const filterEntregas = (data: IEntregas[]) => {
    if (!filterValue || filterValue.trim() === '') {
      return data
    }

    const searchValue = filterValue.toLowerCase()

    return data.filter((entrega) => {
      return (
        entrega.codigo_operacao
          ?.toString()
          .toLowerCase()
          .includes(searchValue) ||
        entrega.nome_cliente?.toLowerCase().includes(searchValue) ||
        entrega.endereco?.toLowerCase().includes(searchValue) ||
        entrega.bairro?.toLowerCase().includes(searchValue) ||
        entrega.cidade?.toLowerCase().includes(searchValue) ||
        entrega.estado?.toLowerCase().includes(searchValue)
      )
    })
  }

  // Filtra as entregas que NÃO estão concluídas
  const entregasAtivas = entregas.filter(
    (entrega) => entrega.status_entrega !== StatusEntregaEnum.CONCLUIDO,
  )

  // Aplica o filtro de busca
  const entregasFiltradas = filterEntregas(entregasAtivas)

  if (loading) return <p>Carregando entregas...</p>

  return (
    <>
      {entregasFiltradas && entregasFiltradas.length > 0 ? (
        entregasFiltradas.map((entrega, index) => (
          <MaxCard.Container
            key={entrega.codigo_operacao}
            style={{ marginBottom: '20px' }}
          >
            <div
              style={{
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
                borderRadius: 10,
                backgroundColor: '#fff',
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
                      Entrega N° {entrega.codigo_operacao}
                    </h3>

                    <span
                      style={{
                        fontSize: 13,
                        display: 'flex',
                        margin: 5,
                        marginTop: 8,
                      }}
                    >
                      {entrega.nome_cliente}
                    </span>

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

                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      background: '#508DDF',
                      borderRadius: 6,
                      width: 30,
                      alignItems: 'center',
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      marginBottom: 50,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              </MaxCard.Body>
              <MaxCard.Footer style={{ padding: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {entrega.status_entrega === StatusEntregaEnum.NAO_INICIADO ? (
                    <Button
                      onClick={() => {
                        Iniciar(entrega.codigo_operacao)
                        navigate(`/DetalheEntrega/${entrega.codigo_operacao}`)
                      }}
                    >
                      <i className="fa-light fa-play"></i> <span>Iniciar</span>
                    </Button>
                  ) : entrega.status_entrega === StatusEntregaEnum.PAUSADO ? (
                    <Button
                      onClick={() => {
                        Retomar(entrega.codigo_operacao)
                        navigate(`/DetalheEntrega/${entrega.codigo_operacao}`)
                      }}
                    >
                      <i className="fa-solid fa-play"></i> <span>Retomar</span>
                    </Button>
                  ) : entrega.status_entrega === StatusEntregaEnum.INICIADO ? (
                    <Button
                      onClick={() => {
                        Retomar(entrega.codigo_operacao)
                        navigate(`/DetalheEntrega/${entrega.codigo_operacao}`)
                      }}
                    >
                      <i className="fa-solid fa-play"></i> <span>Retomar</span>
                    </Button>
                  ) : null}
                </div>
              </MaxCard.Footer>
            </div>
          </MaxCard.Container>
        ))
      ) : (
        <p>
          {entregas.length === 0
            ? 'Nenhuma entrega encontrada.'
            : 'Nenhuma entrega corresponde ao filtro aplicado.'}
        </p>
      )}
    </>
  )
}
