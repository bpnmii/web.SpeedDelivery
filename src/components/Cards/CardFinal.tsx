import { IEntregas, StatusEntregaEnum } from '@/@types'
import api from '@/api/api'
import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CardFinalProps {
  filterValue?: string
}

export function CardFinal({ filterValue }: CardFinalProps) {
  const navigate = useNavigate()
  const [entregas, setEntregas] = useState<IEntregas[]>([])
  const [loading, setLoading] = useState(true)

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
        entrega.codigo_operacao?.toString().toLowerCase().includes(searchValue) ||
        entrega.nome_cliente?.toLowerCase().includes(searchValue) ||
        entrega.endereco?.toLowerCase().includes(searchValue) ||
        entrega.bairro?.toLowerCase().includes(searchValue) ||
        entrega.cidade?.toLowerCase().includes(searchValue) ||
        entrega.estado?.toLowerCase().includes(searchValue)
      )
    })
  }

  // Filtra as entregas concluídas
  const entregasConcluidas = entregas.filter(
    (entrega) => entrega.status_entrega === StatusEntregaEnum.CONCLUIDO
  )

  // Aplica o filtro de busca
  const entregasFiltradas = filterEntregas(entregasConcluidas)

  if (loading) return <p>Carregando entregas...</p>

  return (
    <>
      {entregasFiltradas && entregasFiltradas.length > 0 ? (
        entregasFiltradas.map((entrega) => (
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
                    gap:5
                  }}
                >
                  <i className="fa-solid fa-user"></i>
                  
                  <div >
                    <h3
                      style={{ display: 'flex', margin:5 }}>
                        Entrega N° {entrega.codigo_operacao} 
                    </h3>

                    <span   
                      style={{
                        fontSize: 13,
                        display: 'flex',
                        margin: 5,
                        marginTop:8
                      }}>
                        {entrega.nome_cliente}
                    </span>

                    <span
                      style={{
                        fontSize: 13,
                        display: 'flex',
                        margin: 5,
                      }}>
                        {entrega.endereco}, {entrega.bairro} - {entrega.cidade}/
                        {entrega.estado}
                    </span>
                    
                  </div>
                </div>
              </MaxCard.Body>
              <MaxCard.Footer>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    style={{ background: '#4CA78C' }}
                    onClick={() => {
                      navigate(
                        `/DetalheEntregaFinal/${entrega.codigo_operacao}`,
                      )
                    }}
                  >
                    <i className="fa-regular fa-eye"></i>{' '}
                    <span>Ver detalhes</span>
                  </Button>
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