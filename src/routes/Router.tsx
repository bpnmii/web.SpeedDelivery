import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContainerRoot } from '../components'
import { Home } from '../pages/Home'
import { DetalheEntrega } from '@/pages/DetalheEntrega'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ContainerRoot />}>
          <Route path="/" element={<Home />} />
          <Route path="/DetalheEntrega" element={<DetalheEntrega />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
