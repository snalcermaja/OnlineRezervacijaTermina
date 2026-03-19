import { useEffect, useState } from "react"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Table } from "react-bootstrap"


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
                    <tr>
                        <td>{korisnik.ime}</td>
                        <td>{korisnik.prezime}</td>
                        <td>{korisnik.brojTelefona}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}