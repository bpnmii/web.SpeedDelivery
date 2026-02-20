import { ReactElement, useState } from 'react'

import { Avatar, Header as MaxHeader } from 'maxscalla-lib'
import { IconHeader, TextHeader } from './styles'
import { CardUser } from './components/CardUser'
import { clickOutside } from '../../../utils/click-outside'
import { useAuth } from '@/utils/useAuth'

const Header = (): ReactElement => {
  const [showCardUser, setShowCardUser] = useState<boolean>(false)
  const login = useAuth((state) => state.usuario)

  const onChangeCardUser = (x: boolean) => {
    setShowCardUser(x)
  }

  function handleFullScreen() {
    if (document.fullscreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <MaxHeader pathImage="/images/logo_gestor.png">
      <div className="options">
        <div className="option" onClick={handleFullScreen}>
          <i className="fa-duotone fa-expand fa-2xl" />
        </div>
        <TextHeader className="option">
          <span className="fs-6">apelido</span>
        </TextHeader>

        <IconHeader
          className="option min-w-70px"
          noHover
          onClick={() => {
            clickOutside('#card-user', showCardUser, onChangeCardUser)
            setTimeout(() => setShowCardUser(!showCardUser), 100)
          }}
        >
          <Avatar
            bgColor="blue"
            size="md"
            letter={String(login?.email).substring(0, 1)}
            // letter={String(empresa?.usuario.usuario).substring(0, 1)}
          />
        </IconHeader>

        <CardUser show={showCardUser} singOut={() => {}} />
      </div>
    </MaxHeader>
  )
}

export default Header
