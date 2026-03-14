import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import Cjenik from "./pages/korisnici/Cjenik";
import Rezerviraj from './pages/korisnici/Rezerviraj'


function App() {


  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.KORISNICI} element={<Cjenik />} />
        <Route path={RouteNames.KORISNICI} element={<Rezerviraj />} />
      </Routes>
      <hr />
      &copy; Harmony Massage Studio
    </Container>
  )
}

export default App
