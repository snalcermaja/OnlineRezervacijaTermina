import { useEffect, useState } from "react"
import KorisniciService from "../../korisnici/KorisniciService"

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
        <ul>
            {korisnici && korisnici.map((korisnik)=>(
                <li>{korisnik.naziv}</li>
            ))}
        </ul>
        </>
    )
}