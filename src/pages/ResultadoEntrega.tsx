import { Button } from 'maxscalla-lib'
import { Navigate, useNavigate } from 'react-router-dom'

export function ResultadoEntrega() {
  const navigate = useNavigate()
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
        <Button style={{ width: 50, height: 60, background: 'green' }}>
          <i className="fa-regular fa-circle-check"></i>
          <span>Entrega Total</span>
        </Button>

        <Button style={{ width: 50, height: 60, background: 'orange' }}>
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>Entrega Parcial</span>
        </Button>

        <Button style={{ width: 50, height: 60, background: 'red' }}>
          <i className="fa-solid fa-circle-xmark"></i>
          <span>Não Entregue</span>
        </Button>
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

      <form
        action=""
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: 550,
        }}
      >
        <input type="text" style={{ borderRadius: 5 }} />
      </form>

      <footer
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          gap: 400,
        }}
      >
        <Button
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
          onClick={() => navigate('/')}
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
    </div>
  )
}
