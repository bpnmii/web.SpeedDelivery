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

export function CardCodOp() {
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const navigate = useNavigate()

  const [IsOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [entrega, setEntrega] = useState<IEntregas | null>(null)
  const [itensPedido, setItensPedido] = useState<IItensPedido[]>([])
  const [ocorrencias, setOcorrencias] = useState<IOcorrenciasEntrega[]>([])

  // --- FUNÇÃO DE LOCALIZAÇÃO COM ALTA PRECISÃO ---
  async function tratarAbrirRota(cep: string) {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) return

    try {
      // 1. Busca o endereço pelo CEP
      const responseCep = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      )
      const dadosEndereco = await responseCep.json()

      if (dadosEndereco.erro) {
        alert('CEP não encontrado.')
        return
      }

      // 2. Transforma o endereço em Latitude/Longitude (Geocoding)
      const query = `${dadosEndereco.logradouro}, ${dadosEndereco.localidade}, BR`
      const responseGeocode = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}`,
        { headers: { 'User-Agent': 'MaxScallaApp/1.0' } },
      )
      const dadosGeocode = await responseGeocode.json()

      if (dadosGeocode.length === 0) {
        alert('Não foi possível obter as coordenadas para este endereço.')
        return
      }

      const latDestino = dadosGeocode[0].lat
      const lonDestino = dadosGeocode[0].lon

      // --- CONFIGURAÇÃO PARA LOCALIZAÇÃO EXATA ---
      const geoOptions = {
        enableHighAccuracy: true, // Força o uso do GPS (Alta Precisão)
        timeout: 10000, // Espera até 10 segundos
        maximumAge: 0, // Não usa localização em cache
      }

      // 3. Obtém a localização atual e abre o Google Maps
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${latDestino},${lonDestino}&travelmode=driving`
          if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = url
          } else {
            window.open(url, '_blank')
          }
        },
        (error) => {
          console.warn('Erro ao obter GPS preciso, usando fallback:', error)
          // Fallback: abre apenas o ponto de destino
          const urlFallback = `https://www.google.com/maps/search/?api=1&query=${latDestino},${lonDestino}`
          if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = urlFallback
          } else {
            window.open(urlFallback, '_blank')
          }
        },
        geoOptions, // Aplica as opções de precisão aqui
      )
    } catch (error) {
      console.error('Erro ao processar rota:', error)
      alert('Ocorreu um erro ao tentar localizar o endereço.')
    }
  }

  async function Pausar() {
    try {
      const codigo = Number(codigo_operacao)
      const data = { status_entrega: StatusEntregaEnum.PAUSADO }
      await api.entregas.atualizarEntregas(codigo, data)
      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  async function Retomar() {
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
                <Button onClick={() => navigate('/')}>
                  <i className="fa-solid fa-arrow-left-long"></i>
                </Button>
                <Button onClick={() => tratarAbrirRota(entrega.CEP)}>
                  <i className="fa-sharp-duotone fa-light fa-circle-location-arrow"></i>{' '}
                  <span style={{ fontSize: 15 }}>Localizar</span>
                </Button>
              </div>
            </div>
          </MaxCard.Header>

          <MaxCard.Body>
            <div>
              <h2>
                CÓDIGO DA OPERAÇÃO:{' '}
                <span style={{ color: 'GrayText', fontSize: 20 }}>
                  {entrega.codigo_operacao}
                </span>
              </h2>
            </div>
            <div style={{ fontSize: 15, marginBottom: 20 }}>
              <h3>Entrega sequencial: {entrega.sequencia_entrega}</h3>
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
                    background: '#555',
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
          <MaxCard.Footer>
            <div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Button onClick={() => setIsOpen(true)}>
                Adicionar Ocorrência
              </Button>
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
            <Button onClick={Pausar}>
              <i className="fa-solid fa-pause"></i> <span>Pausar</span>
            </Button>
          ) : (
            <Button onClick={Retomar}>
              <i className="fa-solid fa-play"></i> <span>Retomar</span>
            </Button>
          )}
          <Button
            onClick={() =>
              navigate(`/ResultadoEntrega/${entrega.codigo_operacao}`)
            }
          >
            <i className="fa-solid fa-angles-right"></i> Concluir
          </Button>
        </div>

        <Modal
          isOpen={IsOpen}
          onClose={() => setIsOpen(false)}
          codigoEntrega={entrega.codigo_operacao!}
        />
      </MaxCard.Container>
    </>
  )
}
