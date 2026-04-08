import { useEffect, useState } from "react"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import UslugeService from "../../services/usluge/UslugeService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function RezervacijaPregled(){

    const navigate = useNavigate()

    const [rezervacije, setRezervacije] = useState([])
    const [usluge, setUsluge] = useState([])

    useEffect(()=>{
        ucitajRezervacije()
        ucitajUsluge()
    },[])

    async function ucitajRezervacije() {
        await RezervacijaService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setRezervacije(odgovor.data)
        })
    }

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis za korisnike')
                return
            }
            setUsluge(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RezervacijaService.obrisi(sifra);
        await RezervacijaService.get().then((odgovor)=>{
            setRezervacije(odgovor.data)
        })
    }

    function dohvatiNazivUsluge(sifraUsluge) {
        const usluga = usluge.find(s => s.sifra === sifraUsluga)
        return usluga ? usluga.naziv : 'Nepoznata usluga'
    }

    return(
        <>
        <Link to={RouteNames.USLUGE_NOVE}
        className="btn btn-outline-success w-100 my-3">
            Dodavanje nove rezervacije
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Usluga</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {rezervacije && rezervacije.map((rezervacija)=>(
                    <tr key={rezervacija.sifra}>
                        <td className="lead">{rezervacija.naziv}</td>
                        <td>{dohvatiNazivUsluge(rezervacija.usluga)}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/rezervacije/${rezervacija.sifra}`)}}>
                                ✏️Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(rezervacija.sifra)}>
                                🗑️Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}