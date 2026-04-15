import { useEffect, useState} from "react"
import KorisniciService from "../../services/korisnici/KorisniciService"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import KorisnikPregledGrid from "./KorisnikPregledGrid"
import KorisnikPregledTablica from "./KorisnikPregledTablica"


export default function KorisniciPregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [korisnici, setKorisnici] = useState()

    useEffect(() => {
        ucitajKorisnike()
    }, [])

    async function ucitajKorisnike() {
        await KorisniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return

        const rezervacijeRezultat = await RezervacijaService.get()
        if (rezervacijeRezultat.success) {
            const rezervacijeKojeKoristeKorisnik = rezervacijeRezultat.data.filter(rezervacija => rezervacija.korisnik === sifra);

            if (rezervacijeKojeKoristeKorisnik.length > 0) {
                alert(`Ne možete obrisati ovog korisnika jer je postavljen na ${rezervacijeKojeKoristeKorisnik.length} rezervacija/e. Prvo obrišite ili promijenite korisnika u toj rezervaciji.`)
                return
            }
        }

        await KorisniciService.obrisi(sifra);
        await KorisniciService.get().then((odgovor) => {
            setKorisnici(odgovor.data)
        })
    }


    return (
        <>
            <Link to={RouteNames.KORISNICI_NOVI}
                className="btn btn-outline-success w-100 my-3">
                Dodavanje novog korisnika
            </Link>
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <KorisnikPregledGrid
                    korisnici={korisnici}
                    navigate={navigate}
                    brisanje={brisanje}
                />
            ) : (
                <KorisnikPregledTablica
                    korisnici={korisnici}
                    navigate={navigate}
                    brisanje={brisanje}
                />
            )}
        </>
    )
}