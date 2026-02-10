import { Button } from "maxscalla-lib";
import { useNavigate } from "react-router-dom";


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const navigate = useNavigate();


  return (
    <>
      {/* Overlay */}
   <div
  onClick={onClose}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 30,
  }}
/>

      {/* Modal */}
      <div
      style={{position:"absolute", bottom:350, width:300, height:210, left:150, background:"white", padding:30, zIndex:40, borderRadius:10}}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{display:"flex", gap:28}}>
          <h2 style={{justifyContent:"center", alignItems:"center", display:"flex", marginTop:2}}>Adicionar ocorrencia?</h2>
          <Button onClick={onClose} style={{background:"grey", width:1, height:25}}>
            <i className="fa-solid fa-x"></i>
          </Button>
        </div>

        <form style={{  justifyContent:"center", alignItems:"center", marginTop:30 }}>
          <input type="text" style={{ borderRadius:6}}/>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginTop:30 }}>
            <Button>
              <span>Enviar</span>
            </Button>
          </div>
        </form>

      </div>
    </>
  );
}
