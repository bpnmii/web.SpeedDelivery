import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContainerRoot } from '../components'
import { Home } from '../pages/Home'
import { DetalheEntrega } from '@/pages/DetalheEntrega'
import { ResultadoEntrega } from '@/pages/ResultadoEntrega'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ContainerRoot />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/DetalheEntrega/:codigo_operacao"
            element={<DetalheEntrega />}
          />
          <Route
            path="/ResultadoEntrega/:codigo_operacao"
            element={<ResultadoEntrega />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
