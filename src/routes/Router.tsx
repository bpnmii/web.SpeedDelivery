import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContainerRoot } from '../components'
import { Home } from '../pages/Home'
import { DetalheEntrega } from '@/pages/DetalheEntrega'
import { ResultadoEntrega } from '@/pages/ResultadoEntrega'
import { Finalizadas } from '@/pages/Finalizadas'
import { DetalheEntregaFinal } from '@/pages/DetalheEntregaFinal'
import Index from '@/components/Screens'
import { PrivateRoute } from './PrivateRoutes'
import Login from '@/pages/Login'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Index />} />
        <Route path="/login" element={<Index />} />
        <Route element={<PrivateRoute />}>
          <Route element={<ContainerRoot />}>
            <Route path="/home" element={<Home />} />
            <Route
              path="/DetalheEntrega/:codigo_operacao"
              element={<DetalheEntrega />}
            />
            <Route
              path="/ResultadoEntrega/:codigo_operacao"
              element={<ResultadoEntrega />}
            />
            <Route path="/Finalizadas" element={<Finalizadas />} />
            <Route
              path="/DetalheEntregaFinal/:codigo_operacao"
              element={<DetalheEntregaFinal />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
