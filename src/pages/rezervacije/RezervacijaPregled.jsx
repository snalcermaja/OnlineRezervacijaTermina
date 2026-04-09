import { useEffect, useState } from "react"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function RezervacijaPregled(){

    const navigate = useNavigate()

    const [rezervacije, setRezervacije] = useState([])
    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajRezervacije()
        ucitajKorisnici()
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

    async function ucitajKorisnici() {
        await KorisniciService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RezervacijaService.obrisi(sifra);
        await RezervacijaService.get().then((odgovor)=>{
            setRezervacije(odgovor.data)
        })
    }

    function imeKorisnika(sifraKorisnici) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnici)
        return korisnik ? korisnik.ime : 'Nepoznati korisnik'
    }

    return(
        <>
        <Link to={RouteNames.REZERVACIJE_NOVE}
        className="btn btn-outline-success w-100 my-3">
            Dodavanje nove rezervacije
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Korisnik</th>
                    <th>Datum</th>
                    <th>Napomena</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {rezervacije && rezervacije.map((rezervacija)=>(
                    <tr key={rezervacija.sifra}>
                        <td>{imeKorisnika(rezervacija.korisnik) || 'Nema imena'}</td>
                        <td>
                            {rezervacija.datum ? new Date(rezervacija.datum).toLocaleString('hr-HR', {
                                day:'2-digit',
                                month:'2-digit',
                                year:'numeric',
                                hour:'2-digit',
                                minute:'2-digit'
                            }): 'Nema datuma'}
                        </td>
                        <td>{rezervacija.napomena || 'Bez napomene'}</td>
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