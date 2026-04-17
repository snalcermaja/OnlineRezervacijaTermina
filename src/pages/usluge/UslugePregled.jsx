import { useEffect, useState } from "react"
import UslugeService from "../../services/usluge/UslugeService"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import UslugaPregledGrid from "./UslugaPregledGrid"
import UslugaPregledTablica from "./UslugaPregledTablica"


export default function UslugePregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [usluge, setUsluge] = useState([])

    useEffect(() => {
        ucitajUsluge()
    }, [])

    async function ucitajUsluge() {
        await UslugeService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            setUsluge(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return

        const rezervacijeRezultat = await RezervacijaService.get()
        if (rezervacijeRezultat.success) {
            const rezervacijeKojeKoristeUsluge = rezervacijeRezultat.data.filter(rezervacija => rezervacija.usluga === sifra);

            if (rezervacijeKojeKoristeUsluge.length > 0) {
                alert(`Ne možete obrisati ove usluge jer je postavljen na ${rezervacijeKojeKoristeUsluge.length} rezervacija/e. Prvo obrišite ili promijenite uslugu u toj rezervaciji.`)
                return
            }
        }

        await UslugeService.obrisi(sifra)
        await UslugeService.get().then((odgovor) => {
            setUsluge(odgovor.data)
        })
    }


    return (
        <>
            <Link to={RouteNames.USLUGE_NOVE}
                className="btn btn-outline-success w-100 mb-3 mt-3">
                Dodavanje nove usluge
            </Link>
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <UslugaPregledGrid
                    usluge={usluge}
                    navigate={navigate}
                    brisanje={brisanje}
                />
            ) : (
                <UslugaPregledTablica
                    usluge={usluge}
                    navigate={navigate}
                    brisanje={brisanje}
                />
            )}
        </>
    )
}