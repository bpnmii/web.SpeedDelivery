import 'maxscalla-lib/dist/styles'
import 'maxscalla-lib/dist/fontawesome/pro/css/all.css'
import { Router } from './routes/Router'
import { MainProvider } from './context/MainContext'
import { FiltersProvider } from './context/FiltersContext'

function App() {
  return (
    <MainProvider>
      <FiltersProvider>
        <Router />
      </FiltersProvider>
    </MainProvider>
  )
}

export default App
