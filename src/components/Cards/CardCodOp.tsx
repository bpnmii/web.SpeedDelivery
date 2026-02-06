import { Button, MaxCard } from 'maxscalla-lib'

export function CardCodOp() {
  return (
    <>
    <MaxCard.Container>
       <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10, marginBottom:5}}>
            <MaxCard.Header>
       
                <div className='d-flex gap-20'>
                <div>{/* {entrega.sequencial} */}</div>

                
                    <div className='initial'>
                        <div>{/* {entrega.sequencial} */}</div>
                            <h1>CÓDIGO DA OPERAÇÃO: 
                                <span style={{color: 'GrayText', fontSize: 20}} >
                                    3232{/* {entrega.codigopedido} */}
                                </span> 
                            </h1>
                    </div>

                    <div className=''>
                        <Button >
                            <i className="fa-sharp-duotone fa-light fa-circle-location-arrow"></i>{' '}
                            <span style={{fontSize:15}}>Localizar</span>
                        </Button>
                    </div>

                </div>
            </MaxCard.Header>
            <MaxCard.Body>
                <div style={{fontSize: 15, marginBottom:20}}>
                        <i className="fa-regular fa-user m-2"></i>
                        <span style={{color: 'gray'}}> Vinicius Pereira{/*{entrega.nomecliente} */}</span>
                </div>

                <div style={{fontSize: 15, marginBottom:20}}>
                    <i className="fa-solid fa-phone"></i>
                    <span style={{color: 'gray'}}> 11 99552-4346{/*{entrega.numerocliente} */}</span>
                </div>

                <div style={{fontSize: 15}}>
                        <i className="fa-light fa-location-dot m-2"></i>
                        <span style={{color: 'gray'}}> Rua Sargento Herminio Aurelio Sampaio, 699, São Paulo {/*{entrega.endereco} */}</span>
                </div>
            
            </MaxCard.Body>
        </div>
    </MaxCard.Container>


    <MaxCard.Container>
        <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10, marginBottom:5}}>
            <MaxCard.Header>
                <h1>Observações do produto:</h1>
            </MaxCard.Header>
            <MaxCard.Body>
                 <div style={{fontSize: 15, marginBottom:20}}>
                        
                        <span > Código da entrega:</span>
                        <span style={{color: 'gray'}} > 1234{/*{ItensPedido.CodigoEntrega} */}</span>
                </div>

                 <div style={{fontSize: 15, marginBottom:20}}>
                        <span> Código:</span>
                        <span style={{color: 'gray'}}> 1234{/*{ItensPedido.Codigo} */}</span>
                </div>

                 <div style={{fontSize: 15, marginBottom:20}}>
                        <span > Descrição do produto:</span>
                        <span style={{color: 'gray'}}> preto{/*{ItensPedido.Descricao} */}</span>
                </div>
                
                 <div style={{fontSize: 15, marginBottom:20}}>
                        <span > Embalagem:</span>
                        <span style={{color: 'gray'}}>{/*{ItensPedido.Embalagem} */}</span>
                </div>

                 <div style={{fontSize: 15, marginBottom:20}}>
                       <span > Quantidade:</span>
                        <span style={{color: 'gray'}}>{/*{ItensPedido.Quantidade} */}</span>
                </div>
            </MaxCard.Body>
        </div>
    </MaxCard.Container>

    <MaxCard.Container>
        <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10, marginBottom:5 }}>

            <MaxCard.Header>
                <h1>Ocorrencias:</h1>
            </MaxCard.Header>

            <MaxCard.Body>
                oi
            </MaxCard.Body>

            <MaxCard.Footer>
                <Button>
                    <span> Adicionar Ocorrencia</span>
                </Button>
            </MaxCard.Footer>
        </div>
    </MaxCard.Container>
    
    <div className='flex'>
        <Button>
            <span> Pausar</span>
        </Button>

        <Button>
            <span> Concluir</span>
        </Button>
    </div>
    </>
  )
  
}
