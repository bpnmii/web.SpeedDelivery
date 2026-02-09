import { Button, MaxCard } from 'maxscalla-lib'

import { useState } from 'react'
import {Modal} from '../Modal/modal'
import { useNavigate } from 'react-router-dom'

export function CardCodOp() {
    const [IsOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    function setParam(name: any): void {
        throw new Error('Function not implemented.')
    }

  return (
    <>
        <MaxCard.Container>
        <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10, marginBottom:5}}>
                <MaxCard.Header>
                   
                    
                    <Button onClick={() => navigate("/")} >
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </Button>
                    
                    <div className='d-flex gap-20'>
                        <div className='initial'>
                                <div></div>
                                <h1>CÓDIGO DA OPERAÇÃO: 
                                    <span style={{color: 'GrayText', fontSize: 20}} >
                                        {/* {entrega.codigopedido} */}
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
                            <h3 style={{}}> Entrega sequencial:{/* {entrega.sequencial} */}</h3>
                    </div>

                    <div style={{fontSize: 15, marginBottom:20}}>
                            <i className="fa-regular fa-user m-2"></i>
                            <span style={{color: 'gray'}}> {/*{entrega.nomecliente} */}</span>
                    </div>

                    <div style={{fontSize: 15, marginBottom:20}}>
                        <i className="fa-solid fa-phone"></i>
                        <span style={{color: 'gray'}}> {/*{entrega.numerocliente} */}</span>
                    </div>

                    <div style={{fontSize: 15}}>
                            <i className="fa-light fa-location-dot m-2"></i>
                            <span style={{color: 'gray'}}> {/*{entrega.endereco} */}</span>
                            <br />
                            <span style={{color: 'gray'}}>,{/*{entrega.bairro} */}</span>
                            <br />
                            <span style={{color: 'gray'}}>,{/*{entrega.cidade} */}</span>
                            <br />
                            <span style={{color: 'gray'}}>,{/*{entrega.estado} */}</span>
                            <br />
                            <span style={{color: 'gray'}}>,{/*{entrega.cep} */}</span>

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
                            <span style={{color: 'gray'}} > {/*{ItensPedido.CodigoEntrega} */}</span>
                    </div>

                    <div style={{fontSize: 15, marginBottom:20}}>
                            <span> Código:</span>
                            <span style={{color: 'gray'}}> {/*{ItensPedido.Codigo} */}</span>
                    </div>

                    <div style={{fontSize: 15, marginBottom:20}}>
                            <span > Descrição do produto:</span>
                            <span style={{color: 'gray'}}> {/*{ItensPedido.Descricao} */}</span>
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
            <div style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)', borderRadius:10, marginBottom:10 }}>

                <MaxCard.Header>
                    <h1>Ocorrencias:</h1>
                </MaxCard.Header>

                <MaxCard.Body>
                    <div style={{borderRadius:4, background:"grey", color:"white", width:520, height:30, display:'flex', gap:250, justifyContent:'center', alignItems:'center'}}>
                        <h3 style={{color:"white", justifyContent:'center', alignItems:'center', display:'flex', marginTop:5}}>
                            {/*{status} */}
                        iniciado blablabla
                        </h3>
                        <span style={{color:"white", justifyContent:'center', alignItems:'center', display:'flex'}}>
                            09/09/2007 22:44
                            {/*{horario.iniciado} */}
                        </span>
                    </div>
                </MaxCard.Body>

                <MaxCard.Footer>
                    <div style={{display: 'flex', alignItems:'center', justifyContent: 'center' , fontSize:15}}>
                        <Button onClick={() => setIsOpen(true)} >
                            <span> Adicionar Ocorrencia</span>
                        </Button>
                    </div>
                </MaxCard.Footer>
            </div>
        <div style={{display: 'flex', gap:90, alignItems:'center', justifyContent: 'center', fontSize:15, marginBottom:10}}>
            <Button >
                <i className="fa-solid fa-pause"></i>
                <span> Pausar</span>
            </Button>

            <Button onClick={() => navigate("/ResultadoEntrega")}>
                <i className="fa-solid fa-angles-right"></i>
                <span> Concluir</span>
            </Button>
        </div>

        <Modal
        isOpen={IsOpen}
        onClose={() => setIsOpen(false)}
        />


        </MaxCard.Container>
    </>
  )
  
}
