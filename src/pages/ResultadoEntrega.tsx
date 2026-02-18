import { StatusEntregaEnum, StatusResultadoEnum } from '@/@types/global'
import api from '@/api/api'
import { Button } from 'maxscalla-lib'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import { notifyError, notifyErrorCatch, notifyWarning } from '@/utils'

export function ResultadoEntrega() {
  const navigate = useNavigate()
  const { codigo_operacao } = useParams<{ codigo_operacao: string }>()
  const [observacao, setObservacao] = useState('')
  const [imagem, setImagem] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [hovered, setHovered] = useState<StatusResultadoEnum | null>(null)
  const [status_resultado, setStatusResultado] = useState<
    StatusResultadoEnum | undefined
  >()

  const galeriaRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const handleImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const novosArquivos = Array.from(files)

    // 🔥 verifica se vai ultrapassar o limite
    if (imagem.length + novosArquivos.length > LIMITE_IMAGENS) {
      notifyWarning({ message: 'O limite máximo de é de 3 fotos' })
      return
    }

    const novasPreviews = novosArquivos.map((file) => URL.createObjectURL(file))

    setImagem((prev) => [...prev, ...novosArquivos])
    setPreview((prev) => [...prev, ...novasPreviews])

    // limpa o input para permitir selecionar a mesma imagem de novo se quiser
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

      const codigo = Number(codigo_operacao)

      const formData = new FormData()

      formData.append('observacao', observacao)
      formData.append('status_resultado', status_resultado)
      formData.append('status_entrega', StatusEntregaEnum.CONCLUIDO)

      imagem.forEach((file) => {
        formData.append('imagem', file)
      })

      await api.entregas.atualizarEntregas(codigo, formData)

      navigate('/')
    } catch (err: any) {
      notifyErrorCatch(err)
    }
  }

  const LIMITE_IMAGENS = 3

  return (
    <div className="max-container">
      <form action="">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 200 }}>
            <Button
              //CORRIGIR
              onClick={() => navigate(`/DetalheEntrega/${codigo_operacao}`)}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </Button>

            <Button
              onClick={() => cameraRef.current?.click()}
              // style={{
              //   width: 58,
              //   height: 60,
              // }}
            >
              <i className="fa-solid fa-camera"></i>
              Adicionar imagem
            </Button>
          </div>

          {/* Câmera */}
          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            ref={cameraRef}
            style={{ display: 'none' }}
            onChange={handleImagem}
          />

          {preview && (
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {preview.map((preview, index) => (
                <div
                  key={index}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />

                  <button
                    onClick={() => removerImagem(index)}
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flexDirection: 'column' }}>
          <h3
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginBottom: 10,
            }}
          >
            Observação
          </h3>

          <textarea
            placeholder="Digite uma observação..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',

              marginLeft: 27,
              width: '350px',
              minHeight: '100px',
              padding: '12px 15px',
              borderRadius: '12px',
              border: '1px solid #dcdcdc',
              outline: 'none',
              fontSize: '16px',
              resize: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          />
        </div>

        <div>
          <h3
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              margin: 20,
            }}
          >
            Status da entrega:
          </h3>

          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              gap: 20,
              marginBottom: 40,
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                background:
                  status_resultado === StatusResultadoEnum.ENTREGA_TOTAL
                    ? '#e8f5e9'
                    : 'transparent',
                transition: '0.2s',
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
                  cursor: 'pointer',
                  marginBottom: '8px',
                }}
              />
              
              <span
                style={{ fontSize: '14px', color: 'green', fontWeight: '500' }}
              >
                Entrega Total
              </span>
            </label>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                background:
                  status_resultado === StatusResultadoEnum.ENTREGA_PARCIAL
                    ? '#fff3e0'
                    : 'transparent',
                transition: '0.2s',
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
                  cursor: 'pointer',
                  marginBottom: '8px',
                }}
              />
              <span
                style={{ fontSize: '14px', color: 'orange', fontWeight: '500' }}
              >
                Entrega Parcial
              </span>
            </label>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                background:
                  status_resultado === StatusResultadoEnum.NAO_ENTREGUE
                    ? '#ffebee'
                    : 'transparent',
                transition: '0.2s',
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
                  cursor: 'pointer',
                  marginBottom: '8px',
                }}
              />
              <span
                style={{ fontSize: '14px', color: 'red', fontWeight: '500' }}
              >
                Não Entregue
              </span>
            </label>
          </div>
        </div>

        <footer
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            gap: 250,
          }}
        >
          <Button
            type="button"
            onClick={onSubmit}
            style={{
              borderRadius: 10,
              border: 'none',
              width: 400,
              height: 60,
            }}
          >
            <span style={{ fontSize: 17 }}>Salvar</span>
          </Button>
        </footer>
      </form>
    </div>
  )
}
