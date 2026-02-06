import { Avatar } from 'maxscalla-lib'
import {
  CardUser as CardUserComponent,
  CardLogout,
  CardUserContainer,
} from './user.style'

interface CardUserProps {
  show: boolean
  singOut: () => void
}

export const CardUser = ({ show, singOut }: CardUserProps) => (
  <CardUserContainer
    style={{ width: 280, display: show ? 'flex' : 'none' }}
    className="card-user"
    id="card-user"
  >
    <CardUserComponent>
      <div>
        <Avatar
          bgColor="blue"
          size="md"
          letter="A"
          // letter={String(empresa?.usuario.usuario).substring(0, 1)}
        />
        <div>
          <span>usuario</span>
          <div>apelido</div>
        </div>
      </div>
    </CardUserComponent>
    <CardLogout onClick={singOut}>
      <i className="fa-light fa-arrow-right-from-bracket fs-18" />
      <span>Sair</span>
    </CardLogout>
  </CardUserContainer>
)
