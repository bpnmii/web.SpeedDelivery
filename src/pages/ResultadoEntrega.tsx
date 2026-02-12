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
      const codigo = Number(codigo_operacao)

      const data = {
        observacao: observacao,
        status_resultado: status_resultado,
        status_entrega: StatusEntregaEnum.CONCLUIDO,
      }

      await api.entregas.atualizarEntregas(codigo, data)

      window.location.reload()
    } catch (err: any) {
      console.error('ERRO DO SERVIDOR:', err.response?.data || err.message)
    }
  }

  const LIMITE_IMAGENS = 3

  return (
    <div className="max-container">
      <h1
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          margin: 20,
        }}
      >
        Como foi a entrega?
      </h1>

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
          onClick={() => setStatusResultado(StatusResultadoEnum.ENTREGA_TOTAL)}
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
              hovered === StatusResultadoEnum.NAO_ENTREGUE ? '#b30000' : 'red',
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

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ marginBottom: 10 }}>Deseja adicionar imagem?</h2>

        <div>
          <button
            onClick={() => galeriaRef.current?.click()}
            style={{
              width: 58,
              height: 60,
              border: 'none',
              background: 'transparent',
            }}
          >
            <i className="fa-solid fa-image"></i>
            Galeria
          </button>

          <button
            onClick={() => cameraRef.current?.click()}
            style={{
              width: 58,
              height: 60,
              border: 'none',
              background: 'transparent',
            }}
          >
            <i className="fa-solid fa-camera"></i>
            Câmera
          </button>
        </div>

        {/* Galeria */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={galeriaRef}
          style={{ display: 'none' }}
          onChange={handleImagem}
        />

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

      <h2
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: 10,
        }}
      >
        Observação
      </h2>

      <form action="">
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginBottom: 30,
          }}
        >
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
            //CORRIGIR
            onClick={() => navigate(-1)}
            style={{
              background: 'grey',
              borderRadius: 3,
              border: 'none',
              width: 30,
              height: 50,
            }}
          >
            <i className="fa-solid fa-arrow-left-long"></i>
          </Button>

          <Button
            onClick={() => {
              onSubmit()
              navigate('/')
            }}
            style={{
              background: 'grey',
              borderRadius: 3,
              border: 'none',
              width: 30,
              height: 50,
            }}
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </Button>
        </footer>
      </form>
    </div>
  )
}
