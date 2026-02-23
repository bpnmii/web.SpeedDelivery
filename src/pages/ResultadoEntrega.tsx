import { StatusEntregaEnum, StatusResultadoEnum } from '@/@types/global'
import api from '@/api/api'
import { Button, MaxCard } from 'maxscalla-lib'
import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notifyErrorCatch, notifyWarning } from '@/utils'

export function ResultadoEntrega() {
  const navigate = useNavigate()
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()

  const [observacao, setObservacao] = useState('')
  const [imagem, setImagem] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [status_resultado, setStatusResultado] = useState<StatusResultadoEnum>()

  const cameraRef = useRef<HTMLInputElement>(null)
  const LIMITE_IMAGENS = 3

  const handleImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const novosArquivos = Array.from(files)

    if (imagem.length + novosArquivos.length > LIMITE_IMAGENS) {
      notifyWarning({ message: 'O limite máximo é de 3 fotos' })
      return
    }

    const novasPreviews = novosArquivos.map((file) => URL.createObjectURL(file))

    setImagem((prev) => [...prev, ...novosArquivos])
    setPreview((prev) => [...prev, ...novasPreviews])

    event.target.value = ''
  }

  const removerImagem = (index: number) => {
    setImagem((prev) => prev.filter((_, i) => i !== index))

    setPreview((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  async function onSubmit() {
    try {
      if (!status_resultado) {
        notifyWarning({ message: 'Selecione o status da entrega' })
        return
      }

      if (
        (status_resultado === StatusResultadoEnum.NAO_ENTREGUE ||
          status_resultado === StatusResultadoEnum.ENTREGA_PARCIAL) &&
        imagem.length === 0 &&
        !observacao.trim()
      ) {
        notifyErrorCatch({
          message:
            'Adicione ao menos uma imagem ou uma observação para este tipo de resultado.',
        })
        return
      }

      const codigo = Number(codigo_operacao)
      const formData = new FormData()

      formData.append('observacao', observacao)
      formData.append('status_resultado', status_resultado)
      formData.append('status_entrega', StatusEntregaEnum.CONCLUIDO)

      imagem.forEach((file) => {
        formData.append('imagem', file)
      })

      await api.entregas.atualizarEntregas(codigo, formData)

      await api.ocorrenciasEntrega.criarOcorrenciaEntrega({
        codigo_entrega: codigo,
        codigo_ocorrencia: 4,
      })

      navigate('/home')
    } catch (err: any) {
      notifyErrorCatch(err)
    }
  }

  return (
    <div className="max-container">
      {/* CARD 1 - VOLTAR */}
      <MaxCard.Container style={{ marginBottom: 20 }}>
        <MaxCard.Body style={{alignItems: 'center'}}>
          <Button
            type="button"
            onClick={() => navigate(`/DetalheEntrega/${codigo_operacao}`)}
          >
            <i className="fa-solid fa-arrow-left-long"></i> Voltar
          </Button>
          <h3 style={{ textAlign: 'center', marginBottom: 20 }}>
            Status da entrega
          </h3> 
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            {/* CHECKBOXES NÃO ALTERADOS */}

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={status_resultado === StatusResultadoEnum.ENTREGA_TOTAL}
                onChange={() =>
                  setStatusResultado(StatusResultadoEnum.ENTREGA_TOTAL)
                }
                style={{
                  width: '24px',
                  height: '24px',
                  accentColor: 'green',
                  marginBottom: 8,
                }}
              />
              <span style={{ color: 'green' }}>Entrega Total</span>
            </label>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={
                  status_resultado === StatusResultadoEnum.ENTREGA_PARCIAL
                }
                onChange={() =>
                  setStatusResultado(StatusResultadoEnum.ENTREGA_PARCIAL)
                }
                style={{
                  width: '24px',
                  height: '24px',
                  accentColor: 'orange',
                  marginBottom: 8,
                }}
              />
              <span style={{ color: 'orange' }}>Entrega Parcial</span>
            </label>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={status_resultado === StatusResultadoEnum.NAO_ENTREGUE}
                onChange={() =>
                  setStatusResultado(StatusResultadoEnum.NAO_ENTREGUE)
                }
                style={{
                  width: '24px',
                  height: '24px',
                  accentColor: 'red',
                  marginBottom: 8,
                }}
              />
              <span style={{ color: 'red' }}>Não Entregue</span>
            </label>
          </div>
        </MaxCard.Body>
      </MaxCard.Container>

      {/* CARD 3 - IMAGEM */}
      <MaxCard.Container style={{ marginBottom: 20 }}>
        <MaxCard.Body style={{ textAlign: 'center', justifyItems:'center' }}>
          <Button type="button" onClick={() => cameraRef.current?.click()}>
            <i className="fa-solid fa-camera"></i> Adicionar imagem
          </Button>

          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            ref={cameraRef}
            style={{ display: 'none' }}
            onChange={handleImagem}
          />

          {preview.length > 0 && (
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {preview.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={img}
                    alt="preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removerImagem(index)}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      background: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </MaxCard.Body>
      </MaxCard.Container>

      {/* CARD 4 - OBSERVAÇÃO */}
      <MaxCard.Container style={{ marginBottom: 20 }}>
        <MaxCard.Body>
          <h3 style={{ textAlign: 'center', marginBottom: 15 }}>Observação</h3>

          <textarea
            placeholder="Digite uma observação..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            style={{
              width: '100%',
              minHeight: 100,
              padding: 15,
              borderRadius: 12,
              border: '1px solid #dcdcdc',
              fontSize: 16,
              resize: 'none',
            }}
          />
        </MaxCard.Body>
      </MaxCard.Container>

      {/* CARD 5 - SALVAR */}
      <MaxCard.Container style={{ marginBottom: 40 }}>
        <MaxCard.Footer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              onClick={onSubmit}
              style={{ width: 300, height: 55 }}
            >
              Salvar
            </Button>
          </div>
        </MaxCard.Footer>
      </MaxCard.Container>
    </div>
  )
}
