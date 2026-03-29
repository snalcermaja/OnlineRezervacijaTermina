import { useEffect, useState } from "react"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"



export default function KorisniciPregled() {

    const navigate = useNavigate()
    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajKorisnike()
    }, [])

    async function ucitajKorisnike() {
        await KorisniciService.get().then((odgovor) => {
            setKorisnici(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return
        }
        await KorisniciService.obrisi(sifra)
        ucitajKorisnike()
    }


    return (
        <>
            <Link to={RouteNames.KORISNICI_NOVI}
                className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog korisnika
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Broj telefona</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((korisnik) => (
                        <tr key={korisnik.sifra}>
                            <td>{korisnik.ime}</td>
                            <td>{korisnik.prezime}</td>
                            <td>{korisnik.brojTelefona}</td>
                            <td>
                                <Button onClick={() => { navigate(`/korisnici/${korisnik.sifra}`) }}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => { obrisi(korisnik.sifra) }}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}