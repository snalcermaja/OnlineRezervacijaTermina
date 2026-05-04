import 'bootstrap/dist/css/bootstrap.min.css'
import slika01 from "../images/slika01.jpg"
import slika02 from "../images/slika02.jpg"
import slika03 from "../images/slika03.jpg"
import { useState, useEffect } from 'react'
import KorisniciService from '../services/korisnici/KorisniciService'
import UslugeService from '../services/usluge/UslugeService'
import RezervacijaService from '../services/rezervacije/RezervacijaService'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Link } from 'react-router-dom'
import useBreakpoint from '../hooks/useBreakpoint'





export default function Home() {

    const [korisnici, setKorisnici] = useState([])

    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [brojUsluga, setBrojUsluga] = useState(0);
    const [brojRezervacija, setBrojRezervacija] = useState(0);

    const [animatedKorisnici, setAnimatedKorisnici] = useState(0);
    const [animatedUsluge, setAnimatedUsluge] = useState(0);
    const [animatedRezervacije, setAnimatedRezervacije] = useState(0);

    const [listaRezervacija, setListaRezervacija] = useState([])
    const [odabraniDatum, setodabraniDatum] = useState(null)
    const [rezervacijeZaDan, setRezervacijeZaDan] = useState([])

    const sirina = useBreakpoint()

    useEffect(() => {
        async function fetchData() {
            try {
                const korisniciRezultat = await KorisniciService.get();
                const uslugeRezultat = await UslugeService.get();
                const rezervacijeRezultat = await RezervacijaService.get();

                setBrojKorisnika(korisniciRezultat.data.length);
                setBrojUsluga(uslugeRezultat.data.length);
                setBrojRezervacija(rezervacijeRezultat.data.length);
                setListaRezervacija(rezervacijeRezultat.data)
                setKorisnici(korisniciRezultat.data)
            } catch (e) {
                console.error("Greška pri dohvaćanju podataka", e);
            }
        }
        fetchData();
    }, []);

    function dohvatiImeKorisnika(sifraKorisnika){
        const korisnik = korisnici.find(s => s.sifra === sifraKorisnika)
        return korisnik ? `${korisnik.ime} ${korisnik.prezime}` : 'Učitavanje...' 
    }

    useEffect(() => {
        if (animatedKorisnici < brojKorisnika) {
            const timer = setTimeout(() => {
                setAnimatedKorisnici(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [animatedKorisnici, brojKorisnika]);

    useEffect(() => {
        if (animatedUsluge < brojUsluga) {
            const timer = setTimeout(() => {
                setAnimatedUsluge(prev => prev + 1);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [animatedUsluge, brojUsluga]);

    useEffect(() => {
        if (animatedRezervacije < brojRezervacija) {
            const timer = setTimeout(() => {
                setAnimatedRezervacije(prev => prev + 1);
            }, 50); 
            return () => clearTimeout(timer);
        }
    }, [animatedRezervacije, brojRezervacija]);

    const handleDateClick = (date) => {
        setodabraniDatum(date)
        const filtrirano = listaRezervacija.filter(rezervacije =>
            new Date (rezervacije.datum).toDateString() === date.toDateString()
        )
        setRezervacijeZaDan(filtrirano)
    }

    return (
        <>
            <div className="container mt-4">

                <div className="row mb-5 justify-content-center">
                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-3'}>
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Korisnici</h6>
                                <h3 className="fw-bold text-secondary">{brojKorisnika}</h3>
                            </div>
                        </div>
                    </div>

                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-3'}>
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Usluge</h6>
                                <h3 className="fw-bold text-secondary">{brojUsluga}</h3>
                            </div>
                        </div>
                    </div>

                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-3'}>
                        <div className="card shadow-sm border-0 text-center bg-light" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <h6 className="text-muted text-uppercase small">Rezervacije</h6>
                                <h3 className="fw-bold text-secondary">{brojRezervacija}</h3>
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center mt-5'>

                        <div className={sirina === 'sm' ? 'col-12 mb-4' : 'col-md-6 d-flex justify-content-end'}>
                        <div style={{ display: 'inline-block', width: 'auto', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgb(0,0,0,0.1)'}}>
                            <Calendar 
                            locale='hr-HR'
                            onChange={handleDateClick}
                            tileContent={({ date, view }) => {
                                if (view === 'month') {
                                    const broj = listaRezervacija.filter(rezervacije =>
                                        new Date(rezervacije.datum).toDateString() === date.toDateString()
                                    ).length

                                    return broj > 0 ? (
                                        <div className='reservation-count'>
                                            {broj}
                                        </div>
                                    ) : null
                                }
                            }}
                            />
                        </div>
                    </div>

                    <div className={sirina === 'sm' ? 'col-12' : 'col-md-4'}>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgb(0,0,0,0.1)', height:'400px', display:'flex' , flexDirection:'column'}}>
                            <h4 className='text-secondary'>
                                {odabraniDatum
                                ?`Rezervacije za ${odabraniDatum.toLocaleDateString('hr-HR')}`
                                : "Odaberite datum"}
                            </h4>
                            <hr />

                            {rezervacijeZaDan.length > 0 ? (
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {rezervacijeZaDan.map((rezervacije, index) =>
                                    <div key={index} className='alert alert-info mb-2' style={{ borderLeft:'5px solid #0d6efd'}}>
                                        <p className='mb-0'>
                                            <strong>Korisnik: </strong>
                                            <Link
                                            to={`/rezervacije/${rezervacije.sifra}`}
                                            state={{ comingFrom: 'home'}}
                                            style={{ textDecoration: 'none', color:'#0d6efd', fontWeight:'bold'}}
                                            >
                                                {dohvatiImeKorisnika(rezervacije.korisnik)}
                                            </Link>
                                            </p>

                                        <p className='mb-0' style={{ fontSize:'0.9rem', color:'#555'}}>
                                            <strong>Vrijeme: </strong>
                                            {rezervacije.datum ? new Date(rezervacije.datum).toLocaleTimeString('hr-HR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'Nema termina'}
                                            </p>
                                    </div>
                                    )}
                                </div>
                                ):(
                                    <div className='text-center mt-5 mb-5'>
                                        <p className='text-muted mb-4'>Nema rezervacija za ovaj dan.</p>
                                        <Link
                                        to="/rezervacije/nove"
                                        className='btn btn-outline-success'
                                        state={{ comingFrom: 'home'}}
                                        >
                                            Dodaj novu rezervaciju
                                        </Link>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>

                <h1 className={sirina === 'sm' ? 'text-secondary text-center fs-3' : 'text-secondary'}>Harmony Massage Studio</h1>
                <hr />

                <p className='fw-semibold'>Dobrodošli u naš studio za masažu</p>

                <p>U našem studiju posvećeni smo vašem opuštanju i zdravlju. Nudimo profesionalne masaže koje pomažu u smanjenju stresa, opuštanju mišića i vraćanju energije tijelu.</p>

                <p>Uz ugodnu atmosferu i individualan pristup svakom klijentu, naš cilj je da se nakon svake masaže osjećate bolje.</p>

                <p>Bilo da tražite trenutak mira nakon napornog dana ili želite redovitu njegu tijela, naš studio je mjesto gdje vaše tijelo i um dolaze na prvo mjesto.</p>

                <p>Rezervirajte svoj termin i priuštite si vrijeme za sebe.</p>

                <div className="row mt-4">

                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-4'}>
                        <img src={slika02} className="img-fluid rounded shadow" />
                    </div>

                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-4'}>
                        <img src={slika01} className="img-fluid rounded shadow" />
                    </div>

                    <div className={sirina === 'sm' ? 'col-12 mb-3' : 'col-md-4'}>
                        <img src={slika03} className="img-fluid rounded shadow" />
                    </div>

                </div>

            </div>
        </>
    )
}