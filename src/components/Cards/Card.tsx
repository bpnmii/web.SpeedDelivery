import { Button, MaxCard } from 'maxscalla-lib'
import { useNavigate } from 'react-router-dom'
import { number } from 'zod'

export function Card() {
    const navigate = useNavigate()

  return (
    <MaxCard.Container>
        <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10 }}>
            <MaxCard.Header>
                <div>
                <div>{/* {entrega.sequencial} */}</div>
                <h1>CÓDIGO DA OPERAÇÃO: <span style={{color: 'GrayText', fontSize: 20}} > 3232{/* {entrega.codigopedido} */}</span> </h1>
            
                </div>
            </MaxCard.Header>
            <MaxCard.Body>
                <div style={{fontSize: 15, marginBottom:20}}>
                <i className="fa-regular fa-user m-2"></i>
                <span>Nome cliente:  </span>
                <span style={{color: 'gray'}}> Vinicius Pereira{/*{entrega.nomecliente} */}</span>
                <span style={{color: 'gray'}}>({/*{entrega.codigocliente} */})</span>
                </div>

                <div style={{fontSize: 15}}>
                <i className="fa-light fa-location-dot m-2"></i>
                <span>Endereço: {/*{entrega.endereco} */}</span>
                <span style={{color: 'gray'}}> Rua Sargento Herminio Aurelio Sampaio, 699, São Paulo {/*{entrega.endereco} */}</span>
                </div>
            </MaxCard.Body>
            <MaxCard.Footer>

                <div style={{  alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',}}>
                    <Button
                    onClick={() => navigate("/DetalheEntrega")}
                    style={{
                        borderRadius: 5,
                        width: 200,
                    }}
                    >
                    <i className="fa-light fa-play"></i>
                    <span>Iniciar</span>
                    </Button>
                </div>
            </MaxCard.Footer>
        </div>
    </MaxCard.Container>
  )
}
