import { useEffect, useState } from "react"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function KorisniciPregled(){

    const [korisnici, setKorisnici] = useState([])

    useEffect(()=>{
        ucitajKorinike()
    },[])

    async function ucitajKorinike() {
        await KorisniciService.get().then((odgovor)=>{
            setKorisnici(odgovor.data)
        })        
    }


    return(
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
                {korisnici && korisnici.map((korisnik)=>(
                    <tr key={korisnik.sifra}>
                        <td>{korisnik.ime}</td>
                        <td>{korisnik.prezime}</td>
                        <td>{korisnik.brojTelefona}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}