import { useEffect, useState } from "react"
import RezervacijaService from "../../services/rezervacije/RezervacijaService"
import KorisniciService from "../../services/korisnici/KorisniciService"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import RezervacijaPregledGrid from "./RezervacijaPregledGrid"
import RezervacijaPregledTablica from "./RezervacijaPregledTablica"
import UslugeService from "../../services/usluge/UslugeService"


import RezervacijaPDFGenerator from "../../components/RezervacijaPDFGenerator"

export default function RezervacijaPregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()
    const [rezervacije, setRezervacije] = useState([])
    const [korisnici, setKorisnici] = useState([])

    useEffect(() => {
        ucitajRezervacije()
        ucitajKorisnici()
    }, [])

    async function ucitajRezervacije() {
        await RezervacijaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setRezervacije(odgovor.data)
        })
    }

    async function ucitajKorisnici() {
        await KorisniciService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za korisnike')
                return
            }
            setKorisnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RezervacijaService.obrisi(sifra);
        await RezervacijaService.get().then((odgovor) => {
            setRezervacije(odgovor.data)
        })
    }

    function dohvatiImeKorisnika(sifraKorisnici) {
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnici)
        return korisnik ? `${korisnik.ime} ${korisnik.prezime}` : 'Nepoznati korisnik'
    }

    function dohvatiBrojUsluga(rezervacija) {
        return rezervacija.usluge ? rezervacija.usluge.length : 0
    }

    async function generirajPDFZaRezervaciju(rezervacija) {
        const korisnik = korisnici.find(s => s.sifra === rezervacija.korisnik)
        if (!korisnik) {
            alert('Korisnik nije pronađen')
            return
        }

        const odgovorUsluge = await UslugeService.get()
        if (!odgovorUsluge.success) {
            alert('Nije moguće dohvatiti uslugu')
            return
        }

        const uslugeRezervacije = odgovorUsluge.data.filter(p =>
            rezervacija.usluge && rezervacija.usluge.includes(p.sifra)
        )

        const generiraj = RezervacijaPDFGenerator({
            rezervacija,
            korisnik,
            usluge: uslugeRezervacije
        })
        await generiraj()
    }

    return (
        <>
            <Link to={RouteNames.REZERVACIJE_NOVE}
                className="btn btn-outline-success w-100 my-3">
                Dodavanje nove rezervacije
            </Link>
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <RezervacijaPregledGrid
                    rezervacije={rezervacije}
                    navigate={navigate}
                    brisanje={brisanje}
                    dohvatiImeKorisnika={dohvatiImeKorisnika}
                    dohvatiBrojUsluga={dohvatiBrojUsluga}
                    generirajPDFZaRezervaciju={generirajPDFZaRezervaciju}
                />
            ) : (
                <RezervacijaPregledTablica
                    rezervacije={rezervacije}
                    navigate={navigate}
                    brisanje={brisanje}
                    dohvatiImeKorisnika={dohvatiImeKorisnika}
                    dohvatiBrojUsluga={dohvatiBrojUsluga}
                    generirajPDFZaRezervaciju={generirajPDFZaRezervaciju}
                />
            )}
        </>
    )
}