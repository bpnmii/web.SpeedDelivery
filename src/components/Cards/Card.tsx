import { IEntregasListar } from '@/@types'
import api from '@/api/api'
import { Button, MaxCard } from 'maxscalla-lib'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Card() {
  const navigate = useNavigate()
  const [entregas, setEntregas] = useState<IEntregasListar[]>([])
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

  if (loading) return <p>Carregando entregas...</p>

  return (
    <>
      {entregas && entregas.length > 0 ? (
        entregas.map((entrega) => (
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
              <MaxCard.Header>
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
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
                    }}
                  >
                    {entrega.sequencia_entrega}
                  </div>
                  <h1 style={{ marginTop: 10 }}>
                    CÓDIGO DA OPERAÇÃO:{' '}
                    <span style={{ color: 'GrayText', fontSize: 20 }}>
                      {entrega.codigo_operacao}
                    </span>{' '}
                  </h1>
                </div>
              </MaxCard.Header>
              <MaxCard.Body>
                <div style={{ fontSize: 15, marginBottom: 20 }}>
                  <i className="fa-regular fa-user m-2"></i>
                  <span>Nome cliente: </span>
                  <span style={{ color: 'gray' }}>{entrega.nome_cliente}</span>
                </div>

                <div style={{ fontSize: 15 }}>
                  <i className="fa-light fa-location-dot m-2"></i>
                  <span>Endereço: </span>
                  <span style={{ color: 'gray' }}>
                    {entrega.endereco}, {entrega.bairro} - {entrega.cidade}/
                    {entrega.estado}
                  </span>
                </div>
              </MaxCard.Body>
              <MaxCard.Footer>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={() =>
                      navigate(`/DetalheEntrega/${entrega.codigo_operacao}`)
                    }
                    style={{ borderRadius: 5, width: 200 }}
                  >
                    <i
                      className="fa-light fa-play"
                      style={{ marginRight: '8px' }}
                    ></i>
                    <span>Iniciar</span>
                  </Button>
                </div>
              </MaxCard.Footer>
            </div>
          </MaxCard.Container>
        ))
      ) : (
        <p>Nenhuma entrega encontrada.</p>
      )}
    </>
  )
}
