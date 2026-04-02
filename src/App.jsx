import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import KorisniciPregled from "./pages/korisnici/KorisniciPregled"
import Izbornik from './components/Izbornik'
import KorisnikNovi from './pages/korisnici/KorisnikNovi'
import KorisnikPromjena from './pages/korisnici/KorisnikPromjena'
import UslugePregled from './pages/usluge/UslugePregled'
import UslugaNova from './pages/usluge/UslugaNova'
import UslugaPromjena from './pages/usluge/UslugaPromjena'




function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.KORISNICI} element={<KorisniciPregled />} />
        <Route path={RouteNames.KORISNICI_NOVI} element={<KorisnikNovi />} />
        <Route path={RouteNames.KORISNICI_PROMJENA} element={<KorisnikPromjena />} />
        <Route path={RouteNames.USLUGE} element={<UslugePregled />} />
        <Route path={RouteNames.USLUGE_NOVE} element={<UslugaNova />} />
        <Route path={RouteNames.USLUGE_PROMJENA} element={<UslugaPromjena />} />
      </Routes>
      <hr />
      &copy; Harmony Massage Studio
    </Container>
  )
}

export default App
