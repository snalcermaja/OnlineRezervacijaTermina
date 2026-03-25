import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import KorisniciPregled from "./pages/korisnici/KorisniciPregled"
import Izbornik from './components/izbornik'
import KorisnikNovi from './pages/korisnici/KorisnikNovi'



function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.KORISNICI} element={<KorisniciPregled />} />
        <Route path={RouteNames.KORISNICI_NOVI} element={<KorisnikNovi />} />
      </Routes>
      <hr />
      &copy; Harmony Massage Studio
    </Container>
  )
}

export default App
