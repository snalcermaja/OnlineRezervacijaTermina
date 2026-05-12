import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route, Routes, Navigate } from 'react-router-dom'
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
import GeneriranjePodataka from './pages/GeneriranjePodataka'

import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'

import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import NadzornaPloca from './pages/NadzornaPloca'
import useAuth from './hooks/useAuth'
import LoadingSpinner from './components/LoadingSpinner'

function App() {

  const { isLoggedIn, authUser } = useAuth()

  return (
    <>
      <LoadingSpinner />
      <Container >
        <Izbornik />
        <Container className='app'>
          <Routes>

            {isLoggedIn ? (
              <>
                <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

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

                <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />


                {authUser.uloga === 'admin' && (
                  <>
                    <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                    <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                    <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />
                  </>
                )}

                <Route path={RouteNames.TEST} element={<Test />} />
              </>
            ) : (
              <>
                <Route path={RouteNames.LOGIN} element={<Login />} />
                <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />

                <Route path='/' element={<Navigate to={RouteNames.REGISTRACIJA} replace />} />

                <Route path='*' element={<Navigate to={RouteNames.REGISTRACIJA} replace />} />
              </>
            )}


          </Routes>
        </Container>
        <hr />
        &copy; Harmony Massage Studio
      </Container></>
  )
}

export default App
