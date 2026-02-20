import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { ReactElement, useState } from 'react'

export type Screens = 'login' | 'forgot-password' | 'register'

export interface IDados {
  email: string
  senha: string
}

export const Index = (): ReactElement => {
  const [screens, setScreens] = useState<Screens>('login')
  const [dados, setDados] = useState<IDados>({
    email: '',
    senha: '',
  })

  const changeScreen = (value: Screens) => {
    setScreens(value)
  }

  const setChanges = (value: IDados) => {
    setDados({ ...dados, ...value })
  }

  const handleScreen = () => {
    switch (screens) {
      case 'login':
        return (
          <Login
            changeScreen={changeScreen}
            setDados={setChanges}
            dados={dados}
          />
        )

      case 'register':
        return (
          <Register
            setDados={setChanges}
            dados={dados}
            changeScreen={changeScreen}
          />
        )
      default:
        return (
          <Login
            changeScreen={changeScreen}
            setDados={setChanges}
            dados={dados}
          />
        )
    }
  }

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100-vh">
      <div
        className="form-container d-flex flex-column flex-lg-row-fluid w-lg-50 order-2 order-lg-1 h-100-vh justify-content-center cs-bg-white"
        style={{ maxWidth: 700 }}
      >
        {handleScreen()}
      </div>
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 hide-background-image"
        style={{
          backgroundImage: 'url(..//images/login_econnex2.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundClip: 'content-box',
          backgroundSize: 'cover',
          backgroundColor: '#dee9ff',
        }}
      />
    </div>
  )
}

export default Index
