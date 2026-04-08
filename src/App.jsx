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

import RezervacijaPregled from './pages/rezervacije/RezervacijaPregled'
import RezervacijaNova from './pages/rezervacije/RezervacijaNova'
import RezervacijaPromjena from './pages/rezervacije/RezervacijaPromjena'

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

        <Route path={RouteNames.REZERVACIJE} element={<RezervacijaPregled />} />
        <Route path={RouteNames.REZERVACIJE_NOVE} element={<RezervacijaNova />} />
        <Route path={RouteNames.REZERVACIJE_PROMJENA} element={<RezervacijaPromjena />} />
      </Routes>
      <hr />
      &copy; Harmony Massage Studio
    </Container>
  )
}

export default App
