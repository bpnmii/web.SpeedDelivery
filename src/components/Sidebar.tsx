import { SideBar as MaxSideBar } from 'maxscalla-lib'
import { IItems } from 'maxscalla-lib/dist/@types'
import { useLocation, NavLink } from 'react-router-dom'
// import useAuthentication from '../hooks/useAuthentication'

export const SideBar = () => {
  // const { sair } = useAuthentication()
  const { pathname } = useLocation()

  const handleActive = (page: string): boolean => {
    const url = String(pathname)

    if (url.includes(page)) return true

    return false
  }

  const itemsSideBar = [
    {
      icon: 'fa-duotone fa-house',
      isActive: handleActive('home'),
      name: 'Home',
      title: 'home',
      pathTo: '/',
    },
    {
      icon: 'fa-duotone fa-solid fa-check',
      isActive: handleActive('check'),
      name: 'Check',
      title: 'check',
      pathTo: '/finalizadas',
    },
    // {
    //   icon: 'fa-arrow-right-from-bracket',
    //   onClick: sair,
    //   name: 'Sair',
    //   title: 'Sair',
    // },
  ] as IItems[]

  return (
    <MaxSideBar
      items={itemsSideBar}
      pathImage="/images/logo-cs-branco.png"
      NavLink={NavLink}
    />
  )
}
