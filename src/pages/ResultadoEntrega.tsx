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
            gap: 8,
            marginBottom: 40,
          }}
        >
          <Button
            style={{
              width: 120,
              height: 60,
              background:
                hovered === StatusResultadoEnum.ENTREGA_TOTAL
                  ? '#0f8a0f'
                  : 'green',
              transform:
                hovered === StatusResultadoEnum.ENTREGA_TOTAL
                  ? 'scale(1.05)'
                  : 'scale(1)',
              transition: '0.2s',
            }}
            onMouseEnter={() => setHovered(StatusResultadoEnum.ENTREGA_TOTAL)}
            onMouseLeave={() => setHovered(null)}
            onClick={() =>
              setStatusResultado(StatusResultadoEnum.ENTREGA_TOTAL)
            }
          >
            <i className="fa-regular fa-circle-check"></i>
            <span>Entrega Total</span>
          </Button>

          <Button
            style={{
              width: 120,
              height: 60,
              background:
                hovered === StatusResultadoEnum.ENTREGA_PARCIAL
                  ? '#cc8400'
                  : 'orange',
              transform:
                hovered === StatusResultadoEnum.ENTREGA_PARCIAL
                  ? 'scale(1.05)'
                  : 'scale(1)',
              transition: '0.2s',
            }}
            onMouseEnter={() => setHovered(StatusResultadoEnum.ENTREGA_PARCIAL)}
            onMouseLeave={() => setHovered(null)}
            onClick={() =>
              setStatusResultado(StatusResultadoEnum.ENTREGA_PARCIAL)
            }
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>Entrega Parcial</span>
          </Button>

          <Button
            style={{
              width: 120,
              height: 60,
              background:
                hovered === StatusResultadoEnum.NAO_ENTREGUE
                  ? '#b30000'
                  : 'red',
              transform:
                hovered === StatusResultadoEnum.NAO_ENTREGUE
                  ? 'scale(1.05)'
                  : 'scale(1)',
              transition: '0.2s',
            }}
            onMouseEnter={() => setHovered(StatusResultadoEnum.NAO_ENTREGUE)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setStatusResultado(StatusResultadoEnum.NAO_ENTREGUE)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
            <span>Não Entregue</span>
          </Button>
        </div>

      

      <form action="">
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginBottom: 30,
          }}
        >
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
            <span style={{fontSize:17}}>Salvar</span>
          </Button>
        </footer>
      </form>
    </div>
  )
}
