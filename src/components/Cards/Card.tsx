import { IEntregas, StatusEntregaEnum } from '@/@types'
import api from '@/api/api'
import { useAuth } from '@/utils/useAuth'
import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  filterValue?: string
}

export function Card({ filterValue }: CardProps) {
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const [entregas, setEntregas] = useState<IEntregas[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

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

  async function carregarEntregas(pagina = 1) {
    if (!usuario?.codigo_entregador || !hasMore) return

    try {
      if (pagina === 1) setLoading(true)
      else setLoadingMore(true)

      const response = await api.entregas.mostrarEntregasEntregador(
        Number(usuario.codigo_entregador),
        pagina,
      )

      const novasEntregas = response.data || []

      if (novasEntregas.length < 10) {
        setHasMore(false)
      }

      if (pagina === 1) {
        setEntregas(novasEntregas)
      } else {
        setEntregas((prev) => [...prev, ...novasEntregas])
      }
    } catch (err) {
      console.error('Erro ao carregar entregas:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Carregamento inicial
  useEffect(() => {
    setPage(1)
    setHasMore(true)
    carregarEntregas(1)
  }, [usuario])

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !loadingMore
      ) {
        const nextPage = page + 1
        setPage(nextPage)
        carregarEntregas(nextPage)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, hasMore, loadingMore])

  // Filtro
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

  const entregasAtivas = entregas.filter(
    (entrega) => entrega.status_entrega !== StatusEntregaEnum.CONCLUIDO,
  )

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
                      {entrega.endereco} - {entrega.bairro} - {entrega.cidade}/
                      {entrega.estado} - {entrega.CEP}
                    </span>
                  </div>

                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      background: '#508DDF',
                      borderRadius: 6,
                      padding: '2px 13px',
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
                        navigate(`/DetalheEntrega/${entrega.codigo_operacao}`)
                      }}
                    >
                      <i className="fa-solid fa-pause"></i>{' '}
                      <span>Continuar</span>
                    </Button>
                  ) : entrega.status_entrega === StatusEntregaEnum.INICIADO ? (
                    <Button
                      onClick={() => {
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

      {loadingMore && <p style={{ textAlign: 'center' }}>Carregando mais...</p>}
    </>
  )
}
