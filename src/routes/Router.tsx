import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContainerRoot } from '../components'
import { Home } from '../pages/Home'
import Login from '../pages/Login'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ContainerRoot />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
